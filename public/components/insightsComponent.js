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
      dataStartDate: "",
      electrictyUsed: 0,
      heatUsed: 0,
      energyExported: 0,
      netEnergy: 0,
      totalSpent: 0,
      daysTracked: 0,

      //This method will be chnaged when pulling from the dataase
      electrictyUsedDay: 0,
      heatUsedDay: 0,
      energyExportedDay: 0,
      netEnergyDay: 0,
      totalSpentDay: 0,
      daysTrackedDay: 0,

      dates:{
        val: ["31/12/2020  23:30:00"],
      },
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
        let localEnergyExport = results.data[0].Export_Electricity_kW; 
        let localSpending = results.data[0].Day_ahead_UK_electricity_price*results.data[0].Site_Electricity_Demand_kW;        
        let localUsedElectric = results.data[0].Site_Electricity_Demand_kW;

        // There are 48 rows per day, the last row is null data, and we are accessing by index
        let localUsedHeatDay = results.data[results.data.length-50].Site_Heat_Demand_kW;         
        let localEnergyExportDay = results.data[results.data.length-50].Export_Electricity_kW; 
        let localSpendingDay = results.data[results.data.length-50].Day_ahead_UK_electricity_price*results.data[0].Site_Electricity_Demand_kW;        
        let localUsedElectricDay = results.data[results.data.length-50].Site_Electricity_Demand_kW;

        // Start from second index as the first one is used earlier for explicit initialisation.
        for (let i = 1; i < results.data.length -1; i++) {
          localUsedElectric = localUsedElectric + results.data[i].Site_Electricity_Demand_kW;
          localUsedHeat = localUsedHeat + results.data[i].Site_Heat_Demand_kW;
          localEnergyExport = localEnergyExport + results.data[i].Export_Electricity_kW;
          localSpending = localSpending + results.data[i].Day_ahead_UK_electricity_price*results.data[i].Site_Electricity_Demand_kW;  
          if(i >= results.data.length - 50){
            localUsedElectricDay = localUsedElectricDay + results.data[i].Site_Electricity_Demand_kW;
            localUsedHeatDay = localUsedHeatDay + results.data[i].Site_Heat_Demand_kW;
            localEnergyExportDay = localEnergyExportDay + results.data[i].Export_Electricity_kW;
            localSpendingDay = localSpendingDay + results.data[i].Day_ahead_UK_electricity_price*results.data[i].Site_Electricity_Demand_kW;
          }
        }

        let localEnergyNet = localUsedElectric + localEnergyExport;
        let localEnergyNetDay = localUsedElectricDay + localEnergyExportDay;
        
        let localCopyDate = results.data[0].Date;
        let dateWithoutTime = "";
        for(let i = 0; i < 10; i++){
            dateWithoutTime = dateWithoutTime + localCopyDate[i];
        }
        localStorage.setItem("startDate", dateWithoutTime);

        // All time data.
        localStorage.setItem("electricty", localUsedElectric);
        localStorage.setItem("heat", localUsedHeat);
        localStorage.setItem("export", localEnergyExport);
        localStorage.setItem("net", localEnergyNet);
        localStorage.setItem("spending", localSpending);
        localStorage.setItem("days", results.data.length/48);

        // Last 24 hours of data.
        localStorage.setItem("electrictyDay", localUsedElectricDay);
        localStorage.setItem("heatDay", localUsedHeatDay);
        localStorage.setItem("exportDay", localEnergyExportDay);
        localStorage.setItem("netDay", localEnergyNetDay);
        localStorage.setItem("spendingDay", localSpendingDay);
      },
    });
  };

  handleDataYear = async (event) => {
  }

  handleDataMonth = async (event) => {
    
  }

  handleDataDay = async (event) => {
    
  }

  handleScreen = async (event) => {
    this.setState({ csvUploaded: true });

    this.setState({dataStartDate: localStorage.getItem("startDate")});
    this.setState({ electrictyUsed: localStorage.getItem("electricty")});
    this.setState({ heatUsed: localStorage.getItem("heat") });
    this.setState({ energyExported: localStorage.getItem("export") });
    this.setState({ netEnergy: localStorage.getItem("net") });
    this.setState({ totalSpent: localStorage.getItem("spending") });
    this.setState({daysTracked: localStorage.getItem("days")});

    this.setState({ electrictyUsedDay: localStorage.getItem("electrictyDay")});
    this.setState({ heatUsedDay: localStorage.getItem("heatDay") });
    this.setState({ energyExportedDay: localStorage.getItem("exportDay") });
    this.setState({ netEnergyDay: localStorage.getItem("netDay") });
    this.setState({ totalSpentDay: localStorage.getItem("spendingDay") });
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
              <div>
                <ul>
                    <h1>All Time Data</h1>
                    <h2>Starting from: {this.state.dataStartDate}</h2>
                    <li>Electricity: {this.state.electrictyUsed}</li>
                    <li>Heat: {this.state.heatUsed}</li>
                    <li>Electricty Exported: {this.state.energyExported}</li>
                    <li>Net Energy: {this.state.netEnergy}</li>
                    <li>Spending: £{this.state.totalSpent}</li>
                    <li>Average Daily Spending: £{this.state.totalSpent/this.state.daysTracked}</li>
                    <li>Over {this.state.daysTracked} days</li>
                </ul>
              </div>
              <div>
                <ul>
                    <h1>Las 24 Hours Data</h1>
                    <li>Electricity: {this.state.electrictyUsedDay}</li>
                    <li>Heat: {this.state.heatUsedDay}</li>
                    <li>Electricty Exported: {this.state.energyExportedDay}</li>
                    <li>Net Energy: {this.state.netEnergyDay}</li>
                    <li>Spending: £{this.state.totalSpentDay}</li>
                    <li>Average Hourly Spending: £{this.state.totalSpentDay/24}</li>
                </ul>
              </div>
              
               
              
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default InsightsComponent;
