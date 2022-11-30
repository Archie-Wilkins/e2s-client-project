import * as mysql from "mysql";
import DB from '../../db';
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';
import {isString} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";




export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks email exists in API request
    if (!body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //gets user ID that matches email entered
        let findID = await DB.user.getUserIDFromEmail(body.email);
        //if no user is found with that email
        if(findID.toString() === ""){
            //returns 'email not found'
            return res.status(200).json({data:{message:"email not found"}});
        } else {
            //stores UserID in variable
            let userID = await findID[0].user_id;
            //returns 'email found'
            return res.status(200).json({data:{user:userID.toString() , message:"email found"}});
        }

    } catch(e){
        //catches error
        console.log(e);
        return res.status(500);
    }
    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
