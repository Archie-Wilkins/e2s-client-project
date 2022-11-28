import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import ToggleSite from ".//toggleSite.js"
import React from 'react';
import MainLayout from "../public/components/layouts/MainLayoutShell.js"



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


class AdminHubV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businessMockDb {
                "BusinessDictionary": {
                    1: {
                        "businessId": 1,
                        "businessName": "Mark's Tools",
                        "industry": "Agriculture",
                        "director": "Komodo Dragon",
                    },
                    2: {
                        "businessId": 4,
                        "businessName": "Jakob's Ladder",
                        "industry": "Furniture",
                        "Director": "Jason Todd",
                    },
                    3: {
                        "businessId": 20,
                        "businessName": "Larry's Birds",
                        "industry": "Pets",
                        "director": "Michael Jordan",
                    },
                    4: {
                        "businessId": 6,
                        "businessName": "Ace Chemicals",
                        "industry": "Chemicals",
                        "Director": "Jack Napier",
                    },
                    5: {
                        "businessId": 5,
                        "businessName": "Archie's Hill",
                        "industry": "Jelly",
                        "Director": "Noa Sundqvist",
                    },
                }

                ,
            }
        };
    }

    //
    // changeSite = () => {
    //     console.log("change");
    //     console.log(this.state.displaySiteToggle);
    //     this.setState({
    //         displaySiteToggle: !this.state.displaySiteToggle
    //     })
    // }
    //
    // displayAdminButton = () => {
    //     if (this.state.displayAdminButton) {
    //         return <Link className=" navbarLink d-flex" href="/account">
    //             <FaUsers />
    //             <p>Admin</p>
    //         </Link>
    //     }
    //     else {
    //         return null;
    //     }
    // }

    render() {
        return <div>
            <MainLayout isAdmin={true} pageName={"Admin Hub"}>
                <div className="whiteBackground mt-5">
                    <h1>ADMIN DASHBOARD</h1>
                </div>
            </MainLayout >
        </div >
    }

}


export default AdminHubV2