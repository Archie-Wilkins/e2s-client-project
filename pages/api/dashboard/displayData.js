import user from "../../../db/user";

export default async function handler(req, res) {

    try {
        //gets user ID that matches email entered
        let userData = await user.all();

        //if no user is found with that email
        if(userData.toString().length === 0){
            //returns unsuccessfulLogin
            return res.status(200).json({data: {message:"no data"}});
        }

        //if password doesn't match return unsuccessfulLogin
        return res.status(200).json({data: {users: userData, message:"great success"}});

    } catch(e){
        //catches error
        console.log(e);
        return res.status(500);
    }


    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
