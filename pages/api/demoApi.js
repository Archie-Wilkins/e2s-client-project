//use in your modules

var db = require('../../db/DatabaseCore.js');


// AI Wanted to do promises here, may be an alternative to callbacks

// Function is default for demoApi.js, this is the only function that is called. The other functions are called
// from here, this is determined by the field 'task' in req.header (Although may be useful to build req.method into
// it in future).

// To do here:
// Set a timeout as postman loops if there is an error
// Add validation for most to all areas
// Re-evaluate how the body data is accessed.
// See if functions can be more cleanly injected into the request handler (i.e dont have them found via header data)

export default async function requestHandler(req, res) {

    try{
    switch (req.headers.task) {
        case 'getUsers':
            getAllUsers(req, res);
            break;
        case 'setUsers':
            setUsers(req, res);
            break;
        default:
            reject('Invalid method name');
    }
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error})
    }
}


async function getAllUsers(req, res) {
    const user_query = "SELECT * FROM user_data";
    db.query(user_query, function (error, result, fields)
    {
        console.log(result);
        if (error) throw error;
        res.status(200).json({user_data: result})
    })
}

async function setUsers(req, res){
    const user_query = "INSERT INTO user_data (email, password, first_name, last_name, phone_number, role_id) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(user_query, [req.body.email, req.body.pass, req.body.fname, req.body.lname, req.body.phone,
        req.body.roleId], function (error, result, fields){
        if (error) throw error;
        res.status(200).json({user_data: result})
    })
}
