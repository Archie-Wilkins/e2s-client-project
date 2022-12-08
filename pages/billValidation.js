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
        };
    }

    submitDate = async (event) => {
        console.log(this.state.selectedYear);
        console.log(this.state.selectedMonth);
        this.setState({dateSubmitted: true});
        this.setState({currentlyCalculating: true});
        this.setState({currentlyCalculating: false});
      }

    updateValue = async (event) => {
        this.setState({selectedMonth: document.getElementById("monthStuff").value});
        this.setState({selectedYear: document.getElementById("yearStuff").value});
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
                        <select id="yearStuff" onChange={this.updateValue}>
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
                        
                        <select id="monthStuff" onChange={this.updateValue}>
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

                        <button onClick={this.submitDate}>submit</button>
                    </div>

                    <div>
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