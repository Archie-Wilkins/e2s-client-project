//use in your modules
import '../../db/DatabaseConfig.js'
var mysqlDb = require('../../db/DatabaseCore'), //path to above db module

db = mysqlDb.get();


function getUsers(req, res) {
    const user_query = "SELECT * FROM user_data";
    db.query(user_query, function (error, result, fields){
        if (error) throw error;
        res.status(200).json({user_data: result})
    })
}

export default getUsers;