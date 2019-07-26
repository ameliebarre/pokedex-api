import * as chai from "chai";
import chaiHttp = require('chai-http');
import * as supertest from 'supertest';
import app from '../src/app';
import * as _ from 'lodash';

const expect = chai.expect;
chai.use(chaiHttp);

import Console from "../src/models/Console";

describe.only('Console Spec', () => {

    before(async () => {
       await Console.create({
            name: 'Nintendo 3DS Test',
            slug: 'nintendo3DSTest',
            games: []
        });

       await Console.create({
           name: 'Nintendo Switch Test',
           slug: 'nintendoSwitchTest',
           games: []
       });
    });

    after(async () => {
        await Console.findOneAndRemove({ name: 'Nintendo 3DS Test' });
        await Console.findOneAndRemove({ name: 'Nintendo Switch Test' });
    })

    it('should get all consoles list', async() => {
        await supertest(app)
            .get('/api/consoles')
            .expect(200)
            .then(response => {
                expect(_.some(response.body, { name: 'Nintendo 3DS Test' })).to.be.true;
                expect(_.some(response.body, { name: 'Nintendo Switch Test' })).to.be.true;
            });
    });

});
