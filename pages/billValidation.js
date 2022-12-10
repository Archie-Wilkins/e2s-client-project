import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import React, { useLayoutEffect, useEffect } from "react";
import Cookies from "js-cookie";
import MainLayout from "../public/components/layouts/mainLayoutShell.js";
import { csvToJson } from "convert-csv-to-json/src/csvToJson.js";


// This is the component for ESMs to validate their bills
class BillValidation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
            isAdmin: true,
            isDirector: false,
            pageName: "Bill Validation",
            selectedYear: "2012",
            selectedMonth: "january",
            currentlyCalculating: false,
            dateSubmitted: false,
            dateIsValid: "nothing",
            invoiceTotal: 0,
            invoiceIsNum: false,
            loadedYears:false,
            pageLoaded: false,
            
            datesOnRecord: {
                years: ["2018","2019","2020","2021","2022"],
            },

            currentLimit: ["2022", "10"],

            historicalYears: [],
            historicalMonths: [],

            months: ["january", "february", "march", "april", "may", 
                     "june", "july", "august", "september", "october", "november", "december"],

            historicalSiteData: [],
            calculatedInvoiceTotal: 0,
            historicalFirstMonth: "",
            historicalFirstYear: "",
            historicalLastMonth: "",
            historicalLastYear: "",         
        };

    }

    // Function to initialise years which are available from the database.
    initialiseOptions = async (event) => {
        if(!this.state.loadedYears){
            this.setState({loadedYears: true});

            for(let year in this.state.historicalYears){
                let newOption = document.createElement("option");
                newOption.setAttribute('value', this.state.historicalYears[year]);

                let optionText = document.createTextNode(this.state.historicalYears[year]);
                newOption.appendChild(optionText);

                document.getElementById("yearStuff").appendChild(newOption);
            }
        }
    }

    /// IN USE
    initialiseData = async (event) => {
        try {
            this.setState({pageLoaded: true});

            console.log("API started");

            // API endpoint where we send form data.
            const endpoint = "/api/returnAllHistoricalSiteDataApi";
      
            // Form the request for sending data to the server.
            const options = {
              // The method is POST because we are sending data.
              method: "GET",
              // Tell the server we're sending JSON.
              headers: {
                "Content-Type": "application/json",
              },
            };
      
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options);
      
            // Get the response data from server as JSON.
            const result = await response.json();
            console.log("Result: " + result.data.sites[0].time_stamp);

            this.setState({ historicalSiteData: result.data.sites });

            let firstYear = result.data.sites[0].time_stamp[0]+result.data.sites[0].time_stamp[1]+result.data.sites[0].time_stamp[2]+result.data.sites[0].time_stamp[3];
            let firstMonth = result.data.sites[0].time_stamp[5]+result.data.sites[0].time_stamp[6];

            let lastYear = result.data.sites[result.data.sites.length - 1].time_stamp[0]+result.data.sites[result.data.sites.length - 1].time_stamp[1]+result.data.sites[result.data.sites.length - 1].time_stamp[2]+result.data.sites[result.data.sites.length - 1].time_stamp[3];
            let lastMonth = result.data.sites[result.data.sites.length - 1].time_stamp[5]+result.data.sites[result.data.sites.length - 1].time_stamp[6];

            console.log("First year: " + firstYear);
            console.log("First month: " + firstMonth);
            console.log("Last year: " + lastYear);
            console.log("Last month: " + lastMonth);

            console.log("Initialisation data.")
            this.setState({historicalFirstMonth: firstMonth});
            this.setState({historicalFirstYear: firstYear}); 
            this.setState({historicalLastMonth: lastMonth}); 
            this.setState({historicalLastYear: lastYear});

            /*for(let i = 0; i < 2000; i++){
                console.log(i);
                let currentYear = result.data.sites[i].time_stamp[0]+result.data.sites[i].time_stamp[1]+result.data.sites[i].time_stamp[2]+result.data.sites[i].time_stamp[3];
                let currentMonth = result.data.sites[i].time_stamp[5]+result.data.sites[i].time_stamp[6];
                if(i === 0){
                    yearsArr.push(currentYear);
                    monthArr.push(currentMonth);
                }
                if(i > 0){
                    for(let x = 0; x < yearsArr.length; x++){
                        if(currentYear === yearsArr[x]){
                            for(let z = 0; z < monthArr.length; z++){
                                if(currentMonth !== monthArr[z]){
                                    monthArr.push(currentMonth);
                                }
                            }
                        }
                        else if(currentYear !== yearsArr[x]){
                            yearsArr.push(currentYear);
                        }
                    }
                }
            }
    
            this.setState({historicalYears: yearsArr});
            this.setState({historicalMonths: monthArr});*/

            // Initialise the number of years on record
            let numberofYears = 0;
            numberofYears = (lastYear/1-firstYear/1)+1;


            console.log("Year num: " + numberofYears);
            // Check if there is only only 1 partial year on record (e.g., 7 months in 2018),
            // And check that there is data associated with the year
            if(numberofYears === 0 && this.state.historicalFirstMonth !== ""){

                let newOption = document.createElement("option");
                newOption.setAttribute('value', firstYear);

                let optionText = document.createTextNode(firstYear);
                newOption.appendChild(optionText);

                document.getElementById("yearStuff").appendChild(newOption);
            }else if(numberofYears >= 1){
                for(let i = 0; i <= numberofYears-1; i++){
                    let floatYear = parseFloat(firstYear);
                    let floatI = parseFloat(i);
                    let localTotal = (floatYear/1) + (floatI/1);
                    
                    let newOption = document.createElement("option");
                    newOption.setAttribute('value', localTotal);

                    let optionText = document.createTextNode(localTotal);
                    newOption.appendChild(optionText);
    
                    document.getElementById("yearStuff").appendChild(newOption);
                }
            }
            
        }catch(e){
            console.log("error");
        }
    }

    // TO BE UPDATED TO ONLY RETURN 
    returnAllSitesFromDatabaseApi = async (event) => {
        try {
          // API endpoint where we send form data.
          const endpoint = "/api/returnAllHistoricalSiteDataApi";
    
          // Form the request for sending data to the server.
          const options = {
            // The method is POST because we are sending data.
            method: "POST",
            // Tell the server we're sending JSON.
            headers: {
              "Content-Type": "application/json",
            },
          };
    
          // Send the form data to our forms API on Vercel and get a response.
          const response = await fetch(endpoint, options);
    
          // Get the response data from server as JSON.
          const result = await response.json();
    
          // Set the state array for users to the data returned from calling the API (users from the database).
          this.setState({ historicalSiteData: result.data.sites });
          let localCostTally = 0;

          let localDateTimeStr = "";
          let localDateTimeStrEnd = "";

            for(let g = 0; g < 7; g++){
                //console.log("g: " + g);
                if(g < 4){
                    localDateTimeStr = localDateTimeStr + result.data.sites[0].time_stamp[g];
                    localDateTimeStrEnd = localDateTimeStrEnd + result.data.sites[result.data.sites.length-1].time_stamp[g];
                }
                if(g == 4){
                    this.setState({historicalFirstYear: localDateTimeStr});
                    this.setState({historicalLastYear: localDateTimeStrEnd});
                    localDateTimeStr = "";
                    localDateTimeStrEnd = "";
                }
                if(g > 4 && g < 7){
                    localDateTimeStr = localDateTimeStr + result.data.sites[0].time_stamp[g];
                    localDateTimeStrEnd = localDateTimeStrEnd + result.data.sites[result.data.sites.length-1].time_stamp[g];
                    if(g == 6){
                        this.setState({historicalFirstMonth: localDateTimeStr});
                        this.setState({historicalLastMonth: localDateTimeStrEnd});
                        localDateTimeStr = "";
                        localDateTimeStrEnd = "";
                    }
                }  
            }

          //for(let i = 0; i < result.data.sites.length; i++){
          
          /* find the index of currently chosen month
             calculate it by what is first year and month in history,
             find the current year and month, 
             2020 3, 2022 12, for(i < 2022-20;): 
          */
          for(let i = 0; i < result.data.sites.length; i++){
            localCostTally = localCostTally + result.data.sites[i].energy_hour_cost;
          }

          this.setState({calculatedInvoiceTotal: localCostTally});
          
        } catch (e) {
          // No action
          console.log("Error"); 
        }
    };

    claculateExpectedInvoiceApi = async (event) => {
        try {
            // API endpoint where we send form data.
            const endpoint = "/api/returnAllHistoricalSiteDataApi";
      
            // Form the request for sending data to the server.
            const options = {
              // The method is POST because we are sending data.
              method: "POST",
              // Tell the server we're sending JSON.
              headers: {
                "Content-Type": "application/json",
              },
            };
      
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options);
      
            // Get the response data from server as JSON.
            const result = await response.json();
      
            // Set the state array for users to the data returned from calling the API (users from the database).
            let localCostTally = 0;
  
            let firstYear = result.data.sites[0].time_stamp[0]+result.data.sites[0].time_stamp[1]+result.data.sites[0].time_stamp[2]+result.data.sites[0].time_stamp[3];
            let firstMonth = result.data.sites[0].time_stamp[5]+result.data.sites[0].time_stamp[6];

            let localMonth = this.state.selectedMonth;
            
            let localMonthNum = 0;
            for(let i = 0; i < this.state.months.length; i++){
                if(localMonth.toLowerCase() === this.state.months[i]){
                    localMonthNum = i + 1;
                }
            }

            let localYear = this.state.selectedYear;
            
            console.log("First year:" + firstYear);
            console.log("First month:" + firstMonth);
            console.log("Last year:" + localYear);
            console.log("Last month:" + localMonthNum);


            let yearDifference = localYear/1 - firstYear/1;
            console.log("Y diff: " + yearDifference);
            let monthDifference = localMonthNum - firstMonth/1;
            console.log("M Diff: "+ monthDifference);

            let indexStartpoint = ((365 * 48) * yearDifference) + (monthDifference * (31*48));
            console.log("Start: " + indexStartpoint);

            if(localMonthNum === 2){
                for(let i = indexStartpoint; i < (indexStartpoint/1 + (28*48)); i++){
                    localCostTally = localCostTally + result.data.sites[i].energy_cost/1;
                    console.log("Value " + result.data.sites[i].energy_cost);
                }
      
                this.setState({calculatedInvoiceTotal: localCostTally});
            }
            else if(localMonthNum === 4 || localMonthNum === 6 || localMonthNum === 9 || localMonthNum === 11){
                for(let i = indexStartpoint; i < (indexStartpoint/1 + (30*48)); i++){
                    localCostTally = localCostTally + result.data.sites[i].energy_cost/1;
                    console.log("Value " + result.data.sites[i].energy_cost);
                }
      
                this.setState({calculatedInvoiceTotal: localCostTally});
            }
            else{
                for(let i = indexStartpoint; i < (indexStartpoint/1 + (31*48)); i++){
                    localCostTally = localCostTally + result.data.sites[i].energy_cost/1;
                    console.log("Value " + result.data.sites[i].energy_cost);
                }
      
                this.setState({calculatedInvoiceTotal: localCostTally});
            }
            
          } catch (e) {
            // No action
            console.log("Error"); 
          }
    }

    submitDate = async (event) => {
        
        let monthNum = 0; // January default

        //await this.returnAllSitesFromDatabaseApi(); !!!
        await this.claculateExpectedInvoiceApi();
        for(let month in this.state.months){
            if(this.state.selectedMonth.toLowerCase() === this.state.months[month]){
                monthNum = month;
            }
        }

        if(this.state.selectedYear === this.state.historicalLastYear){  
              if(monthNum < parseFloat(this.state.historicalLastMonth)){  
                console.log("Flag 1");
                this.setState({dateIsValid: "true"});
                this.setState({dateSubmitted: true});
                this.setState({currentlyCalculating: true});
                this.setState({currentlyCalculating: false});
            }else{
                console.log("Flag 1X");
                this.setState({dateIsValid: "false"});
            }
        }else{
            console.log("Flag 2");
            this.setState({dateIsValid: "true"});
            this.setState({dateSubmitted: true});
            this.setState({currentlyCalculating: true});
            this.setState({currentlyCalculating: false});
        }
        
        console.log(this.state.calculatedInvoiceTotal);
    }

    updateValue = async (event) => {
        this.setState({dateIsValid: "unin"});
        console.log("Selected month: " + document.getElementById("monthStuff").value);
        console.log("Selected year: " + document.getElementById("yearStuff").value);

        this.setState({selectedMonth: document.getElementById("monthStuff").value});
        this.setState({selectedYear: document.getElementById("yearStuff").value});
        const localInvoiceTextVar = parseFloat(document.getElementById("amountInvoiced").value);
        if(localInvoiceTextVar * 0 != 0 || localInvoiceTextVar <= 0){
            this.setState({invoiceIsNum: false});
        }else{
            this.setState({invoiceTotal: parseFloat(document.getElementById("amountInvoiced").value).toFixed(2)});
            this.setState({invoiceIsNum: true});
        }
    } 

     // Funtion used to validate user priveleges from the login page and remove cookies. It is also used to initialise data on the page.
    checkUser = async (event) => {
        // Attempt to parse a user cookie
        try {
        // Initialise the user cookie
        let userCookie = JSON.parse(Cookies.get().user);

        // If the user has the incorrect credentials for the page, remove them
        if (userCookie.role != 3) {
            Cookies.remove("user");
            window.location = "/login";
        }
        //catch erros
        } catch (e) {
        // No action
        }

    };
    
    render() {
        return ( <div onLoad={this.checkUser} onMouseEnter={this.checkUser} aria-label="Bill validation page">
            <MainLayout
            isAdmin={this.state.isAdmin}
            isDirector={this.state.isDirector}
            pageName={this.state.pageName}
            ></MainLayout>
            <div className="billValidationPageContent" aria-label="bill validation page content">
                <div aria-label="Page header section" className="billValidationHeaderContent">
                    <h1>Bill Validation</h1>
                    <hr/>
                    <h3>Upload your energy invoices for validation</h3>
                </div>
                {!this.state.pageLoaded &&(
                    <button onClick={this.initialiseData} className="billStart">Get Started</button>
                )}

                {this.state.pageLoaded &&(
                    <div aria-label="Invoice data section" classname="invoiceData">
                    <div>
                        <h3 className="invoiceData">SELECT THE START DATE FOR THE INVOICE</h3>
                        
                        {/*Make dyanmic so that it auto updates in later years */}
                        <select className="invoiceData" id="yearStuff" onChange={this.updateValue} aria-label="select which year to validate dropdown">
                        </select>
                        
                        <select className="invoiceData" id="monthStuff" onChange={this.updateValue} aria-label="select which month to validate dropdown">
                            <option monthValue="january">JANUARY</option>
                            <option monthValue="february">FEBRUARY</option>
                            <option monthValue="march">MARCH</option>
                            <option monthValue="april">APRIL</option>
                            <option monthValue="may">MAY</option>
                            <option monthValue="june">JUNE</option>
                            <option monthValue="july">JULY</option>
                            <option monthValue="august">AUGUST</option>
                            <option monthValue="septmeber">SEPTEMBER</option>
                            <option monthValue="october">OCTOBER</option>
                            <option monthValue="november">NOVEMBER</option>
                            <option monthValue="december">DECEMBER</option>
                        </select>

                        {/*Initially we will check only for 31 days*/}
                        <br/>
                        <label className="invoiceData">Enter the amount you have been invoiced for your chosen month (£)</label>
                        <input className="invoiceData" id="amountInvoiced" onInput={this.updateValue} aria-label="input invoice total box"></input>

                        {/*Error messages for errors */}
                        <div aria-label="invoice amount error section">
                            {!this.state.invoiceIsNum &&(
                                <p className="invoiceData">ERROR, you can only submit numbers!</p>
                            )}
                            {this.state.invoiceIsNum === true &&(
                                <div>
                                    <button onClick={this.submitDate} aria-label="submit all data button">Submit</button>
                                    <hr/>
                                </div>    
                            )}
                        </div>
                        <br/><br/>
                    </div>

                    <div aria-label="validation data summary">
                        {this.state.dateSubmitted &&(
                            <div>
                                {this.state.dateIsValid === "false" &&(
                                    <p>ERROR: for {this.state.selectedYear} you only have data until {this.state.historicalLastMonth}</p>
                                )}
                                {this.state.dateIsValid === "true" &&(
                                    <div>
                                        <p>SUMMARY</p>
                                        {this.state.currentlyCalculating &&(
                                            <p>VALIDATING....</p>
                                        )}
                                        {!this.state.currentlyCalculating &&(
                                            <div className="billValidationSummaryData">
                                                <h3>{this.state.selectedMonth} {this.state.selectedYear}</h3>
                                                <h3>Invoice Amount: £{this.state.invoiceTotal}</h3>
                                                <h3>Calculated Amount: £{parseFloat(this.state.calculatedInvoiceTotal).toFixed(2)}</h3>
                                                
                                                {this.state.invoiceTotal > this.state.calculatedInvoiceTotal &&(
                                                    <h3>Invoice is too much!</h3>
                                                )}
                                                {this.state.invoiceTotal == this.state.calculatedInvoiceTotal &&(
                                                    <h3>Invoice is correct.</h3>
                                                )}{this.state.invoiceTotal < this.state.calculatedInvoiceTotal &&(
                                                    <h3>Invoice is too low.</h3>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                            </div>
                        )}
                    </div>


                    <div>
                        <h3></h3>
                    </div>
                    </div>
                )}  

                
            </div>
        </div>
        );
    }
}

export default BillValidation;