const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

const userSignUp = {
  firstName: 'TestingFirstName',
  lastName: 'TestingLastName',
  email: 'testing@mail.com',
  password: 'Contra123456',
};

const userLogin = {
  email: 'testing@mail.com',
  password: 'Contra123456',
};

/* eslint-disable */ 
describe(' --------> Auth endpoints <-------- ', () => {
  // Signup test
  describe(' --------> 1-POST /users/auth/signup <-------- ', () => {
    it(' --------> You should signup <-------- ', (done) => {
      chai.request(server)
        .post('/users/auth/signup')
        .send(userSignUp)
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);
          done();
        });
    });
  });

  //Login test
  describe(' --------> 2-POST /users/auth/login <-------- ', () => {
    it(' --------> You should login <-------- ', (done) => {
      chai.request(server)
        .post('/users/auth/login')
        .send(userLogin)
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);
          done();
        });
    });
  });

  // Get user logged data test
  describe(' --------> 3-Login to fetch user logged data <-------- ', () => {
    it(' --------> You should fetch data of logged user <-------- ', () => {
      describe(' --------> POST /users/auth/login <-------- ', () => {
        it(' --------> You should login <-------- ', () => {
          before((done) => {
          chai.request(server)
            .post('/users/auth/login')
            .send(userLogin)
            .end((err, res) => {
              token = res.body.token;
              id = res.body.user.id;
              res.should.have.status(200);
              done();
            });
        });
      });
      });
      describe(' --------> GET /users/auth/me <-------- ', () => {
        it(' --------> You should get data of logged user <-------- ', (done) => {
          chai.request(server)
            .get('/users/auth/me')
            .set('token', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('msg');
              done();
            });
        });
      });
    });
  });
});
