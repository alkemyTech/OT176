'use stricts';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = require('chai');
const { describe, it } = require('mocha');
const server = require('../app');

chai.should();
chai.use(chaiHttp);

const credentials = { email: 'test@test.com', password: '1234' }; // user admin
let token = ''; // token jwt
let ide = ''; // id of new post
const dataTestimonial = {
  name: 'Testimonial title 1',
  image: 'https://imagendeejemplo.com/image.jpg',
  content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, perspiciatis asperiores nulla praesentium itaque laborum quam, modi error esse culpa veritatis totam vero ea, distinctio delectus? Exercitationem omnis ex aliquam.',
};

describe('ONG >> POST /auth/login', () => {
  it('Should receive status 200 and receive jwt token', (done) => {
    chai
      .request(server)
      .post('/users/auth/login')
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('user');
        expect(res.body).to.have.property('token');
        token = res.body.token;
        done();
      });
  });
});

describe('ONG >> POST /testimonials/', () => {
  it('Should get a 403 error because you need to be authenticated with a valid token.', (done) => {
    chai
      .request(server)
      .post('/testimonials')
      .send(dataTestimonial)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });

  it('Should receive an object with the data of the new testimonial and a status 201', (done) => {
    chai
      .request(server)
      .post('/testimonials')
      .auth(token, { type: 'bearer' })
      .send(dataTestimonial)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('testimonial');
        ide = res.body.testimonial.id;
        done();
      });
  });
});

describe('ONG >> GET /testimonials/ ', () => {
  it('Should get a list with all testimonials, each item should have name, image and content attributes', (done) => {
    chai
      .request(server)
      .get('/testimonials')
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('results');
        const { results } = res.body;
        expect(results).to.be.an('array');
        // listing array
        results.forEach((testimonial) => {
          expect(testimonial)
            .to.have.property('name')
            .to.be.a('string');
          expect(testimonial)
            .to.have.property('image')
            .to.be.a('string');
          expect(testimonial)
            .to.have.property('content')
            .to.be.a('string');
        });
        done();
      });
  });

  it('Should get a status 200, when paging ex: ?page=2', (done) => {
    const req = chai.request(server).get('/testimonials')
      .query({ page: '2', limit: '3' })
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        expect(req).to.have.param('page', '2');
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('totalPages');
        expect(res.body).to.have.property('totalItems');
        expect(res.body).to.have.property('results').to.be.an('array');
        done();
      });
  });
});

describe('ONG >> PUT /testimonials/{id}', () => {
  it('Should get a 500 error if the id to update is not found, with message "Item not found"', (done) => {
    chai
      .request(server)
      .put('/testimonials/10a0')
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.text).to.includes('Item not found');
        done();
      });
  });

  it('Should get status 200 when changing the name of a testimonial', (done) => {
    chai
      .request(server)
      .put(`/testimonials/${ide}`)
      .auth(token, { type: 'bearer' })
      .send({ name: 'Update Name' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('ONG >> DELETE /testimonials/{id}', () => {
  it('Should get a 200 status confirmation and message "Delete Success" if you successfully delete an item', (done) => {
    chai
      .request(server)
      .delete(`/testimonials/${ide}`)
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.includes('Delete Success');
        done();
      });
  });
});
