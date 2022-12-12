import site from "../../db/site";


// Database query handler used for returning all site data associated with a user
export default async function handler(req, res) {

    // Attempt to query the database.
    try {
        console.log("Arrived");
        // Await a database query to be completed with the user ID from the API handed as a parameter.
        let siteData = await site.getHistoricalSiteDataFromUserID(req.body);
        
        // For every site returned, change any invalid site names to "none" to avoid errors.
        for(let i = 0; i < siteData.length; i++){
            if(siteData[i].site_name == null){
                siteData[i].site_name = "none";
            }
        }

        // If the length of the returned array is 0, then no data has been returned.
        if(siteData.toString().length === 0){
            return res.status(200).json({data: {message:"no data"}});
        }

        // If no errors are caught, return a success message.
        return res.status(200).json({data: {sites: siteData, message:"great success"}});

    } catch(e){
        // Any errors are caught and an error message is returned to the API.
        console.log(e);
        return res.status(500);
    }
    res.status(200);
}
