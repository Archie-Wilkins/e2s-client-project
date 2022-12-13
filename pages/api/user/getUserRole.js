import user from "../../../db/user";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks userID exists in API request
    if (!body.userID) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //get decoded code from userID in table
        let JSONuser = await user.getUserRoleID(body.userID);

        let roleID = await JSONuser[0].role_id;

        //returns roleID
        return res.status(200).json({data:{message:"success", role:roleID}});
    } catch(e){
        //catches error
        console.log(e);
        return res.status(500).json({data:{message:"fail"}});
    }
    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
