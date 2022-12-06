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

    const link = document.querySelector("a");
    const textBlob = new Blob([tableArray], { type: "text/csv" });
    link.setAttribute("href", URL.createObjectURL(textBlob));
    link.setAttribute("download", localStorage.getItem("userArrName"));
    this.setState({ csvData: tableArray });
    this.setState({ csvFileName: localStorage.getItem("userArrName") });
    document.getElementsByClassName("downloadCsvDataButton")[0].style.display =
      "block";
  };

  returnHome = async (event) => {
    this.setState({ csvUploaded: false });
  };

  render() {
    return (
      <div>
        <div className="m-5 p-5 bg-light rounded d-flex flex-column align-items-center justify-content-around ">
          <h1>Upload CSV</h1>
          <a className="downloadCsvDataButton">
            Download ({this.state.csvFileName})
          </a>
          {!this.state.csvUploaded && (
            <div className="d-flex flex-column align-items-center justify-content-around ">
              <input
                type="file"
                id="csvFile"
                onChange={this.handleOnChange}
                name="file"
                accept=".csv"
              />

              <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={this.handleScreen}
              >
                Submit
              </button>

              <p>
                Your data must be in the format given in the CSV file below, or
                else it won't format:
              </p>
              <Link href={"../resources/Data_Example.csv"}>
                <p>Download Template</p>
              </Link>
            </div>
          )}
          {this.state.csvUploaded === true && (
            <div>
              <h2>Yor Uploaded Data ({this.state.csvFileName})</h2>
              <button onClick={this.returnHome}>Back</button>
              <ul>
                {this.state.csvData.map((name) => (
                  <div>
                    <h1>Data</h1>
                    <li>Date: {name[0]}</li>
                    <li>CHP1_Electricity_Generation_kW: {name[1]}</li>
                    <li>CHP2_Electricity_Generation_kW: {name[2]}</li>
                    <li>CHP1_Heat_Output_kW: {name[3]}</li>
                    <li>CHP2_Heat_Output_kW: {name[4]}</li>
                    <li>Boiler_Heat_Output_kW: {name[5]}</li>
                    <li>Feels_Like_Temperature_Deg_C: {name[6]}</li>
                    <li>Wind_Speed_ms: {name[7]}</li>
                    <li>Site_Electricity_Demand_kW: {name[8]}</li>
                    <li>Day_ahead_UK_electricity_price: {name[9]}</li>
                    <li>Site_Heat_Demand_kW: {name[10]}</li>
                    <li>Import_Electricity_kW: {name[11]}</li>
                    <li>Export_Electricity_kWL {name[12]}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CsvUploadComponent;
