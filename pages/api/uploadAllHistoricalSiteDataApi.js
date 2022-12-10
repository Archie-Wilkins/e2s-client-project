import site from "../../db/site";

export default async function handler(req, res) {
    console.log("Arriving at handler");
    try {
        console.log("Retrieving request");
        //gets user ID that matches email entered
        let siteData = req.body;

        console.log("Checking length of data");
        //if no user is found with that email
        if(siteData.length === 0){
            //returns unsuccessfulLogin
            return res.status(200).json({data: {message:"no data"}});
        }

        console.log("Initialising date given");
        
        let handledArray = [];
        for(let i = 1000; i < 1001; i++){

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

            /*console.log("3: " + siteData[0][8]);
            console.log("4: "+ siteData[0][10]);
            console.log("5: "+ siteData[0][9]);
            console.log("6: "+ siteData[0][2]);
            console.log("7: "+ siteData[0][3]);
            console.log("8: "+ siteData[0][11]);
            console.log("9: "+ (-1*(siteData[0][12])));
            console.log("10: "+ siteData[0][7]);
            console.log("11: "+ (siteData[0][8]*0.193));
            console.log("12: "+ newDate);*/
           
            handledArray.push(localHandledArray2);
        }

        //console.log("Handled: " + handledArray);
        try{
            site.insertHistoricalTest(handledArray);
            return res.status(200).json({data: { message:"great success"}});
        }catch(e){
            console.log("no insert");
        }
   
        //6000 is capcity limit
        //only 1500 added
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
        
        //if password doesn't match return unsuccessfulLogin

    } catch(e){
        //catches error
        console.log("Error");
        return res.status(500);
    }


    // Found the name.
    // Sends a HTTP success code
    res.status(200);
}
