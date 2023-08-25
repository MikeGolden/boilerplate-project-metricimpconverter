const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
suite('Routing Tests', () => {
  suite('GET /api/convert', () => {
    test('Convert 10L for valid input', (done) => {
      chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({input: '10L'})
      .end((err, res) => { 
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.approximately(res.body.returnNum, 2.64172, 0.001);
        assert.equal(res.body.returnUnit, 'gal');
        done();
      });
    });
    test('Convert 32g for invalid input', (done) => {
      chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({input: '32g'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initUnit, null)
        done();
      });
    });
    test('Convert 3/7.2/4kg for invalid number', (done) => {
      chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({input: '3/7.2/4kg'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, null);
        done();
      });
    });
    test('Convert 3/7.2/4kilomegagram for invalid number/unit', (done) => {
      chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({input: '3/7.2/4kilomegagram'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, null);
        assert.equal(res.body.initUnit, null);
        done();
      });
    });
    test('Convert with no number such as kg', (done) => {
      chai.request(server)
      .keepOpen()
      .get('/api/convert')
      .query({input: 'kg'})
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.approximately(res.body.returnNum, 2.20462, 0.001);
        assert.equal(res.body.returnUnit, 'lbs');
        done()
      });
    });
  });
});
});