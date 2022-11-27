import * as mysql from "mysql";
import DB from '../../db';
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks email exists in API request
    if (!body.userID) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //generate code
        let code = (Math.random() + 1).toString(36).substring(2, 8);

        //create new record with userID, code, expiry time
        await DB.user.createResetRecord(body.userID, code);

        //returns successful + code
        return res.status(200).json({data:{code:code , message:"success"}});
    } catch(e){
        //catches error
        console.log(e);
        return res.status(500).json({data:{message:"fail"}});
    }
    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
