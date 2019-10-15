const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const routes = require('./routes');
let {ReturnMessage} = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.get('/', (req, res) => res.send('API is working'));

app.get('/message', (req, res) =>{
	ReturnMessage.Message = "Test";
	ReturnMessage.Status = "Success";
	res.status(200).json(ReturnMessage)
});

app.use("",routes);

app.post('/menumessaging', (req, res) => {
    const {replyToken} = req.body;
    reply(replyToken);
    res.status(201).json(req.body);
});

//Start Line messaging
app.post('/webhook', (req, res) => {
	console.log('call linemessage.');
	console.log('req.body : '+ JSON.stringify(req.body));
	console.log('replyToken : ' +req.body.events[0].replyToken);
    let reply_token = req.body.events[0].replyToken;
    //reply(reply_token);
    res.sendStatus(200);
});

function reply(reply_token) {
    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer {C98kmiuJHOzhfsd/qUUisSIwi21AFuNquRwbqGK5U7uvOtS0kZAMDkwq9KRgc2gC47lEf/WEbY0dC94LIfHQDSB7I8mJLuZpHrOGFZudujWGdiEEN1McYAaze7BBPCggEK64+U1gWtsLbXyT38yZhwdB04t89/1O/w1cDnyilFU=}'
    }
    let body = JSON.stringify({
        replyToken: reply_token,
        messages: [{
            type: 'text',
            text: 'Hello'
        },
        {
            type: 'text',
            text: 'How are you?'
        }]
    })
    request.post({
        url: 'https://api.line.me/v2/bot/message/reply',
        headers: headers,
        body: body
    }, (err, res, body) => {
        console.log('status = ' + res.statusCode);
    });
};
//End Line messaging

// port (as described above) and host are both wrong
//const host = 'localhost';
//const port = 3000;

// use alternate localhost and the port Heroku assigns to $PORT
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
	console.log("Server started.......");
});


//app.listen(3000, () => console.log('Example app listening on port 3000!'));