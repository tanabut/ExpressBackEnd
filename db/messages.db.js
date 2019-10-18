const { config } = require('./config');
const Connection = require('tedious').Connection;
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;

var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err){
        return console.error(err);
    }
    // If no error, then good to proceed.  
    console.log("Connected");
});

const insertMessage = (user) => {
    request = new Request("INSERT Messages (type, timestamp, userid, text) OUTPUT INSERTED.id VALUES (@Type, @Timestamp, @Userid, @Text);", function (err) {
        if (err) {
            console.log(err);
        }
    });
    request.addParameter('Type', TYPES.NVarChar, user.type);
    request.addParameter('Timestamp', TYPES.DateTime, user.timestamp);
    request.addParameter('Userid', TYPES.NVarChar, user.userid);
    request.addParameter('Text', TYPES.NVarChar, user.text);
    request.on('row', function (columns) {
        columns.forEach(function (column) {
            if (column.value === null) {
                console.log('NULL');
            } else {
                console.log("Message id of inserted item is " + column.value);
            }
        });
    });
    connection.execSql(request);
}

module.exports = {
    insertMessage
}