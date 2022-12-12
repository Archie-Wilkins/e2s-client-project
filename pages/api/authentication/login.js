import user from "../../../db/user";
import {withCookies, useCookies} from "react-cookie";
import Cookies from 'universal-cookie';



export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks API request data exists
    if (!body.password || !body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //gets user ID that matches email entered
        let findID = await user.getUserIDFromEmail(body.email);
        //if no user is found with that email
        if(findID.toString() === ""){
            //returns unsuccessfulLogin
            return res.status(200).json({data: {message:"unsuccessfulLogin"}});
        }

        //if ID has been found
        //stores UserID in variable
        let userID = await findID[0].user_id;
        //gets password from UserID
        let getPassword = await user.getPasswordFromID(userID);
        //then checks if the decrypted password matches users sent password
        if (await getPassword[0].decrypted_password === body.password)
        {
            //will fetch roleID of user
            let getRoleID = await user.getUserRoleID(userID);
            let RoleID = await getRoleID[0].role_id;
            //returns successful response with the userID to login
            return res.status(200).json({data: {message:"success", user:userID, role:RoleID}});//returns userID instead of 'unsuccessfulLogin' if successful
        }

        //if password doesn't match return unsuccessfulLogin
        return res.status(200).json({data: {message:"unsuccessfulLogin"}});

    } catch(e){
        //catches error
        console.log(e);
        return res.status(500);
    }
}
