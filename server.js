const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes');
var cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("",routes);

// use alternate localhost and the port Heroku assigns to $PORT
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
	console.log("Server started PORT : "+port);
});