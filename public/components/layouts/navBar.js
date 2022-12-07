import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import ToggleSite from "./toggleSite.js"
import React from 'react';



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
            }
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

    render() {
    return <div>
        <div className="navbarContainer blueBackground fixed-top">
            <div className="navbarContent" aria-label="navigational bar">

                <Link className="w-100 navbarLink d-flex justify-content-center" href="/" aria-label="go home link">
                    <h1 data-testid="logo" className='whiteText'>E<span className='accentText'>2</span>S</h1>
                </Link>

                <hr className="navbarLineBreak"></hr>

                <Link className="navbarLink d-flex align-items-center " href="/" aria-label="go to dashboard link">
                    <FaTachometerAlt />
                    <p>Dashboard</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/siteForecasting" aria-label="go to site forecasting link">
                    <FaCloud />
                    <p>Forecastings</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/sitePerformance" aria-label="go to analysis page link">
                    <FaChartLine />
                    <p>Analysis</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/siteAssets" aria-label="view site assets link">
                    <FaListAlt />
                    <p>Assets</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/viewReports" aria-label="go to view reports page link">
                    <FaBook />
                    <p>Reports</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/siteCompare" aria-label="go to site comparison page link">
                    <FaBalanceScale />
                    <p>Compare</p>
                </Link>

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
                    <p className='whiteText m-0'>Dan Schnee</p>
                </div>

            </div>
        </div>
    </div >
    }

}


export default NavBar