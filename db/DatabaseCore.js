const util = require('util')
const mysql = require('mysql')
var pool;

// Checks if the pool singleton is already created, if not, create it.
// The line "pool.query = util.promisify(pool.query)" is to allow async/await syntax
// for queries.

// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4 - Accessed 27/11/2022
// Solution below is based on the above article

module.exports = {
    getPool: function () {
        if (pool) {
            pool.getConnection((err, connection) => {
                if (err) {
                    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                        console.error('Database connection was closed.')
                    }
                    if (err.code === 'ER_CON_COUNT_ERROR') {
                        console.error('Database has too many connections.')
                    }
                    if (err.code === 'ECONNREFUSED') {
                        console.error('Database connection was refused.')
                    }
                    else{
                        console.log("Error occurred on connection: " + err);
                        console.log(err)
                    }
                }

                if (connection) connection.release()
                console.log("Connection to database successful");
                pool.query = util.promisify(pool.query)
                return pool;
            })}

        else {
            pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: 'comsc',
                database: 'e2s_db'
            });
            console.log("Pool created");
            this.getPool();
        }
    }
};
