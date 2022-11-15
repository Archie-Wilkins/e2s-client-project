import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import ToggleSite from ".//toggleSite.js"
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
            displayAdminButton: false,
            currentActiveSiteId: 3,
            usersSites: {
                1: "Newport Hospital",
                3: "Heath Hospital",
                5: "St Davids Hospital"
            }
        };
    }


    changeSiteMenuToggle = () => {
        this.setState({
            displaySiteToggle: !this.state.displaySiteToggle
        })
    }

    updateCurrentActiveSiteId = (newSiteId) => {
        console.log("Switching");
        this.setState({
            currentActiveSiteId: newSiteId
        })
    }

    displayAdminButton = () => {
        if (this.state.displayAdminButton) {
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
            <div className="navbarContent">

                <Link className="w-100 navbarLink d-flex justify-content-center" href="/">
                    <h1 className='whiteText'>E<span className='accentText'>2</span>S</h1>
                </Link>

                <hr className="navbarLineBreak"></hr>

                <Link className="navbarLink d-flex align-items-center " href="/">
                    <FaTachometerAlt />
                    <p>Dashboard</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/siteForecasting">
                    <FaCloud />
                    <p>Forecastings</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/sitePerformance">
                    <FaChartLine />
                    <p>Analysis</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/siteAssets">
                    <FaListAlt />
                    <p>Assets</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/viewReports">
                    <FaBook />
                    <p>Reports</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/siteCompare">
                    <FaBalanceScale />
                    <p>Compare</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/billValidation">
                    <FaDollarSign />
                    <p>Validate Bills</p>
                </Link>

                <hr className="navbarLineBreak"></hr>

                <Link className=" navbarLink d-flex align-items-center" href="/help">

                    <FaRegQuestionCircle />
                    <p>Help</p>
                </Link>

                <Link className=" navbarLink d-flex align-items-center" href="/account">
                    <FaUserCog />
                    <p>Account</p>
                </Link>

                <div>{this.displayAdminButton()}</div>

                <hr className="navbarLineBreak align-items-center"></hr>

                <div>
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

                <div>
                    <p className='whiteText m-0'>Signed in as:</p>
                    <p className='whiteText m-0'>Dan Schneider</p>
                </div>

            </div>
        </div>
    </div >
    }

}


export default NavBar