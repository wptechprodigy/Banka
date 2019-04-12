import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../api/index';

chai.should();

chai.use(chaiHttp);

describe('Entry point', () => {
  // Test if api resource main entry is working
  describe('/ Root route', () => {
    it('it should return a welcome message', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.a.status(200);
          done();
        });
    });
  });
});
