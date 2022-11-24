//use in your modules

var mysqlDb = require('../../db/DatabaseCore.js');
var db = mysqlDb.getPool();


function getUsers(req, res) {
    const user_query = "SELECT * FROM user_data";
    db.query(user_query, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({user_data: result})
    })
}

export default getUsers;