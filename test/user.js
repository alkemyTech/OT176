const chai = require('chai');
const chaiHttp = require('chai-http');
const {
  set,
} = require('../app.js');
const app = require('../app.js');

chai.should();
chai.use(chaiHttp);

const adminUser = {
  email: 'test@test.com',
  password: process.env.ADMIN_PASSWORD,
};

const guestUser = {
  email: 'tadeogaven@gmail.com',
  password: 'Password123',
};

const propUser = {
  email: 'tadeogaven@gmail.com',
  password: 'Password123',
};

let token;

let id;

const { assert } = chai;

//! Failed Tests

describe('This test all should fail', () => {
  describe('Should fail because ther is no token provided', () => {
    it('SHOULD FAIL', (done) => {
      describe('/GET USERS', () => {
        chai
          .request(app)
          .get('/users/users')
          .end((err, res) => {
            res.should.have.status(403);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
          });
      });
    });
  });

  describe('SHOULD FAIL because there is no user logged, therefor there is no token also', () => {
    it('Should error 404', (done) => {
      describe('/GET USER DATA', () => {
        chai
          .request(app)
          .get('/users/auth/me')
          .end((err, res) => {
            res.should.have.status(403);
            done();
          });
      });
    });
  });
  /*
       it('SHOULD FAIL because there is no user logged, therefor there is no token also and no ID provided to the query params', done => {
           describe('/GET USER DATA', function() {
               //this.timeout(20000);
               chai
                   .request(app)
                   .get("/users/auth/me")
                   .end((err, res) => {
                       res.should.have.status(404);
                       done();
                   });
           })
       }) */

  describe('SHOULD FAIL because is not passing express validations', () => {
    describe('/POST Sign Up', () => {
      it('singup shuld fail', (done) => {
        const newUser = {
          firstName: 'Tadeo12344',
          lastName: 'Gavensky12121',
          email: 'tadeogavengmail.com',
          password: '',
        };

        chai
          .request(app)
          .post('/users/auth/signup')
          .send(newUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.errors.should.be.a('array');
            done();
          });
      });
    }),
    describe('/POST Log in fail because incorrect user email', () => {
      it('Login should fail', (done) => {
        const failedUser = {
          email: 'testtest.com',
          password: '123',
        };
        chai
          .request(app)
          .post('/users/auth/login')
          .send(failedUser)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.errors.should.be.a('array');
            done();
          });
      });
    });
  });

  describe('/DELETE, not user logged, so ID is undefined', () => {
    it('deleting user should fail', (done) => {
      chai
        .request(app)
        .put(`/users/delete/${id}`)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object').have.property('msg').eq('Pelase contact the administrator');
          done();
        });
    });
  });
});

//! End of failed test

//* Passed test

//* GET USERS
describe('Fetch all users', () => {
  it('SHOULD fetch all users after getting token and send GET request', () => {
    it('It should get token', (done) => {
      chai
        .request(app)
        .post('/users/auth/login')
        .send(adminUser)
        .end((err, res) => {
          token = res.body.token;
          res.should.have.status(200);

          done();
        });
    });

    describe('/get users', () => {
      it('should fetch all users successfully', (done) => {
        chai
          .request(app)
          .get('/users/users')
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

//* GET USER DATA
describe('Fetch logged user data ', () => {
  it('should fetch user data after getting token and send GET request', () => {
    beforeEach((done) => {
      chai
        .request(app)
        .post('/users/auth/login')
        .send(adminUser)
        .end((err, res) => {
          token = res.body.token;

          res.should.have.status(200);
          done();
        });
    });

    describe('/get user data', () => {
      it('should fetch user data successfully', (done) => {
        chai
          .request(app)
          .get('/users/auth/me')
          .set({
            Authorization: `Bearer ${token}`,
          })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});
// NEW USER
describe('SHOULD CREATE A NEW USER', () => {
  describe('/POST Sign Up', () => {
    it('singup should create succesfully', (done) => {
      const newUser = {
        firstName: 'Tadeo',
        lastName: 'Gavensky',
        email: 'tadeogaven@gmail.com',
        password: 'Password123',

      };

      chai
        .request(app)
        .post('/users/auth/signup')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
//* UPDATE USER
describe('Update user data ', () => {
  it('should update user data after getting token and send PUT request', () => {
    describe('/get token', () => {
      it('It should get token', (done) => {
        chai
          .request(app)
          .post('/users/auth/login')
          .send(propUser)
          .end((err, res) => {
            token = res.body.token;

            id = res.body.user.id;

            res.should.have.status(200);
            done();
          });
      });
    });
    describe('/update user data', () => {
      it('should update user data successfully', (done) => {
        const newUserData = {
          firstName: 'updated',
          lastName: 'updated',
          email: 'tadeogaven@gmail.com',
          password: 'Password123',
          image: 'http://image.jpg',
        };

        chai
          .request(app)
          .patch(`/users/users/${id}`)
          .set({
            Authorization: `Bearer ${token}`,
          })
          .send(newUserData)

          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eq('User updated successfully!');
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            done();
          });
      });
    });
  });
});

// DELETE USER
describe('Delete user', () => {
  it('should delete user after getting token and send PUT request', () => {
    describe('/get token', () => {
      it('It should get token', (done) => {
        console.log('es este');
        chai
          .request(app)
          .post('/users/auth/login')
          .send(guestUser)
          .end((err, res) => {
            token = res.body.token;
            id = res.body.user.id;
            console.log(id);
            res.should.have.status(200);
            done();
          });
      });
    });
    describe('/delete user', () => {
      it('should delete user data successfully', (done) => {
        chai
          .request(app)
          .delete(`/users/delete/${id}`)
          .set({
            Authorization: `Bearer ${token}`,
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eq('The user has been soft-deleted');
            done();
          });
      });
    });
  });
});
