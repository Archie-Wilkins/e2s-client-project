import * as mysql from "mysql";
import DB from '../../db';
import user from "../../db/user";
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';



export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks API request data exists
    if (!body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing email'})
    }

    try {


    } catch(e){
        //catches error
        console.log(e);
        return res.status(500);
    }


    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
