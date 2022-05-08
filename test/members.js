const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const { get } = require('http');
const server = require('../app');
const app = require('../app');
const { User } = require('../models');
const { createToken } = require('../utils/jwt');

chai.use(chaiHttp);

const admin = {
  email: 'test@test.com',
  password: '1234',
};

const regularUser = {
  email: 'dani11_21@hotmail.com',
  password: 'Test@1234',
};

let token;

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
          const user = await User.findOne({
            where: {
              email: regularUser.email,
            },
          });
          token = await createToken(user.id);
          chai
            .request(app)
            .get('/members')
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
              expect(res).to.be.json;
              expect(res).to.have.status(401);
            });
        });
      });
    });
    describe('getAll members', () => {
      it('Should bring all users because of admin privilegies', async () => {
        const user = await User.findOne({
          where: {
            email: admin.email,
          },
        });
        token = await createToken(user.id);
        chai
          .request(app)
          .get('/members')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
          });
      });
    });
  });
});
