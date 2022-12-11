import site from "../../db/site";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks siteID passed in
    if (!body.siteID) {
        // Sends a HTTP bad request error code
        return res.status(400).json({ data: 'Missing data!' })
    }

    try {
        //queries database to get historical average of site data for the selected site
        let queryResult = await site.getSitePastWeekAverage(body.siteID);
        //if no user or site is found related to the email
        if (queryResult.toString() === "") {
            //returns 'no data'
            return res.status(200).json({ data: { message: "no site" } });
        } else {
            console.log("Runnning")
            console.log(res.status(200).json(queryResult))
            //returns 'site found' and queryResult
            return res.status(200).json(queryResult);
        }

    } catch (e) {
        //catches error
        console.log(e);
        return res.status(500);
    }
    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
