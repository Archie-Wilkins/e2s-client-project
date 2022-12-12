import site from "../../../db/site";
import {getSiteReportListData} from "../../../db/site";

export default async function handler(req, res) {
    try {
        let queryResult = await site.all();
        //returns successful + code
        return res.status(200).json(queryResult);
    } catch(e){
        //catches error
        console.log(e);
        return res.status(500).json({data:{message:"fail"}});
    }
}
