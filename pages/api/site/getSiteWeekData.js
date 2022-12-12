import site from "../../../db/site";

export default async function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body

    //checks siteID, dateStart, dateEnd
    if (!body.siteID || !body.dateStart || !body.dateEnd) {
        // Sends a HTTP bad request error code
        return res.status(400).json({data: 'Missing data!'})
    }

    try {
        //queries database to get sum of site data for the inputted week
        let queryResult = await site.getSiteWeekData(body.siteID, body.dateStart, body.dateEnd);
        //if no data foynd
        if(queryResult.toString() === ""){
            //returns 'no data'
            return res.status(200).json({data:{message:"no data"}});
        } else {
            //returns 'site found' and queryResult
            return res.status(200).json(queryResult);
        }

    } catch(e){
        //catches error
        console.log(e);
        return res.status(500);
    }
}