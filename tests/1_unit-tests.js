const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler");

suite("Unit Tests", function () {
  const converter = new ConvertHandler();

  suite("Input Validation", function () {
    test("convertHandler should correctly read a whole number input.", function () {
      let num = converter.getNum("123mi");
      assert.strictEqual(num, 123);
    });
    test("convertHandler should correctly read a decimal number input.", function () {
      let num = converter.getNum("12.3mi");
      assert.strictEqual(num, 12.3);
    });
    test("convertHandler should correctly read a fractional input.", function () {
      let num = converter.getNum("1/2mi");
      assert.strictEqual(num, 1 / 2);
    });
    test("convertHandler should correctly read a fractional input with a decimal.", function () {
      let num = converter.getNum("1/2.1mi");
      assert.strictEqual(num, 1 / 2.1);
    });
    test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
      let num = converter.getNum("1/2/3mi");
      assert.strictEqual(num, "Error: invalid number");
    });
    test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
      let num = converter.getNum("mi");
      assert.strictEqual(num, 1);
    });
    const validInputUnits = ["gal", "L", "lbs", "kg", "mi", "km"];
    test("convertHandler should correctly read each valid input unit.", function () {
      validInputUnits.forEach((validUnit) => {
        let unit = converter.getUnit("46" + validUnit);
        assert.strictEqual(unit, validUnit);
      });
    });
    test("convertHandler should correctly return an error for an invalid input unit.", function () {
      let unit = converter.getUnit("123afd");
      assert.strictEqual(unit, "Error: invalid unit");
    });
    test("convertHandler should return the correct return unit for each valid input unit.", function () {
      assert.strictEqual(converter.getReturnUnit("mi"), "km");
      assert.strictEqual(converter.getReturnUnit("km"), "mi");
      assert.strictEqual(converter.getReturnUnit("lbs"), "kg");
      assert.strictEqual(converter.getReturnUnit("kg"), "lbs");
      assert.strictEqual(converter.getReturnUnit("gal"), "L");
      assert.strictEqual(converter.getReturnUnit("L"), "gal");
    });
    test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
      assert.strictEqual(converter.spellOutUnit("mi"), "miles");
      assert.strictEqual(converter.spellOutUnit("km"), "kilometers");
      assert.strictEqual(converter.spellOutUnit("lbs"), "pounds");
      assert.strictEqual(converter.spellOutUnit("kg"), "kilograms");
      assert.strictEqual(converter.spellOutUnit("gal"), "gallons");
      assert.strictEqual(converter.spellOutUnit("l"), "liters");
    });
  });
  suite("Conversion", function () {
    test("convertHandler should correctly convert gal to L.", function () {
      assert.strictEqual(converter.convert(5, "gal"), 18.92705);
    });
    test("convertHandler should correctly convert L to gal.", function () {
      assert.strictEqual(converter.convert(5, "l"), 1.32086);
    });

    test("convertHandler should correctly convert mi to km.", function () {
      assert.strictEqual(converter.convert(5, "mi"), 8.0467);
    });
    test("convertHandler should correctly convert km to mi.", function () {
      assert.strictEqual(converter.convert(5, "km"), 3.10686);
    });
    test("convertHandler should correctly convert lbs to kg.", function () {
      assert.strictEqual(converter.convert(5, "lbs"), 2.26796);
    });
    test("convertHandler should correctly convert kg to lbs.", function () {
      assert.strictEqual(converter.convert(5, "kg"), 11.02312);
    });
  });
});