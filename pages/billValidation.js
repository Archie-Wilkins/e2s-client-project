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

            // Passing whether or not a user is an admin to the page.
            isAdmin: true,

            // Passing whether or not a user is a director to the page.
            isDirector: false,
            
            // The local name of the page being accessed.
            pageName: "Bill Validation",

            // Variable to track which year a user has selected to evaluate.
            selectedYear: "2012",

            // Variable to track which year a user has selected to evaluate.
            selectedMonth: "january",
            
            // Variable for tracking whether or not the invoice comparison is being calculated.
            currentlyCalculating: false,
            
            // Variable to track the date submitted by a user.
            dateSubmitted: false,

            // Variable to track whether or not an inputted date is valid.
            dateIsValid: "nothing",

            // Variable to track the invoice amount input.
            invoiceTotal: 0,
            
            // Variable to track whether or not an inputted invoice total is valid.
            invoiceIsNum: false,
            
            // Variable to track whether or not the available years of data have loaded.
            loadedYears:false,
            
            // Variable to track whether or not the page has loaded.
            pageLoaded: false,
            
            // Mock data set.
            datesOnRecord: {
                years: ["2018","2019","2020","2021","2022"],
            },

            // Mock data set.
            currentLimit: ["2022", "10"],

            // Array to track all years in the database.
            historicalYears: [],

            // Array to track all months in the database.
            historicalMonths: [],

            // Array to keep track of months in a year..
            months: ["january", "february", "march", "april", "may", 
                     "june", "july", "august", "september", "october", "november", "december"],

            // An array of all database data on sites.         
            historicalSiteData: [],
            
            // Variable to track the calculated estimate for how much a user's invoice should be.
            calculatedInvoiceTotal: 0,
            
            // Variables used to determine the first and last available dates in the dataset.
            historicalFirstMonth: "",
            historicalFirstYear: "",
            historicalLastMonth: "",
            historicalLastYear: "",
            loggedInUserID: "",         
        };

    }

    // Function to initialise values on the page from the database.
    initialiseData = async (event) => {

        // Try to access the database API.
        try {

            // Set pageLoaded variable to true so that the page content updates to allow the user to 
            // input their data.
            this.setState({pageLoaded: true});

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

            // Pass the database call response values to the page state for later access.
            this.setState({ historicalSiteData: result.data.sites });

            // As we know that data is always given in the same format, we access the year and month first 
            // uploaded by accessing the timestamp of the first and chosen row at specific indexes.
            let firstYear = result.data.sites[0].time_stamp[0]+result.data.sites[0].time_stamp[1]+result.data.sites[0].time_stamp[2]+result.data.sites[0].time_stamp[3];
            let firstMonth = result.data.sites[0].time_stamp[5]+result.data.sites[0].time_stamp[6];

            // These variables reflect the latest row inputted.
            let lastYear = result.data.sites[result.data.sites.length - 1].time_stamp[0]+result.data.sites[result.data.sites.length - 1].time_stamp[1]+result.data.sites[result.data.sites.length - 1].time_stamp[2]+result.data.sites[result.data.sites.length - 1].time_stamp[3];
            let lastMonth = result.data.sites[result.data.sites.length - 1].time_stamp[5]+result.data.sites[result.data.sites.length - 1].time_stamp[6];

            // Pass the values of the earliest and latest data available in the database to the page state for
            // later access.
            this.setState({historicalFirstMonth: firstMonth});
            this.setState({historicalFirstYear: firstYear}); 
            this.setState({historicalLastMonth: lastMonth}); 
            this.setState({historicalLastYear: lastYear});

            // Initialise the number of years on record
            let numberofYears = 0;

            // Set the number of years to the latest year minus the earliest, adding 1 so that the year in
            // progress is included.
            numberofYears = (lastYear/1-firstYear/1)+1;

            // Check if there is only only 1 partial year on record (e.g., 7 months in 2018),
            // And check that there is data associated with the year
            if(numberofYears === 1){

                // Define a new year option to be appended to a select object.
                let newOption = document.createElement("option");
                
                // Set the option's value to the only available year of data.
                newOption.setAttribute('value', firstYear/1);

                // Create a Text object to be put into the option.
                let optionText = document.createTextNode(firstYear/1);
                
                // Add the text to the option.
                newOption.appendChild(optionText);

                // Add the option to the select.
                document.getElementById("yearStuff").appendChild(newOption);

            }

            // Check if there is more than one year of data available.
            else if(numberofYears > 1){

                // Iterate through every available year of data. 
                for(let i = 0; i <= numberofYears-1; i++){
                    
                    // Explicitly define each value as a float so that addition will be performed.
                    let floatYear = parseFloat(firstYear);
                    let floatI = parseFloat(i);
                    let localTotal = (floatYear/1) + (floatI/1);
                    
                    // ...
                    let newOption = document.createElement("option");
                    newOption.setAttribute('value', localTotal);

                    let optionText = document.createTextNode(localTotal);
                    newOption.appendChild(optionText);
    
                    document.getElementById("yearStuff").appendChild(newOption);
                }
            }
        // Catch any errors returned from trying to call the API.    
        }catch(e){
            console.log("error");
        }
    }

    // Function to calculate the expected invoice total for a given month of energy use. 
    claculateExpectedInvoiceApi = async (event) => {
        try {
            // API endpoint where we send form data.
            //const endpoint = "/api/returnAllHistoricalSiteDataApi";
            const endpoint = "/api/returnHistoricalSiteDataFromUSerId";

            const data= {
                userID: this.state.loggedInUserID,
            };

            const jsonData = JSON.stringify(data);
            // Form the request for sending data to the server.
            const options = {
              // The method is POST because we are sending data.
              method: "POST",
              // Tell the server we're sending JSON.
              headers: {
                "Content-Type": "application/json",
              },

              body: jsonData,
            };
      
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options);
      
            // Get the response data from server as JSON.
            const result = await response.json();
      
            // Set the state array for users to the data returned from calling the API (users from the database).
            let localCostTally = 0;
  
            // Set the first year and month of data to the first year and month in the database.
            let firstYear = result.data.sites[0].time_stamp[0]+result.data.sites[0].time_stamp[1]+result.data.sites[0].time_stamp[2]+result.data.sites[0].time_stamp[3];
            let firstMonth = result.data.sites[0].time_stamp[5]+result.data.sites[0].time_stamp[6];

            // Set a local instance of the month selected by the user.
            let localMonth = this.state.selectedMonth;
            
            // Set a numerical representation of the chosen month for evaluation.
            let localMonthNum = 0;
            for(let i = 0; i < this.state.months.length; i++){
                if(localMonth.toLowerCase() === this.state.months[i]){
                    localMonthNum = i + 1;
                    break;
                }
            }

            // Set a local instance of the year selected by the user.
            let localYear = this.state.selectedYear;

            // Set the year difference (total number of years of data) by taking away the latest year from the first.
            let yearDifference = localYear/1 - firstYear/1;

            // Set the month difference (total number of months of data) by taking away the latest month from the first.
            let monthDifference = localMonthNum - firstMonth/1;

            // Formula for finding the index which represents the first day of the user's chosen month.
            let indexStartpoint = ((365 * 48) * yearDifference) + (monthDifference * (31*48));

            // Tell the page that the invoice is being calculated.
            this.setState({currentlyCalculating: true});

            // Check if the user's month is February (2).
            if(localMonthNum === 2){

                // Only count 28 days (48 rows of data per day) of energy spending.
                for(let i = indexStartpoint; i < (indexStartpoint/1 + (28*48)); i++){
                    
                    // Add the energy spent at each half hour time interval to the tally. 
                    if(i < result.data.sites.length){
                        localCostTally = localCostTally + result.data.sites[i].energy_cost/1;
                    }                
                }
      
                // Pass the total calculated invoice to the page state.
                this.setState({calculatedInvoiceTotal: localCostTally});
            }

            // Check if the user's month is April (4), June (6), September (9), or November (11) - months with 30 days.
            else if(localMonthNum === 4 || localMonthNum === 6 || localMonthNum === 9 || localMonthNum === 11){
                
                // Only count 30 days (48 rows of data per day) of energy spending.
                for(let i = indexStartpoint; i < (indexStartpoint/1 + (30*48)); i++){

                    // We ensure that no out of bounds indexes are being accessed.
                    if(i < result.data.sites.length){
                        localCostTally = localCostTally + result.data.sites[i].energy_cost/1;
                    }                
                }
                this.setState({calculatedInvoiceTotal: localCostTally});
            }

            // Check if the user has selected a month with 31 days.
            else{
                for(let i = indexStartpoint; i < (indexStartpoint/1 + (31*48)); i++){
                    if(i < result.data.sites.length){
                        localCostTally = localCostTally + result.data.sites[i].energy_cost/1;
                    }
                }
                this.setState({calculatedInvoiceTotal: localCostTally});
            }

            // Tell the page that the invoice has stopped calculating
            this.setState({currentlyCalculating: false});
            
          } catch (e) {
            // No action
            console.log("Error"); 
          }
    }

    // Function to handle the user submitting their invoice date.
    submitDate = async (event) => {
        
        // Check which month the user has selcted by numerical representation.
        let monthNum = 0; // January default

        //await this.returnAllSitesFromDatabaseApi(); !!!
        await this.claculateExpectedInvoiceApi();
        for(let month in this.state.months){
            if(this.state.selectedMonth.toLowerCase() === this.state.months[month]){
                monthNum = month;
            }
        }

        // Check the user's selected year.
        // Check if the user has selected the last year of data available.
        if(this.state.selectedYear === this.state.historicalLastYear){  
            
            // Check if the user's chosen month is lower than the last month of data available. 
            if(monthNum < parseFloat(this.state.historicalLastMonth)){
                
                console.log("Valid month");
                
                // Tell the page the date is valid.  
                this.setState({dateIsValid: "true"});
                
                // Tell the page that the user has submitted a date.
                this.setState({dateSubmitted: true});
                
            }else{
                
                console.log("Invalid month");
                
                // The user has selected a date out of bounds.
                this.setState({dateIsValid: "false"});

                // Tell the page that the user has submitted a date.
                this.setState({dateSubmitted: true});
            }
        }else{

            // If the user has selected an early year of data, validate that they have a chosen a month 
            // with existing data.
            if(monthNum > parseFloat(this.state.historicalFirstMonth)){
                
                // The date is valid.
                this.setState({dateIsValid: "true"});

                // The user has attempted to submit a date.
                this.setState({dateSubmitted: true});
            }else{

                // The date is not valid.
                this.setState({dateIsValid: "false"});

                // The user has attempted to submit a date.
                this.setState({dateSubmitted: true});
            } 
            
        }        
    }

    // Function to handle the user selecting a new year/month option.
    updateValue = async (event) => {

        // Data is neither valid nor invalid during state changes.
        this.setState({dateIsValid: "unin"});

        // Set the user's selected month to the current value of the month selection option.
        this.setState({selectedMonth: document.getElementById("monthStuff").value});
        
        // Set the user's selected month to the current value of the year selection option.
        this.setState({selectedYear: document.getElementById("yearStuff").value});
        
        // Set the user[s invoice total to the value in the invoice box.
        const localInvoiceTextVar = parseFloat(document.getElementById("amountInvoiced").value);
        
        // Check that the value entered by the user is numerical.
        if(localInvoiceTextVar * 0 != 0 || localInvoiceTextVar <= 0){
            this.setState({invoiceIsNum: false});
        }
        
        // If the user has entered a number into the invoice, 
        else{
            // Set the invoice total in the page state to a 2 decimal version of the value entered by the user.
            this.setState({invoiceTotal: parseFloat(document.getElementById("amountInvoiced").value).toFixed(2)});
            this.setState({invoiceIsNum: true});
        }
    } 

    // Funtion used to validate user priveleges from the login page and remove cookies. It is also used to initialise data on the page.
    async componentDidMount() {
        // Attempt to parse a user cookie
        try {
        // Initialise the user cookie
        let userCookie = JSON.parse(Cookies.get().user);

        // If the user has the incorrect credentials for the page, remove them
        if (userCookie.role === 4 || userCookie.role === 1) {
            Cookies.remove("user");
            window.location = "/login";
        }

        this.setState({loggedInUserID: userCookie.user});
        //catch erros
        } catch (e) {
        // No action
        }

    };
    
    // Redner the page.
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
                    <h2>Upload your energy invoices for validation</h2>
                </div>
                {!this.state.pageLoaded &&(
                    <div>
                        <p>Welcome to validation. Here , you can check out your invoices against our records
                            and we'll tell you if you are overpaying! Please note that our system is an approximation.
                        </p>
                        <button onClick={this.initialiseData} className="billStart">Get Started</button>
                    </div>    
                )}

                {this.state.pageLoaded &&(
                    <div aria-label="Invoice data section">
                        <div>
                            <label>Select your invoice date</label>
                            <br/>
                            {/*Make dyanmic so that it auto updates in later years */}
                            <select id="yearStuff" onChange={this.updateValue} aria-label="select which year to validate dropdown">
                            </select>
                            
                            <select id="monthStuff" onChange={this.updateValue} aria-label="select which month to validate dropdown">
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
                            </select><br/><br/>

                            {/*Initially we will check only for 31 days*/}
                            <label>Enter your invoice total for the month (£)</label><br/>
                            <input id="amountInvoiced" onInput={this.updateValue} aria-label="input invoice total box"></input>

                            {/*Error messages for errors */}
                            <div aria-label="invoice amount error section">
                                {!this.state.invoiceIsNum &&(
                                    <p classname="errorText">ERROR, you can only submit numbers!</p>
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
                                    <div>
                                        <p>ERROR: for {this.state.selectedYear} you only have data until {this.state.months[this.state.historicalLastMonth-1]}.</p>
                                        <Link href="/csvUpload"><p>Upload new data</p></Link>
                                    </div>    
                                )}
                                {this.state.dateIsValid === "true" &&(
                                    <div>
                                        <h3>SUMMARY</h3>
                                        {this.state.currentlyCalculating &&(
                                            <p>VALIDATING....</p>
                                        )}
                                        {!this.state.currentlyCalculating &&(
                                            <div className="billValidationSummaryData">
                                                <p>{this.state.selectedMonth} {this.state.selectedYear}</p>
                                                <p>Invoice Amount: £{this.state.invoiceTotal}</p>
                                                <p>Calculated Amount: £{parseFloat(this.state.calculatedInvoiceTotal).toFixed(2)}</p>
                                                
                                                {this.state.invoiceTotal > this.state.calculatedInvoiceTotal &&(
                                                    <p>Invoice is too much!</p>
                                                )}
                                                {this.state.invoiceTotal == this.state.calculatedInvoiceTotal &&(
                                                    <p>Invoice is correct.</p>
                                                )}{this.state.invoiceTotal < this.state.calculatedInvoiceTotal &&(
                                                    <p>Invoice is too low.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                            </div>
                        )}
                        </div>
                    </div>
                )}  
            </div>
        </div>
        );
    }
}

export default BillValidation;