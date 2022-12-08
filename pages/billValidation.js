import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import MainLayout from "../public/components/layouts/mainLayoutShell.js";
import { faSmileWink } from "@fortawesome/free-solid-svg-icons";

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
            
            datesOnRecord: {
                years: ["2018","2019","2020","2021","2022"],
            },

            currentLimit: ["2022", "10"],

            months: ["january", "february", "march", "april", "may", 
                     "june", "july", "august", "september", "october", "november", "december"],

            historicalSiteData: [],         
        };
    }

    initialiseOptions = async (event) => {
        if(!this.state.loadedYears){
            for(let year in this.state.datesOnRecord.years){
                let newOption = document.createElement("option");
                newOption.setAttribute('value', this.state.datesOnRecord.years[year]);

                let optionText = document.createTextNode(this.state.datesOnRecord.years[year]);
                newOption.appendChild(optionText);

                document.getElementById("yearStuff").appendChild(newOption);
            }
            this.setState({loadedYears: true});
        }
    }

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
    
        } catch (e) {
          // No action
        }
      };

    submitDate = async (event) => {
        
        let monthNum = 0; // January default

        await this.returnAllSitesFromDatabaseApi();
        console.log(this.state.historicalSiteData);
        for(let month in this.state.months){
            if(this.state.selectedMonth === this.state.months[month]){
                monthNum = month;
            }
        }

        if(this.state.selectedYear === this.state.currentLimit[0]){
            if(monthNum > parseFloat(this.state.currentLimit[1])-1){
                this.setState({dateIsValid: "true"});
                this.setState({dateSubmitted: true});
                this.setState({currentlyCalculating: true});
                this.setState({currentlyCalculating: false});
            }else{
                this.setState({dateIsValid: "false"});
            }
        }else{
            console.log(this.state.selectedYear);
            console.log(this.state.selectedMonth);
            console.log(this.state.invoiceTotal);
            this.setState({dateIsValid: "true"});
            this.setState({dateSubmitted: true});
            this.setState({currentlyCalculating: true});
            this.setState({currentlyCalculating: false});
        }
        
        
      }

    updateValue = async (event) => {
        this.setState({dateIsValid: "unin"});
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

        await this.initialiseOptions();
    };
    

    render() {
        return ( <div onLoad={this.checkUser} onMouseEnter={this.checkUser} aria-label="Bill validation page">
            <MainLayout
            isAdmin={this.state.isAdmin}
            isDirector={this.state.isDirector}
            pageName={this.state.pageName}
            ></MainLayout>
            <div className="billValidationPageContent" aria-label="bill validation page content">
                <div aria-label="Page header section">
                    <h1>Bill Validation</h1>
                    <hr/>
                    <h3>Upload your energy invoices for validation</h3>
                </div>
                <div aria-label="Invoice data section">
                    <div>
                        <h3>SELECT THE START DATE FOR THE INVOICE</h3>
                        
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
                        </select>

                        {/*Initially we will check only for 31 days*/}
                        <label>Enter the amount you have been invoiced for your chosen month (£)</label>
                        <input id="amountInvoiced" onInput={this.updateValue} aria-label="input invoice total box"></input>

                        {/*Error messages for errors */}
                        <div aria-label="invoice amount error section">
                            {!this.state.invoiceIsNum &&(
                                <p>ERROR, you can only submit numbers!</p>
                            )}
                            {this.state.invoiceIsNum === true &&(
                                <button onClick={this.submitDate} aria-label="submit all data button">Submit</button>
                            )}
                        </div>
                        <br/><br/>
                    </div>

                    <div aria-label="validation data summary">
                        {this.state.dateSubmitted &&(
                            <div>
                                {this.state.dateIsValid === "false" &&(
                                    <p>ERROR: for {this.state.selectedYear} you only have data until {this.state.months[this.state.currentLimit[1]-1]}</p>
                                )}
                                {this.state.dateIsValid === "true" &&(
                                    <div>
                                        <p>SUMMARY</p>
                                        {this.state.currentlyCalculating &&(
                                            <p>VALIDATING....</p>
                                        )}
                                        {!this.state.currentlyCalculating &&(
                                            <div>
                                                <h3>{this.state.selectedMonth} {this.state.selectedYear}</h3>
                                                <h3>Invoice Amount: £{this.state.invoiceTotal}</h3>

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
            </div>
        </div>
        );
    }
}

export default BillValidation;