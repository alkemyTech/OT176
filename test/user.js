const chai = require('chai')
const chaiHttp = require('chai-http');
const {
    set
} = require('../app.js');
const app = require('../app.js');
chai.should();
chai.use(chaiHttp)

let adminUser = {
    email: "test@test.com",
    password: "123"
};


let guestUser = {
    email: "testGuest@gmail.com",
    password: "123"
};

let propUser = {
    email: "propUser@gmail.com",
    password: "Password123"
}

let token;

let id = undefined

var assert = chai.assert;

//! Failed Tests

/* describe('This test all should fail', () => {



    describe('Should fail because ther is no token provided', () => {

        it('SHOULD FAIL', done => {
            describe('/GET USERS', () => {
                chai
                    .request(app)
                    .get("/users/list")
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a("object");
                        res.body.should.have.property("data");
                        done();
                    });
            })
        })
    })

       it('SHOULD FAIL because there is no user logged, therefor there is no token also', done => {
           describe('/GET USER DATA', function()  {
               chai
                   .request(app)
                   .get("/users/auth/me")
                   .set({token: ''})
                   .end((err, res) => {
                       res.should.have.status(404);
                       done();
                   });
           })
       })

       it('SHOULD FAIL because there is no user logged, therefor there is no token also and no ID provided to the query params', done => {
           describe('/GET USER DATA', function() {
               this.timeout(20000);
               chai
                   .request(app)
                   .get("/users/auth/me")
                   .end((err, res) => {
                       res.should.have.status(404);
                       done();
                   });
           })
       })
   
    it('SHOULD FAIL because is not passing express validations', () => {
        describe('/POST Sign Up', function () {
                it('singup shuld fail', done => {
                    let newUser = {
                        firstName: 'Tadeo12344',
                        lastName: 'Gavensky12121',
                        email: 'tadeogavengmail.com',
                        password: ''
                    }

                    this.timeout(20000);
                    chai
                        .request(app)
                        .post("/users/auth/signup")
                        .send(newUser)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a("object");
                            res.body.errors.should.be.a('array')
                            done();
                        });
                })
            }),
            describe('/POST Log in', function () {
                it('login shuld fail', done => {
                    this.timeout(20000);
                    let failedUser = {
                        email: "testtest.com",
                        password: "123"
                    }
                    chai
                        .request(app)
                        .post("/users/auth/login")
                        .send(failedUser)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.should.be.a("object");
                            res.body.errors.should.be.a('array')
                            done();
                        });
                })
            })
    })

    it('SHOULD FAIL because', () => {
        describe('/POST AWS Image, not authorization', () => {
            it('uploading image should fail', () => {
                beforeEach(done => {
                    chai
                        .request(app)
                        .post("/users/auth/login")
                        .send(guestUser)
                        .end((err, res) => {
                            res.should.have.status(200);
                            token = res.body.token
                            res.body.should.be.a("object");
                            done();
                        });
                })
                afterEach('should fail', done => {
                    let image = 'image.png'
                    chai
                        .request(app)
                        .post("/users/auth/awsImgUpload")
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .attach(image)
                        .send()
                        .end((err, res) => {
                            res.should.have.status(403);
                            res.body.should.be.a("object");
                            res.body.data.should.have.property('msg').eq('Access denied')
                            done();
                        });
                })
            })
        })

        describe('/POST AWS Image, not image found', () => {
            it('uploading image should fail', () => {
                beforeEach(done => {
                    chai
                        .request(app)
                        .post("/users/auth/login")
                        .send(adminUser)
                        .end((err, res) => {
                            res.should.have.status(200);
                            token = res.body.token
                            res.body.should.be.a("object");
                            done();
                        });
                })
                it('should fail', done => {
                    let image = undefined
                    chai
                        .request(app)
                        .post("/users/auth/awsImgUpload")
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .attach(image)
                        .send()
                        .end((err, res) => {
                            res.should.have.status(403);
                            done();
                        });
                })
            })
        })

        describe('/POST AWS Image, incorrect image extension', () => {
            it('uploading image should fail', () => {
                beforeEach(done => {
                    chai
                        .request(app)
                        .post("/users/auth/login")
                        .send(adminUser)
                        .end((err, res) => {
                            res.should.have.status(200);
                            token = res.body.token
                            res.body.should.be.a("object");
                            done();
                        });
                })
                it('should fail', done => {
                    let image = 'image.pdf'
                    chai
                        .request(app)
                        .post("/users/auth/awsImgUpload")
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .attach(image)
                        .send()
                        .end((err, res) => {
                            res.should.have.status(403);
                            done();
                        });
                })
            })
        })
    })

    
        describe('/PUT Delete, not user logged, so ID is undefined', () => {
            it('deleting user should fail', done => {
                chai
                    .request(app)
                    .put("/users/delete/" + id)
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.body.should.be.a('object').have.property('msg').eq('Pelase contact the administrator')
                        done();
                    });
            })
        })



})
 */
