import React, { useEffect, useState } from "react";
import * as fs from "fs";
import { parse } from "csv-parse";
import Papa from "papaparse";
import Link from "next/link";

class InsightsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: [],
      csvFileName: "",
      csvUploaded: false,
      csvFileBody: null,
      electrictyUsed: 0,
      heatUsed: 0,
      energyExported: 0,
      netEnergy: 0,
      totalSpent: 0,
      daysTracked: 0,
    };
  }

  handleOnChange = async (event) => {
    event.preventDefault();

    Papa.parse(event.target.files[0], {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function (results) {
        let localUsedHeat = results.data[0].Site_Heat_Demand_kW; 
        console.log("Initialise heat: " + localUsedHeat);
        
        let localEnergyExport = results.data[0].Export_Electricity_kW; 
        console.log("Initialise export: " + localEnergyExport);

        let localSpending = results.data[0].Day_ahead_UK_electricity_price*results.data[0].Site_Electricity_Demand_kW;
        console.log("Initialise spending: " + localSpending);
        
        let localUsedElectric = results.data[0].Site_Electricity_Demand_kW;
        console.log("Initialise electric: " + localUsedElectric);

        for (let i = 1; i < results.data.length -1; i++) {
          localUsedElectric = localUsedElectric + results.data[i].Site_Electricity_Demand_kW;
          localUsedHeat = localUsedHeat + results.data[i].Site_Heat_Demand_kW;
          localEnergyExport = localEnergyExport + results.data[i].Export_Electricity_kW;
          localSpending = localSpending + results.data[i].Day_ahead_UK_electricity_price*results.data[i].Site_Electricity_Demand_kW;  

        }

        let localEnergyNet = localUsedElectric + localEnergyExport;
        localStorage.setItem("electricty", localUsedElectric);
        localStorage.setItem("heat", localUsedHeat);
        localStorage.setItem("export", localEnergyExport);
        localStorage.setItem("net", localEnergyNet);
        localStorage.setItem("spending", localSpending);
        localStorage.setItem("days", results.data.length/48);
      },
    });
  };

  handleScreen = async (event) => {
    this.setState({ csvUploaded: true });
    this.setState({ electrictyUsed: localStorage.getItem("electricty")});
    this.setState({ heatUsed: localStorage.getItem("heat") });
    this.setState({ energyExported: localStorage.getItem("export") });
    this.setState({ netEnergy: localStorage.getItem("net") });
    this.setState({ totalSpent: localStorage.getItem("spending") });
    this.setState({ totalSpent: localStorage.getItem("spending") });
    this.setState({daysTracked: localStorage.getItem("days")});
  };

  returnHome = async (event) => {
    this.setState({ csvUploaded: false });
  };

  render() {
    return (
      <div>
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
              <button onClick={this.returnHome}>Back</button>
              <ul>
                <h1>Data</h1>
                <li>Electricity: {this.state.electrictyUsed}</li>
                <li>Heat: {this.state.heatUsed}</li>
                <li>Electricty Exported: {this.state.energyExported}</li>
                <li>Net Energy: {this.state.netEnergy}</li>
                <li>Spending: £{this.state.totalSpent}</li>
                <li>Average Daily Spending: £{this.state.totalSpent/this.state.daysTracked}</li>
                <li>Over {this.state.daysTracked} days</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default InsightsComponent;
