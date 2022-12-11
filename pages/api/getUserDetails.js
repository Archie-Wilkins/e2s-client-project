import user from "../../db/user";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    console.log("Body: " + body);
    //checks userID exists in API request
    if (!body.userID) {
        console.log("FLAG");
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //get user record
        let JSONuser = await user.getUserRecord(body.userID);

        //returns roleID
        return res.status(200).json(JSONuser);
    } catch(e){
        //catches error
        console.log(e);
        return res.status(500).json({data:{message:"fail"}});
    }
    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
