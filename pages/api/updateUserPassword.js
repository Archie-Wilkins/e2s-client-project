import * as mysql from "mysql";
import DB from '../../db';
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';
import {updateUserPassword} from "../../db/user";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks email exists in API request
    if (!body.userID && !body.password) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //calls SQL to update user record
        await DB.user.updateUserPassword(body.userID, body.password);

        //returns successful + code
        return res.status(200).json({data:{message:"success"}});
    } catch(e){
        //catches error
        console.log(e);
        return res.status(500).json({data:{message:"fail"}});
    }
    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
