var config = {  
    server: '35.198.212.172',
    authentication: {
        type: 'default',
        options: {
            userName: 'test_sql',
            password: 'P@ssw0rd'
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        //encrypt: true,
        database: 'LineApp'
    }
};

module.exports = {
    config
}

