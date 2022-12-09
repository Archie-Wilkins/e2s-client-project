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

        for (let i = 0; i < 1; i++){
            console.log("Mystery: " + siteData[i][0]);
            site.insertHistoricalData(
                parseFloat(i), parseFloat(i), parseFloat(siteData[i][8]).toFixed(2), parseFloat(siteData[i][10]).toFixed(2),
                parseFloat(siteData[i][9]).toFixed(2), parseFloat(siteData[i][2] + siteData[i][3]).toFixed(2), 
                parseFloat(siteData[i][11]).toFixed(2), parseFloat(siteData[i][12]), 
                parseFloat(siteData[i][6]).toFixed(2), parseFloat(siteData[i][7]).toFixed(2), 
                parseFloat(siteData[i][8] * 0.193).toFixed(2), String(siteData[i][0]),
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
