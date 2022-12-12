import site from "../../../db/site";


// Database query handler used for returning all site data associated with a user
export default async function handler(req, res) {

    // Attempt to query the database.
    try {
        // Await a database query to be completed with the user ID from the API handed as a parameter.
        console.log("siteData initialised");

        let siteData = await site.getHistoricalSiteDataFromUserID(req.body);

        console.log("siteData initialised");

        // If no errors are caught, return a success message.
        return res.status(200).json({ data: { sites: siteData, message: "great success" } });
    } catch (e) {
        // Any errors are caught and an error message is returned to the API.
        console.log(e);
        console.log("API error finding data from user ID");
        return res.status(500);
    }
    res.status(200);
}
