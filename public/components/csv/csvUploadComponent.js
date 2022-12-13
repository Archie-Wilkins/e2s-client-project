import React, { useEffect, useState } from "react";
import * as fs from "fs";
import { parse } from "csv-parse";
import Papa from "papaparse";
import Link from "next/link";
class CsvUploadComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      csvFileName: "",
      csvUploaded: false,
      csvFileBody: null,
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
    console.log("I AM BEING CLICKED!");
    await this.pushAllSitesToDatabaseApi();
    this.setState({ csvUploaded: false });
  };

  pushAllSitesToDatabaseApi = async (event) => {
    try {
      // API endpoint where we send form data.
      const endpoint = "/api/site/uploadAllHistoricalSiteDataApi";

      let data = [];

      // 1mb POST limit is reached at around 6,000 rows of data in the current format.
      if(this.state.csvData.length > 6000){
        console.log("Too many rows of data, please upload 6000 rows (125 days) or less at a time.");
      }

      // If the user has entered a valid amount of data...
      else if(this.state.csvData.length <= 6000){
        for(let i = 0; i < this.state.csvData.length; i++){
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

  render() {
    return (
      <div aria-label="upload csv page">
        <div className="m-5 p-5 bg-light rounded d-flex flex-column align-items-center justify-content-around ">
          <h1>Upload CSV</h1>

          {!this.state.csvUploaded && (
            <div className="d-flex flex-column align-items-center justify-content-around ">
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
                className="btn btn-primary mt-4"
                onClick={this.handleScreen}
                aria-label="submit csv file button"
              >
                Submit
              </button>

              <p>
                Your data must be in the format given in the CSV file below, or
                else it won't format:
              </p>
              <Link href={"../resources/Data_Example.csv"} aria-label="download template file link">
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
      </div>
    );
  }
}

export default CsvUploadComponent;
