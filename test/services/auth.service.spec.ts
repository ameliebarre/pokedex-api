const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
import { EmailTakenError } from "./../../src/errors/HttpError";

import User from './../../src/models/User';
import app from '../../src/app';

describe('Auth Service', () => {
    before((done) => {
        chai.request(app)
            .post('/api/auth/signup')
            .send({
                username: "johndoe",
                email: "johndoe@gmail.com",
                password: "root"
            })
            .end(res => {
                expect(res).to.have.status(201);
                done();
            });
    });

    after(async() => {
        await User.findOneAndDelete({ email: "johndoe@gmail.com" });
        await User.findOneAndDelete({ email: "snoopy.snoop@gmail.com" });
        await User.findOneAndDelete({ email: "john@wick.gmail.com" })
    });

    describe('Signup', () => {
        it('should return 201 and confirmation for valid input', (done) => {
            let userInput = {
                username: "snoopy",
                email: "snoopy.snoop@gmail.com",
                password: "secret"
            }
          
            chai.request(app)
                .post('/api/auth/signup')
                .send(userInput)
                .end(res => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('user');
                    expect(res.body).to.have.property('token');
    
                    expect(res.body.user._id).to.exist;
                    expect(res.body.user.email).to.exist;
                    expect(res.body.user.password).to.exist;
    
                    done();
                });
        });
    
        it('should return 409 if email already taken', (done) => {
            let userInput = {
                username: "snoopy",
                    email: "snoopy.snoop@gmail.com",
                    password: "secret"
            }
            chai.request(app)
                .post('/api/auth/signup')
                .send(userInput)
                .then(res => {
                    expect(res).to.have.status(409);
                    expect(res.body.message).to.equal('Email already registered');
                });
                done();
        });

        it('should save password encrypted', (done) => {
            const userInput = {
              "username"  : "John Wick",
              "email": "john@wick.gmail.com",
              "password": "secret"
            }
            chai.request(app).post('/api/auth/signup')
                .send(userInput)
                .then((res) => {
                    expect(res.body.password).to.not.be.equal("secret");
                    done();
                });
          });
    });

    describe('Signin', () => {
        it('should return 200', (done) => {
            chai.request(app)
            .post('/api/auth/signin')
            .send({
                email: "johndoe@gmail.com",
                password: "root"
            })
            .then(res => {    
                expect(res).to.have.status(200);
                done();
            });
        });

        it('should return 422 if for empty password', (done) => {
            chai.request(app)
            .post('/api/auth/signin')
            .send({
                email: "johndoe@gmail.com",
                password: ""
            })
            .then(res => {    
                expect(res).to.have.status(422);
                done();
            });
        });
    })
});