import * as supertest from 'supertest';
import * as chai from 'chai';
import app from '../src/app';

import Capacity from "../src/models/Capacity";
import Game from "../src/models/Game";

const ObjectId = require('mongodb').ObjectID;
const expect = chai.expect;

describe.only('Capacity Specs', () => {

    before(async() => {
        await Game.create({
            _id: ObjectId('4r3n13bf8d73cc3473697d87'),
            name: 'Pokemon Rouge Test',
            slug: 'pokemonRougeTest',
            pokemons: []
        });

        await Capacity.create({
            _id: ObjectId('6aa76f41dbe0122a9f7t3199'),
            name: 'Capacity Test',
            slug: 'capacityTest',

        })
    });

    after(async() => {
       await Capacity.findByIdAndRemove('6aa76f41dbe0122a9f7t3199');
       await Game.findByIdAndRemove('6aa76f41dbe0122a9f7t3199');
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
