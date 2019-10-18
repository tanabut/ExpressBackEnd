var {utils} = require('../utils');
let {ReturnMessage} = require('../models');

const getresults = (req, res, next) => {
  const {type, parameters} = req.body
  try {
    let results = {};
    if(type === "Regression"){
      results = utils.LinearRegression(parameters);
    }else if(type === "Propagation"){
      results = utils.ForwardAndBackPropagation(parameters);
    }

    ReturnMessage.Status = "Success";
    ReturnMessage.Message = `The results are as follows: ${results.results}`;
    ReturnMessage.Data = results;
    res.status(200).json(ReturnMessage);
  } catch(e) {
  console.log(e.message);
    ReturnMessage.Status = "Error";
    ReturnMessage.Message = e.message;
    res.sendStatus(500) && next(error);
  }
};

module.exports = {
  getresults
}
