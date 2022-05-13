const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const bodyNew = {
  name: 'testNew',
  content: 'This is a Testing New',
  image: 'http://testimage.test/img.png',
  categoryId: 1,
  type: 'news',
};

const bodyErrNew = {
  name: 'testNew',
  content: 'This is a Testing New',
  image: 'http://testimage.test/img.png',
  categoryId: 1,

};

chai.should();
chai.use(chaiHttp);

let token;
let id;

describe('Testing  API NEWS', () => {
  beforeEach((done) => {
    chai
      .request(app)
      .post('/users/auth/login')
      .send({
        email: 'test@test.com',
        password: process.env.ADMIN_PASSWORD,
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });
  
  describe('ONG >> POST /news', () => {
    it('Should receive an object with the data of the new and a status 201', (done) => {
      
      chai
        .request(app)
        .post('/news/')
        .send(bodyNew)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          id = res.body.data.id;
          done();
        });
    });
 
    it('Should get a 403 error because you need to be authenticated with a valid token.', (done) => {
      
      chai
        .request(app)
        .post('/news/')
        .send(bodyNew)
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  
    it('Should get a 400 error because you need send all fields', (done) => {
      chai
        .request(app)
        .post('/news/')
        .send(bodyErrNew)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  
    it('Should get a 400 error because image must be URL', (done) => {
      bodyNew.image = 'isnotUrl';
      chai
        .request(app)
        .post('/news/')
        .send(bodyNew)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('ONG >> GET /news', () => {
    it('Should get a list with all news and status 200', (done) => {
      chai
        .request(app)
        .get(`/news`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  
    it('Should get a status 200, when paging ex: ?page=2', (done) => {
      chai
        .request(app)
        .get(`/news`)
        .query({ page: '2', limit: '3' })
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  
    it(`Should get the news details with id`, (done) => {
      

      chai
        .request(app)
        .get(`/news/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  
    it('Should get error when id does not exist', (done) => {
      let fake_id = 'as2';

      chai
        .request(app)
        .get(`/news/${fake_id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
  
  describe('ONG >> GET /news', () => {
    it('Should get a 400 error because image must be URL', (done) => {
      
      chai
        .request(app)
        .put(`/news/${id}`)
        .send(bodyNew)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
  describe('Should receive an object with the data of the news updated a status 201', () => {
    it('should status 201 ', (done) => {
      bodyNew.content="This is a New Updated";
      bodyNew.image="http://newUpdated.com";
      chai
        .request(app)
        .put(`/news/${id}`)
        .send(bodyNew)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('ONG >> DELETE /news/{id}', () => {
    it('Should get a 200 status confirmation if you successfully delete an item', (done) => {
      
      chai
        .request(app)
        .delete(`/news/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });


});
