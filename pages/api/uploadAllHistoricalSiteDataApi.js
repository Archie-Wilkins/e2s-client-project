import site from "../../db/site";

export default async function handler(req, res) {

    try {
        //gets user ID that matches email entered
        let siteData = req.body;

        //if no user is found with that email
        if(siteData.length === 0){
            //returns unsuccessfulLogin
            return res.status(200).json({data: {message:"no data"}});
        }

        for (let i = 0; i < siteData.length; i++){
            site.insertHistoricalSite(
                i, i, parseFloat(siteData[i][8]).toFixed(0), parseFloat(siteData[i][9]).toFixed(0),
                parseFloat(siteData[i][2]).toFixed(0) + parseFloat(siteData[i][3]).toFixed(0), 
                parseFloat(siteData[i][11]).toFixed(0), parseFloat(siteData[i][12]).toFixed(0), 
                parseFloat(siteData[i][8]).toFixed(0), parseFloat(siteData[i][10]).toFixed(0), 
                parseFloat(siteData[i][6]).toFixed(0), parseFloat(siteData[i][7]).toFixed(0), 
                parseFloat(0.193 * siteData[i][8]).toFixed(0), siteData[i][0]
                );
        }
        
        //if password doesn't match return unsuccessfulLogin
        return res.status(200).json({data: { message:"great success"}});

    } catch(e){
        //catches error
        console.log("Error");
        return res.status(500);
    }


    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
