import * as mysql from "mysql";
import DB from '../../db';
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks email exists in API request
    if (!body.userID && !body.code) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //get decoded code from userID in table
        let JSONcode = await DB.user.getUserResetCode(body.userID);

        let code = await JSONcode[0].decrypted_code;


        //if decrypted code === user inputted code
        if(code === body.code){
            //return success/match
            return res.status(200).json({data:{message:"match"}});
        }
        //did not match
        return res.status(200).json({data:{message:"fail"}});
    } catch(e){
        //catches error
        console.log(e);
        return res.status(500).json({data:{message:"fail"}});
    }
    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
