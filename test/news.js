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
        password: '1234',
      })
      .end((err, res) => {
        token = res.body.token;
        res.should.have.status(200);
        done();
      });
  });

  describe('/get details news', () => {
    it('should status 200 ', (done) => {
      id = 1;

      chai
        .request(app)
        .get(`/news/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('/get details news no exist', () => {
    it('should error 404 ', (done) => {
      id = 255;

      chai
        .request(app)
        .get(`/news/${id}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/post details news', () => {
    it('should status 200 ', (done) => {
      id = 255;

      chai
        .request(app)
        .post('/news/')
        .send(bodyNew)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('/post details news error missing field  ', () => {
    it('should status 400 ', (done) => {
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
  });
  
  describe('/post details news error  field is not URL ', () => {
    it('should status 400', (done) => {
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
});
