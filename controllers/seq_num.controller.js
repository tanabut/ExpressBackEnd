var {utils} = require('../utils');

const getresults = (req, res, next) => {
  const {type, parameters} = req.body
  try {
    let results = {};
    if(type === "Regression"){
      results = utils.LinearRegression(parameters);
    }else if(type === "Propagation"){
      results = utils.ForwardAndBackPropagation(parameters);
    }
    res.status(200).json(results);
  } catch(e) {
  console.log(e.message);
    res.sendStatus(500) && next(error);
  }
};

module.exports = {
  getresults
}
