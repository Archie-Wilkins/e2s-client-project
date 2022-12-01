import * as fs from "fs";
import {parse} from "csv-parse";
import { useState } from "react";

export default async function handler(req, res) {

        const dataStuff = [];
        let completionFlag = false;

        if(completionFlag === false){
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
                console.log("Am sure: " + JSON.stringify(dataStuff));
                completionFlag = true;
                res.status(200).json({data: JSON.stringify(dataStuff)});
            });
        }
        if(completionFlag){
            res.status(400).json({data: "error messages"}); 
        }
}

