import site from "../../db/site";

export default async function handler(req, res) {

    try {
        let siteData = await site.getHistoricalSiteDataFromUserID(req.body);
        for(let i = 0; i < siteData.length; i++){
            if(siteData[i].site_name == null){
                siteData[i].site_name = "none";
            }
        }

        if(siteData.toString().length === 0){
            return res.status(200).json({data: {message:"no data"}});
        }

        return res.status(200).json({data: {sites: siteData, message:"great success"}});

    } catch(e){
        console.log(e);
        return res.status(500);
    }
    res.status(200);
}
