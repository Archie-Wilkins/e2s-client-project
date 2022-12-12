import site from "../../../db/site";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks email exists in API request
    if (!body.email) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //gets siteID that matches userID entered
        let findID = await site.getSiteIDFromEmail(body.email);
        //if no user or site is found related to the email
        if(findID.toString() === ""){
            //returns 'no data'
            return res.status(200).json({data:{message:"no site"}});
        } else {
            //stores UserID in variable
            let siteID = await findID[0].site_id;
            //returns 'email found'
            return res.status(200).json({data:{site:siteID.toString() , message:"site found"}});
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
