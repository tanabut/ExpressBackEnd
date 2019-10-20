const { connection } = require('./connection');
var Request = require('tedious').Request
var TYPES = require('tedious').TYPES;
let { ReturnMessage } = require('../models');

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

const selectListMessages = (res) => {
    var query = "SELECT ms.userid, convert(varchar, ms.timestamp, 0) as datetime, ms.text, us.username, us.image, ms.type FROM Messages as ms, Users as us";
    query = `${query} WHERE ms.userid = us.userid`;
    query = `${query} AND ms.id in`;
    query = `${query} (SELECT MAX(id) FROM Messages WHERE (ms.type = 'message' or ms.type = 'answer') GROUP BY userid)`;
    query = `${query} ORDER BY ms.id DESC;`;
    
    const request = new Request(query, function (err) {
        if (err) {
            console.log(err);
        }
    });;

    let _rows = [];
    request.on("row", columns => {
        var _item = {};
        // Converting the response row to a JSON formatted object: [property]: value
        for (var index in columns) {
            let name = columns[index].metadata.colName;
            _item[name] = columns[index].value;
        }
        //console.log(_item);
        _rows.push(_item);
    });

    request.on("doneInProc", (rowCount, more, rows) => {
        ReturnMessage.Status = "Success";
        ReturnMessage.Data = _rows;
        res.status(200).send(ReturnMessage);
    });

    connection.execSql(request);
}

const selectMessageByUserid = (res, userid) => {
    var query = "SELECT ms.userid, convert(varchar, ms.timestamp, 0) as Datetime, ms.text, us.username, us.image, ms.type";
    query = `${query} FROM Messages as ms, Users as us`;
    query = `${query} where ms.userid = us.userid`;
    query = `${query} and ms.userid = '${userid}'`;
    query = `${query} and (ms.type = 'message' or ms.type = 'answer')`;
    
    const request = new Request(query, function (err) {
        if (err) {
            console.log(err);
        }
    });;

    let _rows = [];
    request.on("row", columns => {
        var _item = {};
        // Converting the response row to a JSON formatted object: [property]: value
        for (var index in columns) {
            let name = columns[index].metadata.colName;
            _item[name] = columns[index].value;
        }
        //console.log(_item);
        _rows.push(_item);
    });

    request.on("doneInProc", (rowCount, more, rows) => {
        ReturnMessage.Status = "Success";
        ReturnMessage.Data = _rows;
        res.status(200).send(ReturnMessage);
    });

    connection.execSql(request);
}

module.exports = {
    insertMessage,
    selectListMessages,
    selectMessageByUserid
}