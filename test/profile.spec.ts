import * as chai from 'chai';
import chaiHttp = require('chai-http');
import app from './../app';
import * as bodyParser from "body-parser";
import * as supertest from "supertest";
import * as express from "express";
const ObjectId = require('mongodb').ObjectID;

chai.use(chaiHttp);
const expect = chai.expect;

import UserRouter from "./../src/routes/user-router";
import { User } from '../src/models/User';

describe('Profile test', () => {
    const expressApp = express();
    const user = new User();

    before(() => {
        expressApp.use(bodyParser.json({ limit: '15mb', type: 'application/json' }));
        expressApp.use('/api/profile/', UserRouter);

        User.create({
            _id: ObjectId('6c8fad7c9de8960b444a91e3'),
            name: 'John',
            firstName: 'Doe',
            email: 'john.doe@gmail.com',
            username: 'johnDoe',
            isFirstTime: false,
            password: 'root',
            city: null,
            zipcode: null,
            country: 'England',
            sex: 'male',
            trainer: null,
            permissions: ['ADMIN'],
            pokemons: null
        });
    });

    after(() => {
        User.findByIdAndDelete('6c8fad7c9de8960b444a91e3');
    });

    it('should get the right profile', ()=> {
       /*return supertest(expressApp)
           .get("/api/profile")
           .expect(200)
           .then(response => {
               console.log('TEST : ', response.body);
           });*/

        it('should return response on call', () => {
            return chai.request(app)
                .get('/api/profile')
                .then(res => {
                    console.log(res.body);
                })
        })
    });
});