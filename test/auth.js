const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

// Correct signup
const userSignUp1 = {
  firstName: 'TestingFirstName',
  lastName: 'TestingLastName',
  email: 'testing@mail.com',
  password: 'Contra123456',
};

// Bad signup
const userSignUp2 = {
  firstName: '32321',
  lastName: 'TestingLastName',
  email: 'testing',
  password: 'C',
};

// Correct login
const userLogin1 = {
  email: 'testing@mail.com',
  password: 'Contra123456',
};

// Bad login: validations error
const userLogin2 = {
  email: 'testing@mail.com',
  password: '',
};

// Bad login: wrong password
const userLogin3 = {
  email: 'testing@mail.com',
  password: 'Contra123',
};

// Bad login: user not found
const userLogin4 = {
  email: 'wrong@mail.com',
  password: 'errorLogin',
};

let token;

/* eslint-disable */ 
describe(' ------------- AUTH ENDPOINTS ------------- ', () => {
  // Signup test
  describe(' ----------> POST /users/auth/signup', () => {
    it('Signup: Successfully', (done) => {
      chai.request(server)
        .post('/users/auth/signup')
        .send(userSignUp1)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(200);
            done();
          }
        });
    });
    it('Signup: Validation error', (done) => {
      chai.request(server)
        .post('/users/auth/signup')
        .send(userSignUp2)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(400);
            done();
          }
        });
    });
    it('Signup: User already exists', (done) => {
      chai.request(server)
        .post('/users/auth/signup')
        .send(userSignUp1)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(409);
            done();
          }
        });
    });
  });

  // Login test
  describe(' ----------> POST /users/auth/login', () => {
    it('Login: Successfully', (done) => {
      chai.request(server)
        .post('/users/auth/login')
        .send(userLogin1)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(200);
            done();
          }
        });
    });
    it('Login: Validation error', (done) => {
      chai.request(server)
        .post('/users/auth/login')
        .send(userLogin2)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(400);
            done();
          }
        });
    });
    it('Login: Wrong password', (done) => {
      chai.request(server)
        .post('/users/auth/login')
        .send(userLogin3)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(401);
            done();
          }
        });
    });
    it('Login: User not found', (done) => {
      chai.request(server)
        .post('/users/auth/login')
        .send(userLogin4)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(404);
            done();
          }
        });
    });
  });

  // Get user logged data test
  describe(' ----------> GET /users/auth/me', () => {
    it('Login: Successfully', (done) => {
      chai.request(server)
        .post('/users/auth/login')
        .send(userLogin1)
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            token = res.body.token;
            res.should.have.status(200);
            done();
          }
        });
    });
    it('Get logged user data: Successfully', (done) => {
      chai.request(server)
        .get('/users/auth/me')
        .set({
          Authorization: `Bearer ${token}`,
          'content-type': 'application/x-www-form-urlencoded',
        })
        .end((err, res) => {
          if (err) {
            done(err);
          } else {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg');
            done();
          }
        });
    });
  });
});
