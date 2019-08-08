import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as supertest from 'supertest';
import app from '../src/app';
import * as _ from 'lodash';

const ObjectId = require('mongodb').ObjectID;
const expect = chai.expect;
chai.use(chaiHttp);

import Console from "../src/models/Console";
import Game from "../src/models/Game";

describe.only('Console Spec', () => {

    before(async () => {

        await Game.create({
            _id: ObjectId('7d3f13bf9d73aa3546597d76'),
            name: 'Game test',
            slug: 'gameTest',
            releasedDate: '2001',
            pokemons: [],
        });

        await Game.create({
            _id: ObjectId('6d3f13bf9d73aa3546597d76'),
            name: 'Game test 2',
            slug: 'gameTest2',
            releasedDate: '2001',
            pokemons: [],
        });

        await Game.create({
            _id: ObjectId('4d3f13bf9d73aa3546597d76'),
            name: 'Game test 3',
            slug: 'gameTest3',
            releasedDate: '2003',
            pokemons: [],
        });

       await Console.create({
            name: 'Nintendo 3DS Test',
            slug: 'nintendo3DSTest',
            games: [
                ObjectId('4d3f13bf9d73aa3546597d76')
            ]
        });

       await Console.create({
           name: 'Nintendo Switch Test',
           slug: 'nintendoSwitchTest',
           games: [
               ObjectId('7d3f13bf9d73aa3546597d76'),
               ObjectId('6d3f13bf9d73aa3546597d76')
           ]
       });
    });

    after(async () => {
        await Game.findByIdAndRemove('7d3f13bf9d73aa3546597d76');
        await Game.findByIdAndRemove('6d3f13bf9d73aa3546597d76');
        await Game.findByIdAndRemove('4d3f13bf9d73aa3546597d76');
        await Console.findOneAndRemove({ name: 'Nintendo 3DS Test' });
        await Console.findOneAndRemove({ name: 'Nintendo Switch Test' });
    });

    it('should get all consoles list', () => {
        return supertest(app)
            .get('/api/consoles')
            .expect(200)
            .then(response => {
                expect(_.some(response.body, { name: 'Nintendo 3DS Test' })).to.be.true;
                expect(_.some(response.body, { name: 'Nintendo Switch Test' })).to.be.true;
            });
    });

    it('should consoles have games', () => {
        return supertest(app)
            .get('/api/consoles')
            .expect(200)
            .then(response => {
                const nintendoSwitch = _.find(response.body, (console) => {
                    return console.name === 'Nintendo Switch Test';
                });

                expect(nintendoSwitch.games).to.be.an('array');
                expect(_.some(nintendoSwitch.games, { name: 'Game test' })).to.be.true;
                expect(_.some(nintendoSwitch.games, { name: 'Game test 2' })).to.be.true;
            });
    });

    it('should create a console', () => {
       return supertest(app)
           .post('/api/consoles')
           .send({
               name: "Console test insertion",
               slug: "console slug insertion",
               games: []
           })
           .expect(200);
    });

    it.only('should return an error if the game does not exist during console insertion', () => {
       return supertest(app)
           .post('/api/consoles')
           .send({
               name: "Console test insertion",
               slug: "console slug insertion",
               games: [{
                   _id: ObjectId('3a3f13bf9a73aa3546597d86'),
                   name: 'Inexistant game',
                   slug: 'inexistantGame',
                   releasedDate: '2006',
                   pokemons: [],
               }]
           })
           .then(response => {
               console.log(response);
                // expect(response.body.message).to.eql('GAME_DOES_NOT_EXIST');
           });
    });

});
