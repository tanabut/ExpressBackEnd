const { insertMessage, insertUser, blogpostDb } = require('../db');
const line = require('@line/bot-sdk');
const request = require('request');
let { DBUser } = require('../models');

const client = new line.Client({
    channelAccessToken: 'C98kmiuJHOzhfsd/qUUisSIwi21AFuNquRwbqGK5U7uvOtS0kZAMDkwq9KRgc2gC47lEf/WEbY0dC94LIfHQDSB7I8mJLuZpHrOGFZudujWGdiEEN1McYAaze7BBPCggEK64+U1gWtsLbXyT38yZhwdB04t89/1O/w1cDnyilFU='
});

const pushMessage = async (user, content) => {
    try {
        return await blogpostDb(user, content)
    } catch (e) {
        throw new Error(e.message)
    }
}

const multiCastMessage = async (user, content) => {
    try {
        return await blogpostDb(user, content)
    } catch (e) {
        throw new Error(e.message)
    }
}

const createUser = async (user) => {
    try {
        return await insertUser(user);
    } catch (e) {
        throw new Error(e.message)
    }
}

const createMessage = async (db_message) => {
    try {
        return await insertMessage(db_message)
    } catch (e) {
        throw new Error(e.message)
    }
}

const getUserProfile = async (userid) => {
    try {
        return user = await client.getProfile(userid)
        .then((profile) => {
            return new DBUser(profile.userId, profile.displayName, profile.pictureUrl);
        })
        .catch((err) => {
          // error handling
          console.log(err);
        });

        /*const url = `https://api.line.me/v2/bot/profile/${userid}`
        return await request.post({
            url: url,
            headers: _headers,
            body: _body
        }, (err, res, body) => {
            console.log('status = ' + res.statusCode);
            return body;
        });*/
        //return await insertMessage(db_message)
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    pushMessage,
    multiCastMessage,
    createUser,
    createMessage,
    getUserProfile
}