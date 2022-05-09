const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const { get } = require('http');
const server = require('../app');
const app = require('../app');
const testing = require('../utils/membersTest');
const db = require('../models');

chai.use(chaiHttp);

let adminToken, userToken;

beforeEach(async () => {
  chai
    .request(app)
    .post('/users/auth/login')
    .send(testing.admin)
    .end((err, res) => {
      adminToken = res.body.token;
    });

  await chai
    .request(app)
    .post('/members')
    .send(testing.socialMediaTest);

  chai
    .request(app)
    .post('/users/auth/login')
    .send(testing.regularUser)
    .end((err, res) => {
      userToken = res.body.token;
    });
});

describe('Member get endpoint', () => {
  describe('Get route', () => {
    describe('isAdminRole', () => {
      it('Should return obj when token is not provided', () => {
        chai
          .request(app)
          .get('/members')
          .end((err, res) => {
            expect(res).to.be.json;
            expect(res).to.have.status(401);
          });
      });
      describe('isAdminRole unauthorized', () => {
        it('Should return user has not the privilegies', async () => {
          chai
            .request(app)
            .get('/members')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              expect(res).to.be.json;
              expect(res).to.have.status(401);
            });
        });
      });
    });
    describe('getAll members', () => {
      it('Should bring all users because of admin privilegies', async () => {
        chai
          .request(app)
          .get('/members')
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
          });
      });
    });
  });

  describe('Put route', () => {
    describe('Checks if any of social media provided is in use', () => {
      it('Should return msg with wich social media is in use', () => {
        chai
          .request(app)
          .post('/members')
          .send(testing.socialMediaTest)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
          });
      });
    });
    describe('New member created', () => {
      it('Should return an obj and status 200', () => {
        chai
          .request(app)
          .post('/members')
          .send(testing.uniqueMember)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
          });
      });
    });
  });
});
