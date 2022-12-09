
// https://mhagemann.medium.com/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4 - Accessed 27/11/2022
// Solution below is based on the above article

const util = require('util')
const mysql = require('mysql')
const pool = mysql.createPool({
    connectionLimit: 600,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'e2s_db'
})

// Ping database to check for common exception errors.
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
    }

    if (connection) connection.release()

    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool



// Code below was my attempt to enforce only one pool could exist at once, but it doesnt work. (Essentially trying to make the pool a singleton)
// I would like to come back to this and fix it, but it is not a priority.


//
// module.exports = {
//     getConnection: function () {
//         if (pool) {
//             pool.getConnection((err, connection) => {
//                 if (err) {
//                     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//                         console.error('Database connection was closed.')
//                     }
//                     if (err.code === 'ER_CON_COUNT_ERROR') {
//                         console.error('Database has too many connections.')
//                     }
//                     if (err.code === 'ECONNREFUSED') {
//                         console.error('Database connection was refused.')
//                     }
//                     else{
//                         console.log("Error occurred on connection: " + err);
//                         console.log(err)
//                     }
//                 }
//
//                 if (connection) connection.release()
//                 console.log("Connection to database successful");
//                 pool.query = util.promisify(pool.query)
//                 return pool;
//             })}
//
//         else {
//             pool = mysql.createPool({
//                 host: 'localhost',
//                 user: 'root',
//                 password: 'comsc',
//                 database: 'e2s_db'
//             });
//             console.log("Pool created");
//             try {
//                 this.getConnection();
//             }
//             catch (err) {
//                 console.log(err);
//                 return err;
//             }
//         }
//     }
// };