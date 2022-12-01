import user from "../../db/user";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks API request data exists
    if (!body.password || !body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //Role ID is the roleID needed to be able to access that page
        // 1 = Admin
        // 2 = Director
        // 3 = ESM

        let userRoleID = await user.getUserRoleID(userID);

        //if userID is the intended roleID
        if (userRoleID === userID){
            return res.status(200).json({data:"true"});
        }

        return res.status(200).json({data:"false"});

    } catch(e){
        //catches error
        console.log(e);
        return res.status(500);
    }

    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}