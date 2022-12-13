import React, { useEffect, useState } from "react";
import * as fs from "fs";
import { parse } from "csv-parse";
import Papa from "papaparse";
import Link from "next/link";
import MainLayoutShell from "../../public/components/layouts/mainLayoutShell";
class CsvUploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: [],
            csvFileName: "",
            csvUploaded: false,
            csvFileBody: null,
            pageName: "CSV Upload Page",
            isAdmin: false,
            isDirector: false,
        };
    }

    handleOnChange = async (event) => {
        event.preventDefault();

        Papa.parse(event.target.files[0], {
            header: true,
            download: true,
            dynamicTyping: true,
            complete: function (results) {
                let tableArr = [];

                for (let i = 0; i < results.data.length; i++) {
                    let rowArr = [];
                    rowArr.push(results.data[i].Date);
                    rowArr.push(results.data[i].CHP1_Electricity_Generation_kW);
                    rowArr.push(results.data[i].CHP2_Electricity_Generation_kW);
                    rowArr.push(results.data[i].CHP1_Heat_Output_kW);
                    rowArr.push(results.data[i].CHP2_Heat_Output_kW);
                    rowArr.push(results.data[i].Boiler_Heat_Output_kW);
                    rowArr.push(results.data[i].Feels_Like_Temperature_Deg_C);
                    rowArr.push(results.data[i].Wind_Speed_ms);
                    rowArr.push(results.data[i].Site_Electricity_Demand_kW);
                    rowArr.push(results.data[i].Day_ahead_UK_electricity_price);
                    rowArr.push(results.data[i].Site_Heat_Demand_kW);
                    rowArr.push(results.data[i].Import_Electricity_kW);
                    rowArr.push(results.data[i].Export_Electricity_kW);
                    tableArr.push(rowArr);
                }
                localStorage.setItem("userArr", JSON.stringify(tableArr));
                localStorage.setItem("userArrName", event.target.files[0].name);
            },
        });
    };

    handleScreen = async (event) => {
        this.setState({ csvUploaded: true });
        let localCopyArr = localStorage.getItem("userArr");
        let cellData = "";
        let rowArray = [];
        let tableArray = [];
        let wordArrayObject = [];
        let columnCount = 0;
        for (let i = 0; i < localCopyArr.length; i++) {
            if (
                localCopyArr[i] != "," &&
                localCopyArr[i] != "[" &&
                localCopyArr[i] != "]" &&
                localCopyArr[i] != '"'
            ) {
                cellData = cellData + localCopyArr[i];
            } else {
                // checking if there are 13 columns of data for the current row (i.e row is complete)
                if (columnCount === 13) {
                    tableArray.push(rowArray);
                    rowArray = [];
                    columnCount = 0;
                }
                if (localCopyArr[i] == ",") {
                    wordArrayObject.push(cellData);
                    rowArray.push(wordArrayObject);
                    wordArrayObject = [];
                    cellData = "";
                    columnCount++;
                }
            }
        }


        this.setState({ csvData: tableArray });
        this.setState({ csvFileName: localStorage.getItem("userArrName") });

    };

    returnHome = async (event) => {
        await this.pushAllSitesToDatabaseApi();
        this.setState({ csvUploaded: false });
    };

    pushAllSitesToDatabaseApi = async (event) => {

        try {
            // API endpoint where we send form data.
            const endpoint = "/api/site/uploadAllHistoricalSiteDataApi";

            let data = [];

            // 1mb POST limit is reached at around 6,000 rows of data in the current format.
            if (this.state.csvData.length > 6000) {
                console.log("Too many rows of data, please upload 6000 rows (125 days) or less at a time.");
            }

            // If the user has entered a valid amount of data...
            else if (this.state.csvData.length <= 6000) {
                for (let i = 0; i < this.state.csvData.length; i++) {
                    data.push(this.state.csvData[i]);
                }

                // Send the data to the server in JSON format.
                const JSONdata = JSON.stringify(data);

                // Form the request for sending data to the server.
                const options = {
                    // The method is POST because we are sending data.
                    method: "POST",
                    // Tell the server we're sending JSON.
                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSONdata,
                };

                // Send the form data to our forms API on Vercel and get a response.
                const response = await fetch(endpoint, options);

                // Get the response data from server as JSON.
                const result = await response.json();

                console.log(result.data.message);
            }

        } catch (e) {
            // No action
            console.log("Error");
        }
    };

    // Funtion used to validate user priveleges from the login page and remove cookies. 
    // It is ran before the page loads.
    async componentDidMount() {
        // Attempt to parse a user cookie
        try {
            // Initialise the user cookie
            let userCookieEncypted = Cookies.get().user;

            //import CryptoJS
            var CryptoJS = require("crypto-js");

            //decrypt the cookie
            var bytes = CryptoJS.AES.decrypt(userCookieEncypted, 'team4');

            //store decrypted cookie in userCookie
            var userCookie = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            // If the user has the incorrect credentials for the page, remove them
            if (userCookie.role === 4 || userCookie.role === 1) {
                Cookies.remove("user");
                window.location = "/login";
            }

            // Pass the user id of the logged in user to the page to be used in API calls
            this.setState({ loggedInUserID: userCookie.user });
            //catch erros
        } catch (e) {
            // No action
        }

    };

    render() {
        return (
            <div aria-label="upload csv page">
                <MainLayoutShell isDirector={this.state.isDirector}
                    pageName={this.state.pageName}
                    isAdmin={this.state.isAdmin}>
                    <div className="h-100 d-flex flex-column align-items-center mt-5">
                        <h1 className="text-center">Upload CSV</h1>

                        {!this.state.csvUploaded && (
                            <div className="h-100 d-flex flex-column align-items-center">
                                <input
                                    type="file"
                                    id="csvFile"
                                    onChange={this.handleOnChange}
                                    name="file"
                                    accept=".csv"
                                    aria-label="select csv file button"
                                />

                                <button
                                    type="button"
                                    className="btn btn-primary mt-4 w-25"
                                    onClick={this.handleScreen}
                                    aria-label="submit csv file button"
                                >
                                    Submit
                                </button>

                                <p>
                                    Your data must be in the format given in the CSV file below, or
                                    else it won't format:
                                </p>
                                <Link href={"../../resources/Data_Example.csv"} aria-label="download template file link">
                                    <p>Download Template</p>
                                </Link>
                            </div>
                        )}
                        {this.state.csvUploaded === true && (
                            <div aria-label="uploaded file summary page">
                                <button onClick={this.returnHome} aria-label="go back button">Back</button>
                            </div>
                        )}
                    </div>
                </MainLayoutShell>
            </div>
        );
    }
}

export default CsvUploadComponent;
