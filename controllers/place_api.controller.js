const request = require('request');
let {ReturnMessage} = require('../models');

const fiderestaurants = (req, res) => {
  try {
    //PARAMETERS FOR SEARCH QUERY FOR RESTAURANTS, OPEN NOW
	const baseurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?';
	const location = 'location=13.8199823,100.5163674';
    const address = 'address=10800,Bang+Sue,%u0E1A%u0E32%u0E07%u0E0B%u0E37%u0E48%u0E2D';
	const type = 'type=restaurant';
	const opennow = 'opennow=true';
	const key = 'key=AIzaSyChQcT0j5iBDFgLhYlYPPjPuwaIAWz7-vs';
	
    const queryurl = `${baseurl}${location}&${address}&${type}&${opennow}&${key}`;

	//SEARCH QUERY TO GOOGLE PLACES API, USING REQUEST MODULE
	request({
		uri: queryurl,
		method: "GET",
		timeout: 10000,
		followRedirect: true,
		maxRedireccts: 10
		}, function(err, response, body) {
			if(err){
                console.log(err);
                ReturnMessage.Status = "Error";
                ReturnMessage.Message = err.message;
                res.status(500).json(ReturnMessage);
			} else {
				var responseparsed = JSON.parse(body);
				var results = responseparsed.results;
                ReturnMessage.Status = "Success";
                ReturnMessage.Message = "Response data from Place API(by Google) success.";
                ReturnMessage.Data = [...results];
                res.status(200).json(ReturnMessage);
			}
		}
	)
  } catch(e) {
    console.log(e.message);
    ReturnMessage.Status = "Error";
    ReturnMessage.Message = e.message;
    res.status(500).json(ReturnMessage);
  }
};

module.exports = {
    fiderestaurants
}