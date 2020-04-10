import * as supertest from 'supertest';
import * as chai from 'chai';
import * as _ from 'lodash';

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

        await Type.create({
            _id: ObjectId('6c8fad7c9de8960b444a91e4'),
            name: 'Type test 2',
            slug: 'typeTest2',
            color: 'blue'
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
       await Type.findByIdAndRemove('6c8fad7c9de8960b444a91e4');
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
                    const index = _.findIndex(response.body, { name: 'Capacity Test' });
                    expect(response.body[index].name).to.eql('Capacity Test');
                    expect(response.body).to.be.an('array');
                });
        });

        it('should get one capacity by its slug', () => {
           return supertest(app)
               .get('/api/capacities/capacityTest')
               .expect(200)
               .then(response => {
                  expect(response.body.name).to.eql('Capacity Test');
                  expect(response.body.slug).to.eql('capacityTest');

                  expect(response.body.generation.length).to.eql(1);
                  expect(response.body.generation[0].games.length).to.eql(2);

                  expect(response.body.generation[0]).to.have.property('precision');
                  expect(response.body.generation[0]).to.have.property('pp');
                  expect(response.body.generation[0]).to.have.property('puissance');
               });
        });

    });

    describe('POST/UPDATE /api/capacities', () => {

        it('should create a capacity', () => {
            return supertest(app)
                .post('/api/capacities')
                .send({
                    name: 'Capacity Test 2',
                    slug: 'capacityTest2',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt nisi eget diam rutrum, eu elementum lacus porta. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
                    type: ObjectId('6c8fad7c9de8960b444a91e4'),
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
                .expect(201)
                .then(response => {
                   expect(response.body.name).to.eql('Capacity Test 2');
                });
        });

        it('should update a capacity', () => {
           return supertest(app)
               .put('/api/capacities/capacityTest')
               .send({
                   name: 'Capacity Test 3'
               })
               .expect(201)
               .then(response => {
                   console.log(response);
                  /*expect(response.body.name).to.eql('Capacity Test 3');
                  expect(response.body.slug).to.eql('capacityTest');*/
               });
        });

    });

});
