import * as supertest from 'supertest';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as bcrypt from 'bcryptjs';
import app from '../src/app';
const ObjectId = require('mongodb').ObjectID;

const expect = chai.expect;

chai.use(chaiHttp);

import User from '../src/models/User';

describe('User test', () => {

    before(async() => {
        await User.create({
            _id: ObjectId('6c8fad7c9de8960b444a91e3'),
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

    after(async() => {
        await User.findByIdAndRemove('6c8fad7c9de8960b444a91e3');
    });

    it('should get the right profile', () => {
        return chai.request(app).get('/api/users/6c8fad7c9de8960b444a91e3')
            .then(res => {
                const response = res.body;
                expect(response.name).to.equal('Doe');
                expect(response.firstname).to.equal('John');

                expect(res).to.be.json;
            });
    });

    it('should return an error if the profile does not exist', () => {
        return chai.request(app).get('/api/users/5c7fad7a4de8960b544a91e4')
            .then(res => {
                expect(res.body.message.message).to.eql('No user found with the given id.');
            });
    });

    it('should update a profile', () => {
       return supertest(app)
            .put('/api/users/6c8fad7c9de8960b444a91e3')
           .send({
               city: 'Los Angeles'
           })
           .expect(200)
           .then(response => {
                expect(response.body.city).to.eql('Los Angeles');
           });
    });

    it.only('should update the user password', () => {
        const newPassword = 'myNewPassword';

        return supertest(app)
            .put('/api/users/6c8fad7c9de8960b444a91e3/reset-password')
            .send({
                password: 'myNewPassword'
            })
            .then(response => {
                console.log(response.body);
                // expect(bcrypt.compareSync(newPassword, response.body.password)).to.be.true;
            })
    });

    it('should delete a profile', () => {
       return supertest(app)
           .delete('/api/users/6c8fad7c9de8960b444a91e3')
           .expect(200);
    });
});
