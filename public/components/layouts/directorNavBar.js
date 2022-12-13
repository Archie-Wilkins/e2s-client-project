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
import { FaUpload } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";


class DirectorNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySiteToggle: false,
            //Need to change this to get this
            //infomation from API
            currentActiveSiteId: 2,
            usersSites: {
                1: "Newport Hospital",
                2: "Heath Hospital",
                3: "St Davids Hospital",
                4: "Singleton Hopsital"
            },
            name: "",
            data: "",
            dataUpdated: false,
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
            let data = { userID: userCookie.user }
            //JSONify it for api
            let JSONdata = JSON.stringify(data);
            let endpoint = '/api/user/getUserDetails';
            let options = { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSONdata, }
            let response = await fetch(endpoint, options)
            let result = await response.json();
            let stringResult = JSON.stringify(result);
            stringResult = stringResult.replace("[", "");
            stringResult = stringResult.replace("]", "");
            result = JSON.parse(stringResult);
            //sets name in state to user records first_name
            this.state.name = result.first_name;


            JSONdata = JSON.stringify(data);
            endpoint = '/api/user/getUserSite';
            options = { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSONdata, }
            response = await fetch(endpoint, options)
            result = await response.json();

            data = { siteID: result.data.site }
            JSONdata = JSON.stringify(data);
            endpoint = '/api/site/getSiteDetails';
            options = { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSONdata, }
            response = await fetch(endpoint, options)
            result = await response.json();

            console.log(result);

            const sites = {
                1: "",
                2: result[0].site_name,
                3: "St Davids Hospital",
                4: "Singleton Hopsital"
            }

            this.state.usersSites = sites;


            this.state.data = "";
            this.setState({ data: "" });
            //updates value to make the page render the graph
            this.state.dataUpdated = true;

            //set text in nav bar to name
            //document.getElementById("navName").innerText = this.state.name;
        } catch (e){
            alert("API failed " + e);
            //window.location = "/login";
        }
    }




    render() {
        if (!this.state.dataUpdated) {
            return;
        }
        return <div>
            <div className="navbarContainer blueBackground fixed-top">
                <div className="navbarContent" aria-label="navigational bar">

                    <Link className="w-100 navbarLink d-flex justify-content-center" href="/esm/dashboard" aria-label="go home link">
                        <h1 data-testid="logo" className='whiteText'>E<span className='accentText'>2</span>S</h1>
                    </Link>

                    <hr className="navbarLineBreak"></hr>

                    <Link className="navbarLink d-flex align-items-center " href="/director/dashboard" aria-label="go to dashboard link">
                        <FaTachometerAlt />
                        <p>Dashboard</p>
                    </Link>

                    <Link className=" navbarLink d-flex align-items-center" href="/director/account" aria-label="go to account page link">
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
                        <p className='whiteText m-0' id="navName">{this.state.name}</p>
                    </div>

                </div>
            </div>
        </div >
    }

}


export default DirectorNavBar