const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Test of getNum function", function () {
    // 1
    test("Read a whole number input", function () {
      let input = "5KG";
      assert.equal(convertHandler.getNum(input), 5);
    });

    // 2
    test("Read a decimal number input", function () {
      let input = "3.24LBS";
      assert.equal(convertHandler.getNum(input), 3.24);
    });

    // 3
    test("Read a fractional input", function () {
      let input = "1/2KM";
      assert.equal(convertHandler.getNum(input), 0.5);
    });

    // 4
    test("Read a fractional input with a decimal", function () {
      let input = "6.6/3";
      assert.equal(convertHandler.getNum(input), 1);
    });

    // 5
    test("Return an error on a double-fraction", function () {
      let input = "3/4/4Mi";
      assert.isNotTrue(convertHandler.getNum(input));
    });

    // 6
    test("Default to a numerical input of 1 when no numerical input is provided", function () {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
    });
  });

  suite("Test of getUnits function", function () {
    // 7
    test("Read each valid input unit", function () {
      let input = "lbs";
      assert.equal(convertHandler.getUnit(input), "lbs");
    });

    // 8
    test("Return an error for an invalid input unit", function () {
      let input = "mts";
      assert.isNotTrue(convertHandler.getUnit(input));
    });

    // 9
    test("Return unit for each valid input unit", function () {
      let unitArr = ["l", "gal", "mi", "km", "lbs", "kg"];

      let objRtnUnit = {
        l: "gal",
        gal: "L",
        mi: "km",
        km: "mi",
        lbs: "kg",
        kg: "lbs",
      };

      let input = unitArr[Math.floor(Math.random() * unitArr.length)];

      assert.equal(convertHandler.getReturnUnit(input), objRtnUnit[input]);
    });

    // 10
    test("return the spelled-out string unit for each valid input unit", function () {
      let unitArr = ["L", "gal", "mi", "km", "lbs", "kg"];

      let objSpellOutUnit = {
        L: "liters",
        gal: "gallons",
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms",
      };

      let input = unitArr[Math.floor(Math.random() * unitArr.length)];

      assert.equal(convertHandler.spellOutUnit(input), objSpellOutUnit[input]);
    });

    // 11
    test("Correctly convert gal to L", function () {
      let input = Math.floor(Math.random() * (100 - 1) + 1);
      const galToL = 3.78541;

      assert.equal(
        convertHandler.convert(input, "gal"),
        (input * galToL).toFixed(5) * 1
      );
    });

    // 12
    test("Correctly convert L to gal", function () {
      let input = Math.floor(Math.random() * (100 - 1) + 1);
      const galToL = 3.78541;

      assert.equal(
        convertHandler.convert(input, "L"),
        (input / galToL).toFixed(5) * 1
      );
    });

    // 13
    test("Correctly convert mi to km", function () {
      let input = Math.floor(Math.random() * (100 - 1) + 1);
      const miToKm = 1.60934;

      assert.equal(
        convertHandler.convert(input, "mi"),
        (input * miToKm).toFixed(5) * 1
      );
    });

    test("Correctly convert km to mi", function () {
      let input = Math.floor(Math.random() * (100 - 1) + 1);
      const miToKm = 1.60934;

      assert.equal(
        convertHandler.convert(input, "km"),
        (input / miToKm).toFixed(5) * 1
      );
    });

    test("Correctly convert lbs to kg", function () {
      let input = Math.floor(Math.random() * (100 - 1) + 1);
      const lbsToKg = 0.453592;

      assert.equal(
        convertHandler.convert(input, "lbs"),
        (input * lbsToKg).toFixed(5) * 1
      );
    });

    test("Correctly convert kg to lbs", function () {
      let input = Math.floor(Math.random() * (100 - 1) + 1);
      const lbsToKg = 0.453592;

      assert.equal(
        convertHandler.convert(input, "kg"),
        (input / lbsToKg).toFixed(5) * 1
      );
    });
  });
});