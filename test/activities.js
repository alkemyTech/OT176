const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

const newActivity = {
  name: 'testNew',
  content: 'This is a Testing New',
  image: 'http://testimage.test/img.png',
};

const updatedActivity = {
  name: 'testNew',
  content: 'This is a Testing New',
  image: 'http://testimage.test/img.png',
};

let id;

describe('activity', () => {
  describe('POST /activities', () => {
    it('Should receive an object with the data of the new and a status 201', (done) => {
      chai
        .request(server)
        .post('/activities/')
        .send(newActivity)
        .end((err, res) => {
          res.should.have.status(201);
          id = res.body.activity.id;
          done();
        });
    });
  });
  describe('PUT /activities/:id', () => {
    it('Should receive an object with the data of the new and a status 201', (done) => {
      chai
        .request(server)
        .put(`/activities/${id}`)
        .send(updatedActivity)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
