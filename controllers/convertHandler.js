function ConvertHandler() {
  this.getNum = function(input) {
  const regex = /^(([0-9]+([.][0-9]+)?((\/[0-9]+([.][0-9]+)?)+)?)\s*)?([a-zA-Z]+)?$/
  const match = input.match(regex);

  if (!match) {
    return null;
  }

  const num = match[2] || '1';
  const frac = match[4];

  let number = parseFloat(num);
  let fraction = null;

  if (frac) {
    if (frac.split('/').length > 2) {
      return null;
    }
    fraction = parseFloat(frac.substring(1));
    if (isNaN(fraction)) {
      return null;
    }
  }

  if (isNaN(number) && !fraction) {
    return null;
  } else if (isNaN(number)) {
    return null;
  }

  return fraction ? number / fraction : number;
};


  this.getUnit = function(input) {
    const regex = /[a-zA-Z]+/;
    const match = input.match(regex);

    if (!match) {
      return null;
    }

    const unit = match[0].toLowerCase();
    const validUnits = ['gal', 'mi', 'km', 'lbs', 'kg'];

    return validUnits.includes(unit) ? unit : unit === 'l' ? 'L' : null;
  };

  this.getReturnUnit = function(initUnit) {
    const unitConverterMap = {
      'l': 'gal',
      'gal': 'L',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    if (!initUnit) {
      return null;
    }
    const result = unitConverterMap[initUnit.toLowerCase()];
    return result || null;
  };

  this.spellOutUnit = function(unit) {
    const unitSpell = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitSpell[unit];
  };

  this.convert = function(initNum, initUnit) {
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  let result;

  if (typeof initNum === 'undefined' || isNaN(initNum)) {
    initNum = 1;
  }

  switch (initUnit.toLowerCase()) {
    case 'gal':
      result = initNum * galToL;
      break;
    case 'l':
      result = initNum / galToL;
      break;
    case 'lbs':
      result = initNum * lbsToKg;
      break;
    case 'kg':
      result = initNum / lbsToKg;
      break;
    case 'mi':
      result = initNum * miToKm;
      break;
    case 'km':
      result = initNum / miToKm;
      break;
    default:
      return null;
  }

  result = Math.round(result * 100000) / 100000;
  return result;
};


  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const spellInit = this.spellOutUnit(initUnit);
    const spellReturn = this.spellOutUnit(returnUnit);

    return {
      initNum: initNum,
      initUnit: initUnit.toLowerCase() === 'l' ? 'L' : initUnit.toLowerCase(),
      returnNum: returnNum,
      returnUnit: returnUnit.toLowerCase() === 'l' ? 'L' : returnUnit.toLowerCase(),
     string: `${initNum} ${spellInit} converts to ${returnNum} ${spellReturn}`
    };
  };

}

module.exports = ConvertHandler;