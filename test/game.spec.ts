import * as chai from 'chai';
import * as supertest from 'supertest';
import app from '../src/app';

const expect = chai.expect;

describe('Game Spec', () => {

    it('should get all games', async() => {
       await supertest(app)
            .get('/api/games')
            .expect(200)
           .then(response => {
               console.log(response.body);
            });
    });

});
