import site from "../../../db/site";

export default async function handler(req, res) {

    try {
        //gets user ID that matches email entered
        let siteData = await site.allHistoric();

        //if no user is found with that email
        if (siteData.length === 0) {
            //returns unsuccessfulLogin
            return res.status(200).json({ data: { message: "no data" } });
        }

        //if password doesn't match return unsuccessfulLogin
        return res.status(200).json({ data: { sites: siteData, message: "great success" } });

    } catch (e) {
        //catches error
        console.log(e);
        return res.status(500);
    }
}
