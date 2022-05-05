const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app.js');
chai.should();
chai.use(chaiHttp)

let adminUSer = {
    email: "test@test.com",
    password: "123"
};


let guestUser = {
    email: "testGuest@gmail.com",
    password: "123"
};

let token,id;

describe('User Endpoints', () => {

    describe("Fetch all users", () => {
        it('should fetch all users after getting token and send GET request', () => {
            describe("/get token", () => {
                it('It should get token', () => {
                    beforeEach(done => {
                        chai
                            .request(app)
                            .post("/users/auth/login")
                            .send(adminUSer)
                            .end((err, res) => {
                                token = res.body.token;
                                res.should.have.status(200);
                                done();
                            });
                    });
                });
            });
            describe("/get users", () => {
                it("should fetch all users successfully", done => {
                    chai
                        .request(app)
                        .get("/users/list")
                        .set({
                            Authorization: `Bearer ${token}`
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object");
                            res.body.should.have.property("data");
                            done();
                        });
                });
            });

        })
    });


    describe("Fetch logged user data ", () => {
        it('should fetch user data after getting token and send GET request', () => {
            describe("/get token", () => {
                it('It should get token', () => {
                    beforeEach(done => {
                        chai
                            .request(app)
                            .post("/users/auth/login")
                            .send(guestUser)
                            .end((err, res) => {
                                token = res.body.token;
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
                        .set('token', token)
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

    describe("Update user data ", () => {
        it('should update user data after getting token and send PUT request', () => {

            describe("/get token", () => {
                it('It should get token', () => {
                    beforeEach(done => {
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
            });
            describe("/update user data", () => {
                it("should update user data successfully", done => {

                    const newUserData = {
                        firstName: 'newFirstName',
                        lastName: 'newLastName',
                    }        

                    chai
                        .request(app)
                        .put("/users/edit/"+id)
                        .send({firstName: newUserData.firstName, lastName:newUserData.lastName})
                        .set({
                            Authorization: `Bearer ${token}`,
                            'content-type': 'application/x-www-form-urlencoded'
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property("message")
                            res.body.should.be.a("object");
                            res.body.should.have.property("data");
                            done();
                        });
                });
            });

        })
    });

    describe("Delete user", () => {
        it('should delete user after getting token and send PUT request', () => {

            describe("/get token", () => {
                it('It should get token', () => {
                    beforeEach(done => {
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
            });
            describe("/delete user", () => {
                it("should delete user data successfully", done => {


                    chai
                        .request(app)
                        .put("/users/delete/"+id)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a("object");
                            res.body.should.have.property("msg");
                            done();
                        });
                });
            });

        })
    });





})