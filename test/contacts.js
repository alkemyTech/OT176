const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const admin = { email: 'test@test.com', password: process.env.ADMIN_PASSWORD };
const user = { email: 'user@test.com', name: 'Test user' };
const unkonwnUser = { email: '', name: '' };

// Assertion style
chai.should();
chai.use(chaiHttp);

let token;

describe('Contact Endpoints', () => {
  describe('Fetch all contacts', () => {
    it('should fetch all contacts after getting token and send GET request', () => {
      describe('/get token', () => {
        it('It should get token', () => {
          beforeEach((done) => {
            chai
              .request(server)
              .post('/users/auth/login')
              .send(admin)
              .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
                done();
              });
          });
        });
      });
      describe('/get contacts', () => {
        it('should fetch all contacts successfully', (done) => {
          chai
            .request(server)
            .get('/contacts')
            .set({
              Authorization: `Bearer ${token}`,
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              done();
            });
        });
      });
    });
  });
  describe('Insert a contact: ', () => {
    it('should insert a contact', (done) => {
      chai.request(server)
        .post('/contacts')
        .send(user)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('data');
          done();
        });
    });
  });
  describe('Insert a contact without name or email: ', () => {
    it('should try to insert a contact without name or email and get error 400', (done) => {
      chai.request(server)
        .post('/contacts')
        .send(unkonwnUser)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
