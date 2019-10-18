const request = require('request');
const tedious = require('tedious');
const { lineService } = require('../services');
let { LineMessaging, ReturnMessage, DBUser, DBMessage } = require('../models');
let { head, body, message } = LineMessaging;

const token = "C98kmiuJHOzhfsd/qUUisSIwi21AFuNquRwbqGK5U7uvOtS0kZAMDkwq9KRgc2gC47lEf/WEbY0dC94LIfHQDSB7I8mJLuZpHrOGFZudujWGdiEEN1McYAaze7BBPCggEK64+U1gWtsLbXyT38yZhwdB04t89/1O/w1cDnyilFU=";

const webhook = (req, res) => {
    try {
        console.log('Webhook Events.');
        const text = req.body.events[0].message ? req.body.events[0].message.text : null;
        const db_message = new DBMessage(0, req.body.events[0].type, new Date(req.body.events[0].timestamp), req.body.events[0].source.userId, text);
        
        if(db_message.type === "follow"){
            lineService.getUserProfile(db_message.userid).then((user) => {
                console.log(user.displayName);
                lineService.createUser(user);
            });
            //const db_message = new DBMessage(0, req.body.events[0].type, new Date(req.body.events[0].timestamp), req.body.events[0].source.userId, req.body.events[0].message.text);
            //lineService.createUser(db_message);
        }

        if(db_message.type === "message"){
            lineService.createMessage(db_message);
        }
        
        console.log('type : ' + db_message.type);
        console.log('text : ' + db_message.text);
        console.log('userid : ' + db_message.userid);
        console.log('timestamp : ' + db_message.timestamp);
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        ReturnMessage.Status = "Error";
        ReturnMessage.Message = e.message;
        res.status(500).json(ReturnMessage);
    }
};

const onedirection = (req, res) => {
    try {
        console.log('bot send a message to one direction.');
        const _req_msg = req.body.message;
        const _user = req.body.user;

        const _headers = new head(token);
        let _msgarr = [];
        if (Array.isArray(_req_msg)) {
            _req_msg.forEach(req_msg => {
                _msgarr.push(new message("text", req_msg));
            });
        } else {
            _msgarr.push(new message("text", _req_msg));
        }
        const _body = JSON.stringify(new body(_user, _msgarr));

        request.post({
            url: 'https://api.line.me/v2/bot/message/push',
            headers: _headers,
            body: _body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        ReturnMessage.Status = "Error";
        ReturnMessage.Message = e.message;
        res.status(500).json(ReturnMessage);
    }
};

const multidirection = (req, res) => {
    try {
        console.log('bot send a message to one direction.');
        const _req_msg = req.body.message;
        const _user = req.body.user;

        const _headers = new head(token);
        let _msgarr = [];
        if (Array.isArray(_req_msg)) {
            _req_msg.forEach(req_msg => {
                _msgarr.push(new message("text", req_msg));
            });
        } else {
            _msgarr.push(new message("text", _req_msg));
        }
        const _body = JSON.stringify(new body(_user, _msgarr));

        console.log('headers : ' + JSON.stringify(_headers));
        console.log('message : ' + _msgarr);
        console.log('body : ' + _body);

        request.post({
            url: 'https://api.line.me/v2/bot/message/multicast',
            headers: _headers,
            body: _body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
        });
        res.sendStatus(200);
    } catch (e) {
        console.log(e.message);
        ReturnMessage.Status = "Error";
        ReturnMessage.Message = e.message;
        res.status(500).json(ReturnMessage);
    }
};

module.exports = {
    webhook,
    onedirection,
    multidirection
}