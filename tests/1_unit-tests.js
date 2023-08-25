const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  suite('Function convertHandler.getNum(input)', () => {
    test('Whole number input', (done) => {
      let input = '1L';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
    test('Decimal number input', (done) => {
      let input = '1.2L';
      assert.equal(convertHandler.getNum(input), 1.2);
      done();
    });
    test('Fraction number input', (done) => {
      let input = '1/2L';
      assert.equal(convertHandler.getNum(input), 1/2);
      done();
    })
    test('Fraction with Decimal number input', (done) => {
      let input = '1.2/3L';
      assert.equal(convertHandler.getNum(input), 1.2/3);
      done();
    })
    
    test('Double Fraction number input', (done) => {
      let input = '1/2/3L';
      assert.equal(convertHandler.getNum(input), null);
      done();
    })
    test('Default number input', (done) => {
      let input = ''
      assert.equal(convertHandler.getNum(input), 1);
      done();
    })
  })
  
  suite("Function convertHandler.getUnit(input)", () => {
      test('Read each valid input unit', (done) => {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'GAL', 'MI', 'KM', 'LBS','KG'];
      let output = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'mi', 'km', 'lbs', 'kg'];
      input.forEach((elem, index) => {
       assert.equal(convertHandler.getUnit(elem), output[index]);
      });
      done();
    })
    test("Invalid input unit", (done) => {
      let input = 'gas';
      assert.equal(convertHandler.getUnit(input), null);
      done();
    })
  })
  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
     test("Correct return unit for each valid input unit", (done) => {
      let input = ['gal', 'L', 'mi', 'km', 'lbs','kg'];
      let expected = ['L', 'gal', 'km', 'mi', 'kg','lbs'];
      input.forEach((elem, index) => {
      assert.equal(convertHandler.getReturnUnit(elem), expected[index]);
      })
      done();
    })
  })
  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("Return the spelled-out string unit for each valid input unit", (done) => {
      let input = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
      let expected = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
      input.forEach((elem, index) => {
        assert.equal(convertHandler.spellOutUnit(elem), expected[index]);
      })
      done();
    })
  })
  suite("Function convertHandler.convert(initNum, initUnit)", () => {
    test("Convert gal to L", (done) => {
      let input = [1, 'gal'];
      let expected = 3.78541;
      assert.approximately(convertHandler.convert(...input), expected, 0.001);
      done();
    })
    test("convert L to gal", (done) => {
      let input = [1, 'L'];
      let expected = 0.26417;
      assert.approximately(convertHandler.convert(...input), expected, 0.001);
      done();
    })
    test("convert mi to km", (done) => {
      let input = [1, 'mi'];
      let expected = 1.60934;
       assert.approximately(convertHandler.convert(...input), expected, 0.001);
      done();
    })
    test("convert km to mi", (done) => {
      let input = [1, 'km'];
      let expected = 0.62137;
      assert.approximately(convertHandler.convert(...input), expected, 0.001);
      done();
    })
    test("convert lbs to kg", (done) => {
      let input = [1, 'lbs'];
      let expected = 0.45359
      assert.approximately(convertHandler.convert(...input), expected, 0.001);
      done();
    })
    test("convert kg to lbs", (done) => {
      let input = [1, 'kg']
      let expected = 2.20462
      assert.approximately(convertHandler.convert(...input), expected, 0.001);
      done();
    })
  })
 
});