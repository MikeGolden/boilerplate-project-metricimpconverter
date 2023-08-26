const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  this.timeout(5000);
  suite("Integration tests with chai-http", function () {
    test("GET /convert a valid input 10L", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=10L")
        .end(function (err, res) {
          assert.isObject(res.body);
          assert.deepEqual(res.body, {
            initNum: 10,
            initUnit: "L",
            returnNum: 2.64172,
            returnUnit: "gal",
            string: "10 liters converts to 2.64172 gallons",
          });
          done();
        });
    });
    test("GET /convert with invalid input 32g", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.text, "invalid unit");
          done();
        });
    });
    test("GET /convert invalid number 3/7.2/4kg", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.text, "invalid number");
          done();
        });
    });
    test("GET /convert invalid number AND unit 3/7.2/4kilomegagram", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function (err, res) {
          assert.equal(res.text, "invalid number and unit");
          done();
        });
    });
    test("GET /convert no number kg", function (done) {
      chai
        .request(server)
        .keepOpen()
        .get("/api/convert?input=kg")
        .end(function (err, res) {
          assert.deepEqual(res.body, {
            initNum: 1,
            initUnit: "kg",
            returnNum: 2.20462,
            returnUnit: "lbs",
            string: "1 kilograms converts to 2.20462 pounds",
          });
          done();
        });
    });
  });
});