//! End of failed test











//* Passed test

//*GET USERS
describe("Fetch all users", () => {
    it('SHOULD fetch all users after getting token and send GET request', () => {
        describe("/get token", () => {
            it('It should get token', (done) => {
                chai
                    .request(app)
                    .post("/users/auth/login")
                    .send(adminUser)
                    .end((err, res) => {
                        token = res.body.token;
                        res.should.have.status(200);
                        done();
                    });

            });
        });
        describe("/get users", () => {
            it("should fetch all users successfully", done => {
                console.log('token', token)
                chai
                    .request(app)
                    .get("/users/list")
                    .set({
                        Authorization: `Bearer ${token}`
                    })
                    .end((err, res) => {
                        console.log('AllUsers', res.body.data)
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("data");
                        done();
                    });
            });
        });

    })
});


//*GET USER DATA
describe("Fetch logged user data ", () => {
    it('should fetch user data after getting token and send GET request', () => {
        describe("/get token", () => {
            it('It should get token', () => {
                beforeEach(done => {
                    chai
                        .request(app)
                        .post("/users/auth/login")
                        .send(adminUser)
                        .end((err, res) => {
                            token = res.body.token;
                            console.log('token', token)
                            res.should.have.status(200);
                            done();
                        });
                });
            });
        });
        describe("/get user data", () => {
            it("should fetch user data successfully", done => {
                chai
                    .request(app)
                    .get("/users/auth/me")
                    .set({
                        'token': token
                    })

                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("msg");
                        console.log('body', res.body.msg)
                        done();
                    });
            });
        });

    })
});

//*UPDATE USER
describe("Update user data ", () => {
    it('should update user data after getting token and send PUT request', () => {

        describe("/get token", () => {
            it('It should get token', (done) => {
                chai
                    .request(app)
                    .post("/users/auth/login")
                    .send(propUser)
                    .end((err, res) => {
                        console.log('tokenOfGuest', res.body.token)
                        token = res.body.token;
                        id = res.body.user.id;

                        res.should.have.status(200);
                        done();
                    });
            });
        });
        describe("/update user data", () => {
            it("should update user data successfully", done => {
                const newUserData = {
                    firstName: 'updated',
                    lastName: 'updated',
                }

                chai
                    .request(app)
                    .put("/users/edit/" + id)
                    .set({
                        Authorization: `Bearer ${token}`
                    })
                    .field('firstName', newUserData.firstName)
                    .field('lastName', newUserData.lastName)
                    .end((err, res) => {
                        console.log('resUpdate', res.body)
                        res.should.have.status(200);
                        res.body.should.have.property("message").eq('User updated successfully!')
                        res.body.should.be.a("object");
                        res.body.should.have.property("data");
                        done();
                    });
            });
        });

    })
});

//DELETE USER
describe("Delete user", () => {
    it('should delete user after getting token and send PUT request', () => {

        describe("/get token", () => {
            it('It should get token', (done) => {

                chai
                    .request(app)
                    .post("/users/auth/login")
                    .send(guestUser)
                    .end((err, res) => {
                        token = res.body.token;
                        id = res.body.user.id;
                        res.should.have.status(200);
                        done();
                    });

            });
        });
        describe("/delete user", () => {
            it("should delete user data successfully", done => {

                console.log('tokenDelete', token)
                chai
                    .request(app)
                    .put("/users/delete/" + id)
                    .set({
                        Authorization: `Bearer ${token}`
                    })
                    .end((err, res) => {
                        console.log('res', res.body)
                        res.should.have.status(200);
                        res.body.should.be.a("object");
                        res.body.should.have.property("msg").eq('The user has been soft-deleted');
                        done();
                    });
            });
        });

    })
});

//*Uploading Image
describe('/POST AWS Image,', () => {
    it('login as admin', (done) => {

        chai
            .request(app)
            .post("/users/auth/login")
            .send(adminUser)
            .end((err, res) => {
                console.log('resAdmin', res.body)
                res.should.have.status(200);
                token = res.body.token
                res.body.should.be.a("object");
                done();
            });
    }),
    it('should upload image', (done) => {
        let image = '../img/image.jpg'
        chai
            .request(app)
            .post("/users/auth/awsImgUpload")
            .set({
                Authorization: `Bearer ${token}`,
                token:token
            })
            .attach(image)
            .send()
            .end((err, res) => {
                console.log('resAws', res.body)
                res.should.have.status(200);
                res.body.should.be.a("object");
                done();
            });
    })

})