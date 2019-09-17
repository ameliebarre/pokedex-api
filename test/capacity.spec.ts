import * as supertest from 'supertest';
import * as chai from 'chai';
import app from '../src/app';

import Capacity from "../src/models/Capacity";
import Game from "../src/models/Game";
import Type from "../src/models/Type";

const ObjectId = require('mongodb').ObjectID;
const expect = chai.expect;

describe.only('Capacity Specs', () => {

    before(async() => {
        await Type.create({
            _id: ObjectId('6c8fad7c9de8960b444a91e3'),
            name: 'Type test',
            slug: 'typeTest',
            color: 'red'
        });

        await Game.create({
            _id: ObjectId('8c8fad7c9de8960b444a91e3'),
            name: 'Pokemon Rouge Test',
            slug: 'pokemonRougeTest',
            pokemons: []
        });

        await Game.create({
            _id: ObjectId('8c8fad7c9de8960b444a91e4'),
            name: 'Pokemon Bleu Test',
            slug: 'pokemonBleuTest',
            pokemons: []
        });

        await Capacity.create({
            _id: ObjectId('7c8fad7c9de8960b444a91e3'),
            name: 'Capacity Test',
            slug: 'capacityTest',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt nisi eget diam rutrum, eu elementum lacus porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
            type: ObjectId('6c8fad7c9de8960b444a91e3'),
            generation: [
                {
                    puissance: "35",
                    pp: "35",
                    precision: "95",
                    level: "Départ",
                    number: 1,
                    games: [
                        ObjectId("8c8fad7c9de8960b444a91e3"),
                        ObjectId("8c8fad7c9de8960b444a91e4")
                    ]
                }
            ]
        })
    });

    after(async() => {
       await Type.findByIdAndRemove('6c8fad7c9de8960b444a91e3');
       await Capacity.findByIdAndRemove('7c8fad7c9de8960b444a91e3');
       await Game.findByIdAndRemove('8c8fad7c9de8960b444a91e3');
       await Game.findByIdAndRemove('8c8fad7c9de8960b444a91e4');
    });

    describe('GET /api/capacities', () => {

        it('should get all the capacities', () => {
            return supertest(app)
                .get('/api/capacities')
                .expect(200)
                .then(response => {
                    console.log(response.body);
                });
        });

    });

});
