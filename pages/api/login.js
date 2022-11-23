import * as mysql from "mysql";
import DB from '../../db';


export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.password || !body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        let user = await DB.user.all();
        //f
        console.log("flagging blog " + JSON.stringify(user));
        return res.status(200).json({data: JSON.stringify(user)});
    } catch(e){
        console.log(e);
        return res.status(500);
    }


    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
