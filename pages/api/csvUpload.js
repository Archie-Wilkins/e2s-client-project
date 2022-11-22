import * as fs from "fs";
import {parse} from "csv-parse";

export default function handler(req, res) {
    const dataStuff = [];

    fs.createReadStream("public/resources/csvExportExample.csv")
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
            //console.log("Am sure: " + JSON.stringify(dataStuff));
            //THREADING
            res.status(200).json({ name: 'John Doe', firstname: JSON.stringify(dataStuff[1]), surname: dataStuff[1], address: dataStuff[2] })
        });
}
