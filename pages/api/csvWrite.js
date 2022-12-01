import * as fs from "fs";

export default function handler(req, res) {

    const content = res;

    if(req === "POST"){
        fs.writeFile("public/resources/csvExportExample.csv", content, function(err, results){
            if(err) console.log('error', err);
            res.status(400).json({message: "Fail"});
        });
        res.status(200).json({message: "Success"});
    }

}
