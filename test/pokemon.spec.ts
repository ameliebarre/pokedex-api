import * as chai from "chai";
import * as supertest from 'supertest';
import app from '../src/app';

import Pokemon from "../src/models/Pokemon";
import User from "../src/models/User";

const ObjectId = require('mongodb').ObjectID;
const expect = chai.expect;

describe('Pokemons Spec', () => {

    let token;

    before(async() => {
       await Pokemon.create({
            _id: ObjectId('6c8fad7c9de8960b444a91e3'),
            name: 'Dracaufeu',
            slug: 'dracaufeu',
            national_number : "#004",
            johto_number: "#231",
            description: 'Lorem Ipsum dolor sit amet',
            height: "0.7 m",
            weight: "6.9 kg",
            hp: 45.0,
            attack: 49.0,
            defense: 49.0,
            sp_attack: 65.0,
            sp_defense: 65.0,
            speed: 45.0,
            evolution: null,
            evolution_way: null,
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
        return supertest(app)
            .post("/auth/login")
            .send({
                email: 'john.doe@gmail.com',
                password: 'root'
            })
            .expect(200)
            .then(response => {
                this.token = response.body.token;
            });
    });

    after(async() => {
        await Pokemon.findByIdAndRemove('6c8fad7c9de8960b444a91e3');
        await User.findOneAndRemove({ email: 'john.doe@gmail.com' });
    });

    it('get all Pokemons', () => {

        return supertest(app)
            .get('/api/pokemons')
            .set('Authorization', 'Bearer ' + this.token)
            .expect(200)
            .then(response => {
                console.log(response.body);
            });
    });
});
