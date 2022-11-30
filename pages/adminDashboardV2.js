import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
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
            chosenBusinessRowArray: [],
            businessRequested: false,
        };
    }


    handleBusinessRender(businessName){

        this.setState({businessRequested: true});

        for(let i = 0; i < businessName.length;i++){
            this.state.chosenBusinessRowArray.push(businessName[i].innerText);
        }
    }

    handleReturn() {
        this.setState({chosenBusinessRowArray: []});
        this.setState({businessRequested: false});

        /*if(!this.state.businessRequested){
            this.setState({businessRequested: true});
        }else{
            this.setState({businessRequested: false});
        }*/    
    }

    render() {
        return <div>
            <MainLayout isAdmin={true} pageName={"Admin Hub"}>
            <div className={"admin-header-container"}>
            <div className={"dashboard-header"}>
                <h1>ADMIN DASHBOARD</h1>
                <hr className={"h1-underline"}/>
                <p className={"dashboard-sub-header"}>Welcome to E2S, Admin.</p><br/>
                <div className={"admin-content"}>
                    <div className="row">
                        <div className="col-sm">
                            <div className={"business-section"}>
                                <h3>View All Businesses</h3>
                                {this.state.businessRequested === false && (
                                    <table className="table table-hover table-responsive">
                                        <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Business Name</th>
                                            <th scope="col">Industry</th>
                                            <th scope="col">Director</th>
                                            <th scope={"col"}>View</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th name="r1" scope="row">1</th>
                                            <td name="r1" id={"row1Business"}>Mark's Tools</td>
                                            <td name={"r1"}>Agriculture</td>
                                            <td name={"r1"}>Komodo Dragon</td>
                                            <td name={"r1"}><button onClick={() => this.handleBusinessRender(document.getElementsByName("r1"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name={"r2"} scope="row">2</th>
                                            <td name={"r2"}>Jakob's Ladders</td>
                                            <td name={"r2"}>Furniture</td>
                                            <td name={"r2"}>Jason Todd</td>
                                            <td><button onClick={() => this.handleBusinessRender(document.getElementsByName("r2"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name="r3" scope="row">3</th>
                                            <td name={"r3"} colSpan={"1"}>Larry's Birds</td>
                                            <td name={"r3"}>Pets</td>
                                            <td name={"r3"}>Michael Jordan</td>
                                            <td><button onClick={() => this.handleBusinessRender(document.getElementsByName("r3"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name={"r4"} scope="row">4</th>
                                            <td name={"r4"}>Ace Chemicals</td>
                                            <td name={"r4"}>Chemicals</td>
                                            <td name={"r4"}>Jack Napier</td>
                                            <td><button onClick={() => this.handleBusinessRender(document.getElementsByName("r4"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name="r5" scope="row">5</th>
                                            <td name={"r5"}>Ace Chemicals</td>
                                            <td name={"r5"}>Chemicals</td>
                                            <td name={"r5"}>Jack Napier</td>
                                            <td><button onClick={() => this.handleBusinessRender(document.getElementsByName("r5"))}>Here</button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                )}
                                {this.state.businessRequested === true && (
                                    <div>
                                        <h1>{JSON.stringify(this.state.chosenBusinessRowArray)}</h1>
                                        <button onClick={() => this.handleReturn()}>Back</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div><br/>
                    
                </div>
            </div>
        </div>
        </MainLayout>
        </div>
    }
}


export default AdminHubV2