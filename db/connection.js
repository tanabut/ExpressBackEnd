const Connection = require('tedious').Connection;

const config = {  
    server: '35.197.137.238',
    authentication: {
        type: 'default',
        options: {
            userName: 'test_sql',
            password: 'P@ssw0rd@2019'
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        //encrypt: true,
        database: 'LineApp'
    }
};

var connection = new Connection(config);
connection.on('connect', function (err) {
    if (err){
        return console.error(err);
    }
    // If no error, then good to proceed.  
    console.log("Connected");
});

module.exports = {
    connection
}

