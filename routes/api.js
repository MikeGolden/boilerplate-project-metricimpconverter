'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  
app.route('/api/convert').get((req, res) => {
  const input = req.query.input;
  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === null && !initUnit) {
    return res.send('invalid number and unit');
  } else if (initNum === null) {
    return res.send('invalid number');
  } else if (!initUnit) {
    return res.send('invalid unit');
  }

  const returnNum = convertHandler.convert(initNum, initUnit);
  if (returnNum === null) {
    return res.send('invalid number');
  }

  const returnUnit = convertHandler.getReturnUnit(initUnit);
  const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

  return res.json(string);
});

};