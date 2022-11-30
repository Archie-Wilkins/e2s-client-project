import Link from "next/link"
// import NavBar from "../public/components/layouts/navBar.js"
import Router from "next/router";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import Script from "next/script";

const chosenBusinessRowArray = [];

function AdminHub(){
    //const chosenBusinessRowArray = [];

    const [businessRequested, setRequested] = useState(false)

    function handleBusinessRender(businessName){
        !businessRequested ? setRequested(true) : setRequested(false)

        for(let i = 0; i < businessName.length;i++){
            chosenBusinessRowArray.push(businessName[i].innerText);
        }
    }

    function handleReturn() {
        !businessRequested ? setRequested(true) : setRequested(false)
    }

    return <div>
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
                                {businessRequested === false && (
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
                                            <td name={"r1"}><button onClick={() => handleBusinessRender(document.getElementsByName("r1"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name={"r2"} scope="row">2</th>
                                            <td name={"r2"}>Jakob's Ladders</td>
                                            <td name={"r2"}>Furniture</td>
                                            <td name={"r2"}>Jason Todd</td>
                                            <td><button onClick={() => handleBusinessRender(document.getElementsByName("r2"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name="r3" scope="row">3</th>
                                            <td name={"r3"} colSpan={"1"}>Larry's Birds</td>
                                            <td name={"r3"}>Pets</td>
                                            <td name={"r3"}>Michael Jordan</td>
                                            <td><button onClick={() => handleBusinessRender(document.getElementsByName("r3"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name={"r4"} scope="row">4</th>
                                            <td name={"r4"}>Ace Chemicals</td>
                                            <td name={"r4"}>Chemicals</td>
                                            <td name={"r4"}>Jack Napier</td>
                                            <td><button onClick={() => handleBusinessRender(document.getElementsByName("r4"))}>Here</button></td>
                                        </tr>
                                        <tr>
                                            <th name="r5" scope="row">5</th>
                                            <td name={"r5"}>Ace Chemicals</td>
                                            <td name={"r5"}>Chemicals</td>
                                            <td name={"r5"}>Jack Napier</td>
                                            <td><button onClick={() => handleBusinessRender(document.getElementsByName("r5"))}>Here</button></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                )}
                                {businessRequested === true && (
                                    <div>
                                        <h1>{JSON.stringify(chosenBusinessRowArray)}</h1>
                                        <button onClick={handleReturn}>Back</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div><br/>
                    <div className={"row"}>
                        <div className="col-sm">
                            <div className={"calendar-section"}>
                                <h3>Your previous onboardings</h3>
                                <table className="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th scope="col">Onboarding ID</th>
                                        <th scope="col">Business Name</th>
                                        <th scope="col">Onboarding Date</th>
                                        <th scope="col">Client Name</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Grodd's Gorillas</td>
                                        <td>01/03/2022</td>
                                        <td>Solomon Grundy</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Destiny's Sea</td>
                                        <td>18/11/2021</td>
                                        <td>Andre Riaz</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>LA Cotton Candy</td>
                                        <td>20/06/2022</td>
                                        <td>Lucy Vazquez</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Cardiff University</td>
                                        <td>13/10/2022</td>
                                        <td>Katy Cat</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div><br/>
                    <div className={"row"}>
                        <div className="col-sm">
                            <div className={"calendar-section"}>
                                <h3>Your upcoming onboarding dates</h3>
                                <table className="table table-hover table-responsive">
                                    <thead>
                                    <tr>
                                        <th scope="col">Booking ID</th>
                                        <th scope="col">Firstname</th>
                                        <th scope="col">Surname</th>
                                        <th scope="col">Business</th>
                                        <th scope={"col"}>City</th>
                                        <th scope={"col"}>Date</th>
                                        <th scope={"col"}>View</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>Swansea University</td>
                                        <td>Swansea</td>
                                        <td>03/12/2022</td>
                                        <td><Link href={"/about"}><p>Here</p></Link></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>Franky Go Karting</td>
                                        <td>Newport</td>
                                        <td>10/12/2022</td>
                                        <td><Link href={"/about"}><p>Here</p></Link></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AdminHub
