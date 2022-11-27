var mysql = require('mysql');
var pool;

// Create a connection pool.
module.exports = {
    getPool: function () {
        if (pool) return pool;
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: 'comsc',
            database: 'e2s_db'
        });
        return pool;
    }
};