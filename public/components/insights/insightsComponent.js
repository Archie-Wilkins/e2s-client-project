import React, { useEffect, useState } from "react";
import * as fs from "fs";
import { parse } from "csv-parse";
import Papa from "papaparse";
import Link from "next/link";

// This Component renders the page which returns insights to users based on uploaded CSV data
class InsightsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      // Variable used to track whether or not users have completed attempting to upload a CSV.
      csvUploaded: false,
    
      // String used to record the first given date in uploaded CSV data.
      dataStartDate: "",

      // DATA BY ALL TIME
      // Variable for all time electricty used in uploaded CSV data.
      electrictyUsed: 0,
      
      // Variable for all time heat used in uploaded CSV data.
      heatUsed: 0,
      
      // Variable for all time energy exported in uploaded CSV data.
      energyExported: 0,
      
      // Variable for all time net energy used in uploaded CSV data (calculated by comparing site demand versus export).
      netEnergy: 0,
      
      // Variable for all time spending in uploaded CSV data.
      totalSpent: 0,

      // Variable to track energy usage of asset one over all uploaded time.   
      asset1Usage: 0,

      // Variable to track energy usage of asset two over all uploaded time.
      asset2Usage: 0,
      
      // Variable for the number of days of data in uploaded CSV data.
      daysTracked: 0,

      // DATA BY DAY 
      // Variable for electricty used in the last day in uploaded CSV data.   
      electrictyUsedDay: 0,
      
      // Variable for heat used in the last day in uploaded CSV data.
      heatUsedDay: 0,
      
      // Variable for energy exported in the last day in uploaded CSV data.
      energyExportedDay: 0,
      
      // Variable for net energy use in the last day in uploaded CSV data.
      netEnergyDay: 0,
      
      // Variable for spending in the last day in uploaded CSV data.
      totalSpentDay: 0,

      // Variable to track energy usage of asset two over the last day.
      asset1UsageDay: 0,

      // Variable to track energy usage of asset two over the last day.
      asset2UsageDay: 0,

      // Boolean to assess whether the User has submitted a valid CSV file.
      isValidCsv: false,
      
      // Boolean to assess whether or not to return an error to the User when they try to upload their CSV.
      errorReturn: false,

      // Mock data to test cases wherein data for specified dates has already been uploaded.
      dates:{
        // The first selection reflects dates which will not have been uploaded yet by users for the purpose of testing.
        val: ["31/12/2020 23:32", "01/01/2020 00:02"],

        // The second selection reflects dates which will have been uploaded yet by users for the purpose of testing.
        val2: ["31/12/2020 23:30"],
      },

      // Variable to track which energy zone the energy site resides in.
      distributionNetwork: "EPN",

      // Variable to track the amount of energy usage time spent in red-zone periods.
      redZoneUsage: 0,

      // Variable to track the amount of energy usage time spent in red-zone periods.
      amberZoneUsage: 0,

      // Variable to track the amount of energy usage time spent in red-zone periods.
      greenZoneUsage: 0,

      // Variable to count how many rows of data are being accessed.
      numberOfDataRows:0,
    };
  }

  // Async function to handle the User choosing a CSV file to upload.
  handleOnChange = async (event) => {

    // Prevent the page beinf refreshed by the function.
    event.preventDefault();

    // Initialise local storage value for whether or not the user has given data with valid dates. The data is
    // not sensitive so localStorage is appropriate as state variable cannot be accessed during the CSV parse.
    localStorage.setItem("validDates", false);

    // Initialise an array of mocked dates already uploaded by the user to the mock state data.
    let arrayOfExistingDates = this.state.dates.val;

    // Variable to track whether or not the CSV parse is finished with its tasks before proceding. 
    let awaitFinish = "false";

    // Constant variable to define which energy distribution network the site is connected to.
    const localDistributionNetwork = this.state.distributionNetwork;

    // Variable to count how many periods of energy usage were during green zone pricing.
    let greenZoneCount = 1;

    // Variable to count how many periods of energy usage were during amber zone pricing.
    let amberZoneCount = 0;

    // Variable to count how many periods of energy usage were during red zone pricing.
    let redZoneCount = 0;

    // Data begins on 01/01/2020 (a Wednesday). This variable tracks which day data is presented on.
    let dayTracker = 3;

    // Variable to check how many slots in a day have been checked. (Will never exceed 48)
    let timeSlotsChecked = 0;

    // Parse the chosen User file using Papa.parse.
    Papa.parse(event.target.files[0], {
      header: true,
      download: true,
      dynamicTyping: true,

      // On completing all rows of parsing...
      complete: function (results) {

        // For-loop through all existing mocked dates (to later be updated with database calls).
        for(let i = 0; i < arrayOfExistingDates.length; i++){

            // Then for-loop through all user-submitted dates in the CSV file.
            // The final row of data is read as 'null' so we disregard it when reading.
            for(let x = 0; x < results.data.length - 1; x++){

                // If any of the uploaded dates match any dates on file, 
                if(arrayOfExistingDates[i] === results.data[x].Date){
                    
                    // Update the local storage variable Boolean for valid user input to false.
                    localStorage.setItem("validDates", "false");

                    // Notify the system that the user is done with their current CSV upload attempt.
                    awaitFinish = "true";

                    // Exit the for loop to avoid the Boolean being altered again.
                    break;
                }else{
                    // If on the very last row of uploaded data and existing data no match has been foudn...
                    if(i === arrayOfExistingDates.length - 1 && x === results.data.length - 2){

                        // Notify the system that the user is done with their current CSV upload attempt.
                        awaitFinish = "true";

                        // Notify the system that the user has inputted a valid CSV file.
                        localStorage.setItem("validDates", "true");
                    }
                }                
            }
        }

        // If the parsing process is finished and the user has submitted valid data....
        if(localStorage.getItem("validDates") === "true" && awaitFinish === "true"){
            
            // Initialise local variables used to calculate the total values of each column for all time.
            let localUsedHeat = results.data[0].Site_Heat_Demand_kW;         
            let localEnergyExport = results.data[0].Export_Electricity_kW; 
            let localSpending = results.data[0].Day_ahead_UK_electricity_price*results.data[0].Site_Electricity_Demand_kW;        
            let localUsedElectric = results.data[0].Site_Electricity_Demand_kW;

            let localAsset1 = results.data[0].CHP1_Electricity_Generation_kW;
            let localAsset2 = results.data[0].CHP2_Electricity_Generation_kW;

            // Initialise local variables used to calculate the total values of each column for the last day.
            // There are 48 rows per day, the last row is null data, and we are accessing by index so we use -50.
            let localUsedHeatDay = results.data[results.data.length-50].Site_Heat_Demand_kW;         
            let localEnergyExportDay = results.data[results.data.length-50].Export_Electricity_kW; 
            let localSpendingDay = results.data[results.data.length-50].Day_ahead_UK_electricity_price*results.data[0].Site_Electricity_Demand_kW;        
            let localUsedElectricDay = results.data[results.data.length-50].Site_Electricity_Demand_kW;

            // Start from second index as the first one is used earlier for explicit initialisation.
            for (let i = 1; i < results.data.length -1; i++) {
                
                // All time data incrementing by adding data in each index together.
                localUsedElectric = localUsedElectric + results.data[i].Site_Electricity_Demand_kW;
                localUsedHeat = localUsedHeat + results.data[i].Site_Heat_Demand_kW;
                localEnergyExport = localEnergyExport + results.data[i].Export_Electricity_kW;
                localSpending = localSpending + results.data[i].Day_ahead_UK_electricity_price*results.data[i].Site_Electricity_Demand_kW;  
                localAsset1 = localAsset1 + results.data[i].CHP1_Electricity_Generation_kW;
                localAsset2 = localAsset2 + results.data[i].CHP2_Electricity_Generation_kW;

                // Last day data incrementing by adding data in each index together.
                // This only starts on the last 48 relevant rows of data.
                if(i >= results.data.length - 50){
                    localUsedElectricDay = localUsedElectricDay + results.data[i].Site_Electricity_Demand_kW;
                    localUsedHeatDay = localUsedHeatDay + results.data[i].Site_Heat_Demand_kW;
                    localEnergyExportDay = localEnergyExportDay + results.data[i].Export_Electricity_kW;
                    localSpendingDay = localSpendingDay + results.data[i].Day_ahead_UK_electricity_price*results.data[i].Site_Electricity_Demand_kW;
                }

                // Check if the current site is part of the EPN distribution network.
                if(localDistributionNetwork === "EPN"){

                    // Check if the day is Monday through Friday.
                    if(dayTracker < 6){

                        // If it is, create a substring from the date handed in the csv.
                        let dateTime = "";

                        // Split the date and the time apart in the cell.
                        // .split()
                        for(let b = 11; b < 16; b++){
                            if(b !== 13){
                                dateTime = dateTime + results.data[i].Date[b];
                            }
                        }

                        // Convert the data into an integer
                        let timeNum = parseInt(dateTime);

                        // Evaluate which time period the time falls between.
                        if(timeNum >= 1600 && timeNum <= 1900){

                            // Increment counters to track how many periods of time were using which tariff of cost.
                            redZoneCount = redZoneCount + 1;
                        }
                        if((timeNum >= 700 && timeNum < 1600) || (timeNum > 1900 && timeNum <= 2300)){
                            amberZoneCount = amberZoneCount + 1;
                        }if(timeNum > 2300 || timeNum < 700){
                            greenZoneCount = greenZoneCount + 1;
                        }
                    }

                    if(dayTracker === 6 || dayTracker === 7){

                        // If it is Saturday or Sunday, there price will only ever be green zone. 
                        greenZoneCount = greenZoneCount + 1;
                    }


                    // If 48 time slots have been checked, an entire day of data has been passed.
                    if(timeSlotsChecked == 48){
                        
                        // Check if it is Sunday (Monday - 1, Tuesday - 2, ..., Sunday - 7).
                        if(dayTracker < 7){

                            // Move the day tracker forward a day.
                            dayTracker = dayTracker + 1;
                        }

                        if(dayTracker === 7){

                            // If the day is Sunday, reset it to Monday after all slots have been checked.
                            dayTracker = 1;
                        }

                        // Reset the number of slots checked for a day.
                        timeSlotsChecked = 0;
                    }

                    if(timeSlotsChecked < 48){
                        // Increment the number of slots checked for the day.
                        timeSlotsChecked = timeSlotsChecked + 1;
                    }
                    
                }
            }

            // Calculate net energy uses by adding the postive electricty use to the negative electricty export.
            let localEnergyNet = localUsedElectric + localEnergyExport;
            let localEnergyNetDay = localUsedElectricDay + localEnergyExportDay;
            
            // Initialise the first date given in the CSV file.
            let localCopyDate = results.data[0].Date;

            // Data is submitted with dates and times in one cell, but for display purposes we want to remove the time.
            let dateWithoutTime = "";

            // The date will only ever be 10 characters long e.g., DD/MM/YYYY.
            for(let i = 0; i < 10; i++){

                // Build the string for the date to be displayed.
                dateWithoutTime = dateWithoutTime + localCopyDate[i];
            }

            //console.log("Total slots: " + String(results.data.length - 1));

            // Save the start date to local storage so that it can be later accessed and saved to state.
            localStorage.setItem("startDate", dateWithoutTime);

            localStorage.setItem("csvSize", results.data.length - 1);

            // All time data local storage initialisation.
            localStorage.setItem("electricty", localUsedElectric);
            localStorage.setItem("heat", localUsedHeat);
            localStorage.setItem("export", localEnergyExport);
            localStorage.setItem("net", localEnergyNet);
            localStorage.setItem("spending", localSpending);
            localStorage.setItem("asset1", localAsset1);
            localStorage.setItem("asset2", localAsset2);
            localStorage.setItem("days", results.data.length/48);

            // Last day data local storage initialisation.
            localStorage.setItem("electrictyDay", localUsedElectricDay);
            localStorage.setItem("heatDay", localUsedHeatDay);
            localStorage.setItem("exportDay", localEnergyExportDay);
            localStorage.setItem("netDay", localEnergyNetDay);
            localStorage.setItem("spendingDay", localSpendingDay);

            // Set local storage variables for the total number of slots in each zone.
            console.log("R: " + redZoneCount);
            console.log("A: " + amberZoneCount);
            console.log("G: " + greenZoneCount);
            console.log("Percentage in red: " + String(redZoneCount/(results.data.length-1)*100));
            console.log("Percentage in amber: " + String(amberZoneCount/(results.data.length-1)*100));
            console.log("Percentage in green: " + String(greenZoneCount/(results.data.length-1)*100));

            localStorage.setItem("redZoneTotal", redZoneCount);
            localStorage.setItem("amberZoneTotal", amberZoneCount);
            localStorage.setItem("greenZoneTotal", greenZoneCount);

        }
    
        // If the parsing process is finished and the user has not submitted valid data....
        if(localStorage.getItem("validDates") === "false" && awaitFinish === "true"){

            // Give the user an alert that their attempt has failed.
            window.alert("Inputted data clashed with existing data. Please try again with a new file.");
        }

      },
    });   

  }

  // Function to handle rendering a screen of summary data post CSV upload.
  handleScreen = async (event) => {

    // Check if the local storage has recorded the user as having uploaded a valid CSV.
    if(localStorage.getItem("validDates") === "true"){
        
        // Set the state variable for tracking a valid CSV upload to true.
        this.setState({isValidCsv: true});

        // Set the state variable for tracking a CSV upload to true.
        this.setState({ csvUploaded: true });
    }
    
    // Check if the local storage has recorded the user as having uploaded an invalid CSV.
    if(localStorage.getItem("validDates") === "false"){

        // Set an error response for the user to true.
        this.setState({errorReturn: true});

        // Set the variable for valid CSV upload to false.
        this.setState({isValidCsv: false}); 
    }
    
    // Save calculated totals for all columns for all time to their relative state variables.
    this.setState({dataStartDate: localStorage.getItem("startDate")});
    this.setState({ electrictyUsed: localStorage.getItem("electricty")});
    this.setState({ heatUsed: localStorage.getItem("heat") });
    this.setState({ energyExported: localStorage.getItem("export") });
    this.setState({ netEnergy: localStorage.getItem("net") });
    this.setState({ totalSpent: localStorage.getItem("spending") });
    this.setState({ asset1Usage: localStorage.getItem("asset1") });
    this.setState({ asset2Usage: localStorage.getItem("asset2") });
    
    // Save the calculated number of days of data uploaded to the state. 
    this.setState({daysTracked: localStorage.getItem("days")});

    // Save calculated totals for all columns for the last day to their relative state variables.
    this.setState({ electrictyUsedDay: localStorage.getItem("electrictyDay")});
    this.setState({ heatUsedDay: localStorage.getItem("heatDay") });
    this.setState({ energyExportedDay: localStorage.getItem("exportDay") });
    this.setState({ netEnergyDay: localStorage.getItem("netDay") });
    this.setState({ totalSpentDay: localStorage.getItem("spendingDay") });

    // Set the state variables for each zone with how many slots each zone observed.
    this.setState({redZoneUsage: localStorage.getItem("redZoneTotal")});
    this.setState({amberZoneUsage: localStorage.getItem("amberZoneTotal")});
    this.setState({greenZoneUsage: localStorage.getItem("greenZoneTotal")});   
    this.setState({numberOfDataRows: localStorage.getItem("csvSize")});

  };

  // Function to handle returning back to CSV upload from the CSV metrics summary.
  returnHome = async (event) => {
    this.setState({ csvUploaded: false });
  };

  // Render the contents of the page.
  render() {
    return (
      <div aria-label="Insights page content.">
        <div className="m-5 p-5 bg-light rounded d-flex flex-column align-items-center justify-content-around ">
          <h1>CSV Insights</h1><br/>

          {/*Check that the user not yet uploaded a csv */}
          {!this.state.csvUploaded && (
            <div className="d-flex flex-column align-items-center justify-content-around " aria-label="upload csv section">
              <input
                type="file"
                id="csvFile"
                onChange={this.handleOnChange}
                name="file"
                accept=".csv"
                aria-label="select CSV date file button"
              /><br/>
                <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={this.handleScreen}
              >
                Submit
              </button>

              {/*Check that the user has attempted to upload an invalid csv */} 
              {this.state.isValidCsv === false &&(
                <div aria-label="selected csv invalid message">
                    {this.state.errorReturn === true &&(
                        <h2>Dates in file already uploaded! Please select a new file.</h2>
                    )}
                </div>
              )}  
              
              <br/><br/>
              <div aria-label="Download csv template file section">  
                <p>
                    Your data must be in the format given in the CSV file below, or
                    else it won't format:
                </p>
                <Link href={"../resources/Data_Example.csv"} aria-label="file download link">
                    <p>Download Template</p>
                </Link>
              </div>
            </div>
          )}

          {/*Check that the user has attempted to upload a valid CSV*/}             
          {this.state.isValidCsv === true &&(
            <div aria-label="valid csv upload summary section">
                {this.state.csvUploaded === true && (
                    <div>
                        <button onClick={this.returnHome} aria-label="return to upload button">Back</button>
                        
                        {/*Display all time data */}
                        <div aria-label="all time insights section">
                            <ul>
                                <h1>All Time Data</h1>
                                <h2>Starting from: {this.state.dataStartDate}</h2>
                                <li>Electricity: {parseFloat(this.state.electrictyUsed).toFixed(0)}</li>
                                <li>Heat: {parseFloat(this.state.heatUsed).toFixed(0)}</li>
                                <li>Electricty Exported: {parseFloat(this.state.energyExported).toFixed(0)}</li>
                                <li>Net Energy: {parseFloat(this.state.netEnergy).toFixed(0)}</li>
                                <li>Spending: £{parseFloat(this.state.totalSpent).toFixed(2)}</li>
                                <li>Average Daily Spending: £{parseFloat(this.state.totalSpent/this.state.daysTracked).toFixed(2)}</li>
                                <li>Over {parseFloat(this.state.daysTracked).toFixed(0)} days</li>
                                {this.state.asset1Usage >= this.state.asset2Usage &&(
                                    <li>Asset 1 is using more energy!</li>
                                )}
                                {this.state.asset1Usage < this.state.asset2Usage &&(
                                    <li>Asset 2 is using more energy!</li>
                                )}
                                <li>Red Zone Energy Usage: {parseFloat((this.state.redZoneUsage/this.state.numberOfDataRows)*100).toFixed(2)}%</li>
                                <li>Amber Zone Energy Usage: {parseFloat((this.state.amberZoneUsage/this.state.numberOfDataRows)*100).toFixed(2)}%</li>
                                <li>Green Zone Energy Usage: {parseFloat((this.state.greenZoneUsage/this.state.numberOfDataRows)*100).toFixed(2)}%</li>
                            </ul>
                        </div>

                        {/*Display data for the last day */}
                        <div aria-label="last day insights section">
                            <ul>
                                <h1>Las 24 Hours Data</h1>
                                <li>Electricity: {parseFloat(this.state.electrictyUsedDay).toFixed(0)}</li>
                                <li>Heat: {parseFloat(this.state.heatUsedDay).toFixed(0)}</li>
                                <li>Electricty Exported: {parseFloat(this.state.energyExportedDay).toFixed(0)}</li>
                                <li>Net Energy: {parseFloat(this.state.netEnergyDay).toFixed(0)}</li>
                                <li>Spending: £{parseFloat(this.state.totalSpentDay).toFixed(2)}</li>
                                <li>Average Hourly Spending: £{parseFloat(this.state.totalSpentDay/24).toFixed(2)}</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
          )}
          
        </div>
      </div>
    );
  }
}

export default InsightsComponent;
