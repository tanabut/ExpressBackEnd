const { connection } = require('./connection');
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;

const insertUser = (user) => {
    request = new Request("INSERT Users (userid, username, image) OUTPUT INSERTED.userid VALUES (@Userid, @Username, @Image);", function (err) {
        if (err) {
            console.log(err);
        }
    });
    
    request.addParameter('Userid', TYPES.NVarChar, user.userid);
    request.addParameter('Username', TYPES.NVarChar, user.username);
    request.addParameter('Image', TYPES.NVarChar, user.image);
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("User name of inserted user is " + column.value);
            }
        });
    });
    connection.execSql(request);
}

module.exports = {
    insertUser
}