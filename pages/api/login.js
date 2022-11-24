import * as mysql from "mysql";
import DB from '../../db';
import user from "../../db/user";
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';



export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    // Optional logging to see the responses
    // in the command line where next.js app is running.
    //console.log('body: ', body)

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.password || !body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //gets user ID that matches email entered
        let findID = await DB.user.getUserIDFromEmail(body.email);
        //stores UserID in variable
        let userID = await findID[0].User_Id;
        //checks UserID exists
        try {
            if (parseInt(await userID) > 0) {
                //gets userID's password into JSON
                let getPassword = await DB.user.getPasswordFromID(userID);
                if (await getPassword[0].decrypted_password === body.password)
                {
                    console.log("valid logging into user: " + userID);
                    return res.status(200).json({data:userID});//returns userID instead of 'unsuccessfulLogin' if successful
                }
            }
        } catch(e){
            console.log(e);
            return res.status(200).json({data:"unsuccessfulLogin"});
        }

        return res.status(200).json({data:"unsuccessfulLogin"});






    } catch(e){
        console.log(e);
        return res.status(500);
    }


    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
