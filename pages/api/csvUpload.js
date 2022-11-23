import * as fs from "fs";
import {parse} from "csv-parse";

const dataStuff = [];
export default async function handler(req, res) {

    /*new Promise((resolve, reject) => {
        const promises = [];
        fs.createReadStream("public/resources.csvExportExample.csv")
            .pipe(parse({ delimiter: ',', columns: true, ltrim: true }))
            .on("data", row => promises.push(JSON.stringify(row)))
            .on("error", reject)
            .on("end", async () => {
                await Promise.all(promises);
                resolve();
            });
    });*/


    /*fs.createReadStream("public/resources/csvExportExample.csv")
        .pipe(
            parse({
                delimiter: ",",
                columns: true,
                ltrim: true,
            })
        )
        .on("data", function (row) {
            dataStuff.push(row);
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            console.log("Am sure: " + JSON.stringify(dataStuff));
            //THREADING
        });*/

    readFile().then(res.status(200).json({data: JSON.stringify(dataStuff)}));

}

async function readFile(){
    let paused = false;
    let end = false;

    /*fs.createReadStream("public/resources/csvExportExample.csv")
        .pipe(
            parse({
                delimiter: ",",
                columns: true,
                ltrim: true,
            })
        )
        .on("data", function (row) {
            dataStuff.push(row);
        })
        .on("error", function (error) {
            console.log(error.message);
        })
        .on("end", function () {
            console.log("Am sure: " + JSON.stringify(dataStuff));
        });*/

    const stream = fs.createReadStream("public/resources/csvExportExample.csv")
        .pipe(
            parse({
                delimiter: ",",
                columns: true,
                ltrim: true,
            })
        )
        .on("data", async (row) => {
            dataStuff.push(row);
            if(!paused){
                stream.pause();
                paused = true;
                paused = false;
                stream.resume();
                if (end) {
                    //console.log(JSON.stringify(dataStuff));
                    stream.emit("finalEnd");
                }
            }
        })
        .on("error", function (error) {
            console.log(error.message);
        });
        /*.on("end", function () {
            console.log("Am sure: " + JSON.stringify(dataStuff));
        });*/   `1`
}
