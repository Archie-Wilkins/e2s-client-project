import site from "../../../db/site";

export default async function handler(req, res) {
    try {
        //gets user ID that matches email entered
        let siteData = req.body;

        //if no user is found with that email
        if (siteData.length === 0) {
            //returns unsuccessfulLogin
            return res.status(500).json({ data: { message: "no data" } });
        }

        let handledArray = [];

       
        //console.log("Handled: " + handledArray);
        try {
            //site.insertHistoricalTest(handledArray);
            for (let i = 0; i < siteData.length; i++) {

                let datetime = siteData[i][0];
                let [date, time] = datetime.toString().split(" ");
                let [day, month, year] = date.split('/');
                let newDate = year + "-" + month + "-" + day + " " + time + ":00";
    
                let sumVal = siteData[i][2] + siteData[i][3];
                let sumVal2 = siteData[i][8] * 0.193;
                let sumVal3 = -1 * siteData[i][12];
    
                let localHandledArray = [
                    parseFloat(i).toFixed(0), parseFloat(i).toFixed(0), parseFloat(siteData[i][8]).toFixed(2), parseFloat(siteData[i][10]).toFixed(2),
                    parseFloat(siteData[i][9]).toFixed(2), parseFloat(sumVal).toFixed(2),
                    parseFloat(siteData[i][11]).toFixed(2), parseFloat(sumVal3).toFixed(3),
                    parseFloat(siteData[i][6]).toFixed(1), parseFloat(siteData[i][7]).toFixed(1),
                    parseFloat(sumVal2).toFixed(1), newDate
                ];
    
                let localHandledArray2 = [
                    parseFloat(i), parseFloat(i), parseFloat(siteData[i][8]), parseFloat(siteData[i][10]),
                    parseFloat(siteData[i][9]), parseFloat(sumVal),
                    parseFloat(siteData[i][11]), parseFloat(sumVal3),
                    parseFloat(siteData[i][6]), parseFloat(siteData[i][7]),
                    parseFloat(sumVal2), newDate
                ];
    
                let testArr = [];
                testArr.push(localHandledArray2);
                site.insertHistoricalTest(testArr);
                handledArray.push(localHandledArray2);
            }
            return res.status(200).json({ data: { message: "great success" } });
        } catch (e) {
            console.log("no insert");
            return res.status(500).json({ data: { message: "great shame" } });
        }

        /*try{
            for (let i = 0; i < 1500; i++){
                //console.log("Mystery: " + siteData[i][0]);
                await site.insertHistoricalData(
                    parseFloat(i), parseFloat(i), parseFloat(siteData[i][8]).toFixed(2), parseFloat(siteData[i][10]).toFixed(2),
                    parseFloat(siteData[i][9]).toFixed(2), parseFloat(siteData[i][2] + siteData[i][3]).toFixed(2), 
                    parseFloat(siteData[i][11]).toFixed(2), parseFloat(siteData[i][12]), 
                    parseFloat(siteData[i][6]).toFixed(2), parseFloat(siteData[i][7]).toFixed(2), 
                    parseFloat(siteData[i][8] * 0.193).toFixed(2), String(siteData[i][0]),
                    );
            }
        }catch(e){
            console.log("Fail");
        }*/

    } catch (e) {
        //catches error
        console.log("Error");
        return res.status(500);
    }


    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
