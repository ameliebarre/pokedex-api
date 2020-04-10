import * as supertest from 'supertest';
import * as chai from 'chai';
import app from '../src/app';

import Pokemon from "../src/models/Pokemon";
import User from "../src/models/User";

const ObjectId = require('mongodb').ObjectID;
const expect = chai.expect;

describe('Pokemon Specs', () => {

    before(async() => {

        await Pokemon.create({
            _id: ObjectId('5cc86f41dbe0832a8f7d3188'),
            name: 'Bulbizarre Test',
            english_name: 'Bulbasaur',
            japanese_name: 'フシギダネ',
            slug: "bulbizarreTest",
            national: '0001',
            kanto: '0001',
            johto_oac: '226',
            johto_hgss: '231',
            hoenn_rse: '203',
            hoenn_rosa: null,
            sinnoh: null,
            unys_nb: null,
            unys_n2b2: null,
            kalos: '080',
            alola_sl: null,
            alola_usul: null,
            family: 'Graine',
            generation: 1,
            description: 'Bulbizarre est un petit quadrupède vert avec une tête large. Il porte un bulbe sur son dos. Ce dernier lui sert également d\'organe de stockage, puis-ce qu’on rapporte notamment qu’en période de sécheresse, il peut survivre plusieurs jours sans manger grâce à l’énergie qui y est accumulée. Il a des taches foncées sur le corps faisant penser à un batracien. Son bulbe grandit en permanence en absorbant les rayons du soleil, et lorsque le poids du bulbe sera trop grand et empêchera Bulbizarre de se dresser sur ses deux pattes arrière, cela signifiera que son évolution en Herbizarre est proche. Le Bulbizarre utilise couramment la capacité Vampigraine qui est l\'expulsion d\'une graine parasitant l\'ennemi par l\'orifice de son bulbe ; et le Fouet Lianes qui est l’utilisation de tiges comme membres articulés pour frapper l’adversaire. Ces tiges sont d\'ailleurs fréquemment utilisées pour manipuler des objets ou se porter lui-même en hauteur. Leur force est incroyable, il peut soulever des masses équivalentes à la sienne, voire plus grosses.',
            talents: [
                'Engrais',
                'Chlorophylle'
            ],
            sex: [
                'Female',
                'Male'
            ],
            evolutions: {
                parent: {
                    pokemon: ObjectId("5ec983b331da8367e7d11f2f"),
                    evolution: 'Niveau 16'
                },
                children: null
            },
            height: 0.7,
            weight: 6.9,
            hp: 45,
            attack: 49,
            defense: 49,
            sp_attack: 65,
            sp_defense: 65,
            speed: 45,
            types: [],
            weaknesses: []
        });

        await Pokemon.create({
            _id: ObjectId('5ec983b331da8367e7d11f2f'),
            name: 'Herbizarre Test',
            english_name: 'Ivysaur',
            japanese_name: 'フシギソウ',
            slug: "herbizarreTest",
            national: '0002',
            kanto: '0002',
            johto_oac: '227',
            johto_hgss: '232',
            hoenn_rse: '204',
            hoenn_rosa: null,
            sinnoh: null,
            unys_nb: null,
            unys_n2b2: null,
            kalos: '080',
            alola_sl: null,
            alola_usul: null,
            family: 'Graine',
            generation: 1,
            description: 'Herbizarre est un Pokémon quadrupède, semblable à un dinosaure. Il a un corps bleu vert, avec des taches plus foncées. Deux dents pointues proviennent de sa mâchoire supérieure, et ses yeux se sont rétrécis et sont devenus pourpres. Il a sur le haut de sa tête deux oreilles pointues remplies de noir. Il a un petit museau rond et une large bouche. Chacun de ses pieds possède trois griffes. Le bulbe sur son dos a fleuri et est devenu un gros bourgeon rose. Une petite tige marron, entourée par quatre larges feuilles, soutient le bourgeon. Quand le bourgeon est sur le point d\'éclore, il dégage une délicate odeur fleurie et commence à se gonfler. Herbizarre commence donc à passer plus de temps au soleil pour préparer son évolution proche. L\'exposition au soleil donne plus de force à la plante et à Herbizarre. L\'habitat naturel des Herbizarre est les plaines. Cependant, à présent, beaucoup sont en captivité.',
            talents: [
                'Engrais',
                'Chlorophylle'
            ],
            sex: [
                'Female',
                'Male'
            ],
            evolutions: {
                parent: null,
                children: {
                    pokemon: ObjectId("5cc86f41dbe0832a8f7d3188"),
                    evolution: 'Niveau 16'
                }
            },
            height: 1.0,
            weight: 13.0,
            hp: 60,
            attack: 62,
            defense: 63,
            sp_attack: 80,
            sp_defense: 80,
            speed: 60,
            types: [],
            weaknesses: []
        });

         await User.create({
            name: 'Doe',
            firstname: 'John',
            username: 'john-doe',
            password: 'root',
            email: 'john.doe@gmail.com',
            sex: 'male',
            isFirstTime: false,
            city: null,
            zipcode: null,
            country: null,
            phone: null,
            permissions: ['ADMIN'],
            trainers: [],
            pokemons: []
        });
    });

    before(() => {
        /*return supertest(app)
            .post("/auth/login")
            .send({
                email: 'john.doe@gmail.com',
                password: 'root'
            })
            .expect(200)
            .then(response => {
                this.token = response.body.token;
            // });*/
    });

    after(async() => {
        await Pokemon.findByIdAndRemove('5cc86f41dbe0832a8f7d3188');
        await Pokemon.findByIdAndRemove('5ec983b331da8367e7d11f2f');
        await User.findOneAndRemove({ email: 'john.doe@gmail.com' });
    });

    it('should get a Pokemon by its national number', () => {
        return supertest(app)
            .get('/api/pokemons/0001')
            .expect(200)
            .then(response => {
                expect(response.body.name).to.eql('Bulbizarre Test');
            });
    });

    it('should get a Pokemon by its slug', () => {
        return supertest(app)
            .get('/api/pokemons/herbizarreTest')
            .expect(200)
            .then(response => {
                expect(response.body.name).to.eql('Herbizarre Test');
            });
    });

    it('should get the next Pokemon of the searched Pokemon', () => {
       return supertest(app)
           .get('/api/pokemons/0001')
           .expect(200)
           .then(response => {
              expect(response.body.next).to.not.be.empty;
              expect(response.body.next.name).to.eql('Herbizarre Test');
           });
    });

    it('should get the parent evolution of a Pokemon', () => {
        return supertest(app)
            .get('/api/pokemons/bulbizarreTest')
            .expect(200)
            .then(response => {
                expect(response.body.evolutions.parent).to.not.be.empty;
                expect(response.body.evolutions.parent.pokemon.name).to.eql('Herbizarre Test');
            });
    });
});
