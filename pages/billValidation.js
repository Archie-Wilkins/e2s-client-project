import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import MainLayout from "../public/components/layouts/mainLayoutShell.js";

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
            dateIsValid: false,
            invoiceTotal: 0,
            invoiceIsNum: false,
        };
    }

    submitDate = async (event) => {
        //this.setState({invoiceTotal: parseFloat(document.getElementById("amountInvoiced").value)});
        console.log(this.state.selectedYear);
        console.log(this.state.selectedMonth);
        console.log(this.state.invoiceTotal);
        this.setState({dateSubmitted: true});
        this.setState({currentlyCalculating: true});
        this.setState({currentlyCalculating: false});
      }

    updateValue = async (event) => {
        this.setState({selectedMonth: document.getElementById("monthStuff").value});
        this.setState({selectedYear: document.getElementById("yearStuff").value});
        const localInvoiceTextVar = parseFloat(document.getElementById("amountInvoiced").value);
        if(localInvoiceTextVar * 0 != 0 || localInvoiceTextVar <= 0){
            console.log("Invalid invoice amount.")
            this.setState({invoiceIsNum: false});
        }else{
            console.log("Valid invoice amount: " + localInvoiceTextVar);
            this.setState({invoiceTotal: parseFloat(document.getElementById("amountInvoiced").value).toFixed(2)});
            this.setState({invoiceIsNum: true});
        }
    } 
    

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
                            <option yearValue="2012">2012</option>
                            <option yearValue="2013">2013</option>
                            <option yearValue="2014">2014</option>
                            <option yearValue="2015">2015</option>
                            <option yearValue="2016">2016</option>
                            <option yearValue="2017">2017</option>
                            <option yearValue="2018">2018</option>
                            <option yearValue="2019">2019</option>
                            <option yearValue="2020">2020</option>
                            <option yearValue="2021">2021</option>
                            <option yearValue="2022">2022</option>
                            {/*Add a check for current year using external server */}
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
                                {this.state.currentlyCalculating &&(
                                    <p>VALIDATING....</p>
                                )}
                                {!this.state.currentlyCalculating &&(
                                    <p>CHECKED</p>
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