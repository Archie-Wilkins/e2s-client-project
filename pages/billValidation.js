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
            selectedStartDate: null,
        };
    }

    logValue = async (event) => {
        console.log(this.state.selectedStartDate);
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
                        <h3></h3>
                        <select
                            value={this.state.selectedStartDate}
                            onChange={(e) => {
                            this.setState({selectedStartDate: e.target.value});
                            }}
                        >
                            <option value="a">a</option>
                            <option value="b">b</option>
                            <option value="c">c</option>
                            <option value="d">d</option>
                        </select>

                        <button onClick={this.logValue}>submit</button>
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