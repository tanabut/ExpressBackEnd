const Math = require('mathjs');
var {Variable} = require('../models');

var LinearRegression = function(parameters) {
    const a = 1, b = 1, c = 3;
    let results = [];
    let resultvariables = [];
    parameters.forEach((element , n) => {
      if(isNaN(element)){
        const regression = (a * Math.pow(n, 2)) + (b * n) + c;
        results.push(regression);
        let variable = new Variable(element, regression);
        resultvariables.push(variable);
      }else{
        results.push(Number(element));
      }
    });
    return {results,resultvariables};
};

module.exports = {
    LinearRegression
};