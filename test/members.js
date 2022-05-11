const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const { expect } = require('chai');

const { get } = require('http');
const server = require('../app');
const app = require('../app');
const db = require('../models');

chai.use(chaiHttp);

let adminToken, userToken, id;

const admin = {
  email: 'test@test.com',
  password: process.env.ADMIN_PASSWORD,
};
const regularUser = {
  name: 'user',
  lastName: 'regular',
  email: 'user@regular.com',
  password: 'Test@1234',
};
const socialMediaTest = {
  name: 'Test',
  image: 'imgTest.jpg',
  instagramUrl: 'igTest.com',
};

before((done) => {
  chai
    .request(app)
    .post('/users/auth/login')
    .send(admin)
    .end((err, res) => {
      adminToken = res.body.token;
    });

  chai
    .request(app)
    .post('/users/auth/singup')
    .send(regularUser)
    .end((err, res) => {
      userToken = res.body.token;
    });

  chai
    .request(app)
    .post('/users/auth/login')
    .send(regularUser)
    .end((err, res) => {
      userToken = res.body.token;
    });

  chai
    .request(app)
    .post('/members')
    .send(socialMediaTest)
    .end((err, res) => {
      id = res.body.member.id;
    });
  done()
});

// Get Route

describe('Member endpoints', () => {
  describe('Get route', () => {
    describe('isAdminRole', () => {
      it('Should return obj when token is not provided', (done) => {
        chai
          .request(app)
          .get('/members')
          .end((err, res) => {
            expect(res).to.be.json;
            expect(res).to.have.status(401);
            done();
          });
      });
      describe('isAdminRole unauthorized', () => {
        it('Should return user has not the privilegies', (done) => {
          chai
            .request(app)
            .get('/members')
            .set('Authorization', `Bearer ${userToken}`)
            .end((err, res) => {
              expect(res).to.be.json;
              expect(res).to.have.status(401);
              done();
            });
        });
      });
    });
    describe('getAll members', () => {
      it('Should bring all users because of admin privilegies', (done) => {
        chai
          .request(app)
          .get('/members')
          .set('Authorization', `Bearer ${adminToken}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
    });
  });

  // Put route

  describe('Put route', () => {
    describe('Checks if any of social media provided is in use', () => {
      it('Should return msg with wich social media is in use', (done) => {
        chai
          .request(app)
          .post('/members')
          .send(socialMediaTest)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
          });
        done();
      });
    });

    // Post route

    describe('Update member', () => {
      describe('checks if member exists', () => {
        it('should return an error if member does not exist', (done) => {
          chai
            .request(app)
            .put(`/members/${Number(0)}`)
            .send({ instagramUrl: null })
            .end((err, res) => {
              expect(res).to.have.status(404);
            });
          done();
        });
        it('should find and update a member by id', (done) => {
          chai
            .request(app)
            .put(`/members/${Number(id)}`)
            .send({ name: 'Passed' })
            .end((err, res) => {
              expect(res).to.have.status(200);
            });
          done();
        });
      });
    });

    // Delete Route

    describe('Delete members', () => {
      describe('Checks if member exists before trying to delete it', () => {
        it('Returns 404 status when user not found', (done) => {
          chai
            .request(app)
            .delete(`/members/${Number(0)}`)
            .end((err, res) => {
              expect(res).to.have.status(404);
            });
          done();
        });
      });
    });
    describe('Checks if member exists before trying to delete it', () => {
      it('Returns status 200 and a json when member deleted successfully', (done) => {
        chai
          .request(app)
          .delete(`/members/${Number(id)}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
          });
        done();
      });
    });

    describe('New member created', () => {
      it('Should return an obj and status 200', (done) => {
        after(() => {
          chai
            .request(app)
            .delete(`/members/${Number(id) + 1}`)
            .end();
        });
        chai
          .request(app)
          .post('/members')
          .send(socialMediaTest)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
          });
        done();
      });
    });
  });
});
