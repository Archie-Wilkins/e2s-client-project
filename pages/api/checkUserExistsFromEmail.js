import * as mysql from "mysql";
import DB from '../../db';
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';




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
            return res.status(200).json({data:"email not found"});
        } else {
            //returns 'email found'
            console.log("email found");
            return res.status(200).json({data:{message:"email found", code:"FROM SERVER"}});
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
