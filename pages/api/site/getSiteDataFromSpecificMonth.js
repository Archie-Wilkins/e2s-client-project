import site from "../../../db/site";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    console.log(body);

    try {
        //gets siteID that matches userID entered
        let queryResult = await site.getSiteDataFromMonth(body.chosenMonth);
        //if no user or site is found related to the email
        if (queryResult.toString() === "") {
            //returns 'no data'
            return res.status(200).json({ data: { message: "no site" } });
        } else {
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