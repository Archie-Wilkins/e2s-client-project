import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import ToggleSite from "./toggleSite.js"
import React from 'react';
import Cookies from "js-cookie";


// React Icons
import { FaCloud } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySiteToggle: false,
            //Need to change this to get this
            //infomation from API
            currentActiveSiteId: 3,
            usersSites: {
                1: "Newport Hospital",
                3: "Heath Hospital",
                5: "St Davids Hospital",
                6: "Singleton Hopsital"
            },
            name: ""
        };
    }


    changeSiteMenuToggle = () => {
        this.setState({
            displaySiteToggle: !this.state.displaySiteToggle
        })
    }

    updateCurrentActiveSiteId = (newSiteId) => {
        this.setState({
            currentActiveSiteId: newSiteId
        })
    }

    displayAdminButton = () => {
        if (this.props.isDirector) {
            return <Link className=" navbarLink d-flex" href="/account">
                <FaUsers />
                <p>Admin</p>
            </Link>
        }
        else {
            return null;
        }
    }

    closeSiteToggle = () => {
        this.setState({
            displaySiteToggle: false
        })
    }

    async componentDidMount() {
        try {
            //Get the user cookie
            let userCookieEncypted = Cookies.get().user;

            //import CryptoJS
            var CryptoJS = require("crypto-js");

            //decrypt the cookie
            var bytes = CryptoJS.AES.decrypt(userCookieEncypted, 'team4');
            //store decrypted cookie in userCookie
            var userCookie = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            //get userID from cookie
            const data = {userID: userCookie.user}
            //JSONify it for api
            let JSONdata = JSON.stringify(data);
            //fetch user details from userID
            const endpoint = '/api/getUserDetails';
            const options = {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSONdata,}
            const response = await fetch(endpoint, options)
            let result = await response.json();
            let stringResult = JSON.stringify(result);
            stringResult = stringResult.replace("[", "");
            stringResult = stringResult.replace("]", "");
            result = JSON.parse(stringResult);
            //sets name in state to user records first_name
            this.state.name = result.first_name;
            //set text in nav bar to name
            document.getElementById("navName").innerText = this.state.name;
        } catch (e){
            alert("API failed " + e);
            //window.location = "/login";
        }
    }




    render() {
    return <div>
        <div className="navbarContainer blueBackground fixed-top">
            <div className="navbarContent" aria-label="navigational bar">

                <Link className="w-100 navbarLink d-flex justify-content-center" href="/esm/dashboard" aria-label="go home link">
                    <h1 data-testid="logo" className='whiteText'>E<span className='accentText'>2</span>S</h1>
                </Link>

                <hr className="navbarLineBreak"></hr>

                <Link className="navbarLink d-flex align-items-center " href="/esm/dashboard" aria-label="go to dashboard link">
                    <FaTachometerAlt />
                    <p>Dashboard</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/esm/forecasting" aria-label="go to site forecasting link">
                    <FaCloud />
                    <p>Forecastings</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/esm/analysis" aria-label="go to analysis page link">
                    <FaChartLine />
                    <p>Analysis</p>
                </Link>

                {/* <Link className=" navbarLink d-flex align-items-center" href="/esm/assets" aria-label="view site assets link">
                    <FaListAlt />
                    <p>Assets</p>
                </Link> */}

                {/* <Link className=" navbarLink d-flex align-items-center" href="/esm/" aria-label="go to view reports page link">
                    <FaBook />
                    <p>Reports</p>
                </Link> */}

                {/* <Link className=" navbarLink d-flex align-items-center" href="/siteCompare" aria-label="go to site comparison page link">
                    <FaBalanceScale />
                    <p>Compare</p>
                </Link> */}

                <Link className=" navbarLink d-flex align-items-center" href="/billValidation" aria-label="go to bill validaiton page link">
                    <FaDollarSign />
                    <p>Validate Bills</p>
                </Link>

                <hr className="navbarLineBreak"></hr>

                <Link className=" navbarLink d-flex align-items-center" href="/help" aria-label="go to help page link">

                    <FaRegQuestionCircle />
                    <p>Help</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/account" aria-label="go to account page link">
                    <FaUserCog />
                    <p>Account</p>
                </Link>

                <div>{this.displayAdminButton()}</div>

                <hr className="navbarLineBreak align-items-center"></hr>

                <div aria-label="current site content">
                    <p className='whiteText m-0'>Viewing Site:</p>
                    <p className='whiteText m-0 changeSite position-relative' onClick={this.changeSiteMenuToggle}>{this.state.usersSites[this.state.currentActiveSiteId]}</p>
                    <div className="position-absolute top-50" >
                        <ToggleSite
                            displayMenu={this.state.displaySiteToggle}
                            currentActiveSiteId={this.state.currentActiveSiteId}
                            usersSites={this.state.usersSites}
                            changeActiveSite={this.updateCurrentActiveSiteId}
                            closeMenu={this.closeSiteToggle}
                        />
                    </div>
                </div>

                <div aria-label="signed in user details section">
                    <p className='whiteText m-0'>Signed in as:</p>
                    <p className='whiteText m-0' id="navName"></p>
                </div>

            </div>
        </div>
    </div >
    }

}


export default NavBar