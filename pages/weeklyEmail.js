import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import Cookies from 'universal-cookie';
import { useState } from 'react';
import Cookies from 'js-cookie';
import emailjs from 'emailjs-com';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';


class WeeklyEmailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteID:"",
            ready:"",
            siteName:"",
            files: []
        };
    }


    //toDO
    //auto check email as its entered DO NOW
    //ONLY allow "ready" when:
    //  - user/email entered is an ESM of a site
    //  - a valid timeframe has been selected

    //submit will only work when ready = "yes"

    getUser = async () => {
        //resets site
        document.getElementById("siteName").innerText = "";
        this.state.siteName = "";
        this.state.siteID = "";

        //console.log("getUser called");
        const formEmail = document.getElementById("email").value;




        //check user exists in database

        let data = {email: formEmail};
        // Send the data to the server in JSON format.
        let JSONdata = JSON.stringify(data);

        let endpoint = '/api/getUserSiteFromEmail';
        let options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        let response = await fetch(endpoint, options)
        let result = await response.json();

        //if no site has been found related to user email
        if(!result.data.message){

            return;
        } else if(result.data.message.toString() === "no site") {
            //make red/orange X show

            return;
        }


        //show green tick to indicate user has a site

        //get site name from ID - API call

        //creates json using siteID from previous API call
        this.state.siteID = result.data.site.toString();
        data = {siteID: result.data.site.toString()};
        JSONdata = JSON.stringify(data);

        endpoint = '/api/getSiteDetails';
        options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        response = await fetch(endpoint, options)
        result = await response.json();
        //formats the JSON correctly
        let stringResult = JSON.stringify(result);
        stringResult = stringResult.replace("[", "");
        stringResult = stringResult.replace("]", "");

        result = JSON.parse(stringResult);

        if(!result.site_id) {
            //make red/orange X show
            console.log("no site id");
            return;
        }
        //update page information
        this.state.siteName = await result.county;
        document.getElementById("siteName").innerText = this.state.siteName;

        //fetch site daily data

        data = {siteID: this.state.siteID}
        JSONdata = JSON.stringify(data);

        endpoint = '/api/getSiteDailyData';
        options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        response = await fetch(endpoint, options)
        result = await response.json();
        //formats the JSON correctly
        // stringResult = JSON.stringify(result);
        // stringResult = stringResult.replace("[", "");
        // stringResult = stringResult.replace("]", "");
        //
        //result = JSON.parse(result);

        //console.log(result[1].energy_day_cost);

        let weekArray = [];

        let Monday;

        for(var record in await result){
            //const [year, month, day] = String(result[record].time_stamp).split('-');
            //console.log(result[record].time_stamp);
            //let days = new Date(year, day, month);

            let [date, time] = result[record].day.split("T");
            const [year, month, day] = date.split('-');
            //console.log(result[record].day);
            //let days = new Date(year, month, day);

            let days = new Date(date);

            //console.log(days.getDay());

            if(days.getDay() === 0){
                //start week
                Monday = date;
            }

            if(days.getDay() === 6){
                //end week
                if(days.getDay() + new Date(Monday).getDay() === 6){
                    weekArray.push(Monday + " - " + date);
                }
            }

        }

        console.log(weekArray);

        //paginate them into weeks

        //put them into options of {date} - {date} in dropdown

        //get historical weeks from siteID - API call

    }

    generateReport = async (event) => {

        event.preventDefault();
        //if form data isnt correct atm


        if(!this.state.ready.value === "no"){
            //output error
            console.log("no");
            return;
        }

        document.getElementById("email-template").style.display = "block";
        document.getElementById("generateButton").style.display = "block";

        document.getElementById("title").innerText = this.state.siteName + " | " + document.getElementById("week").value + " weekly report";

        //I have decided to use document.getElementById().value instead of event.target.email.value
        //this is because Jest hates getting values from an event
        //and they do the exact same thing pretty much

        const email = document.getElementById("email").value;

        //get time frame from selected timeframe in form

        //create graph images
        //graphs should have current week, historical average and previous week (if possible)

        //add information:
        //this week total usage for each metric
        //previous week total usage for each metric
        //Historical average

        //get observations:
        //  1. (site name) has used X more/less than the previous week
        //  2. (site name) has used X more/less this week than the sites historical average, keep up the good work
        //  3. (if current week) you have X potential improvements


        const emailContent = {
            email: email,
            siteName: this.state.siteName.value,
            dateStart: "07/11/2022",
            dateEnd: "13/11/2022",
            energyThisWeek: "21,142Kw",
            energyPreviousWeek: "21,237Kw",
            energyAverageWeek: "21,431Kw",
            carbonThisWeek: "12,652Kg",
            carbonPreviousWeek: "12,530Kg",
            carbonAverageWeek: "12,600Kg",
            expenditureThisWeek: "£4,230",
            expenditurePreviousWeek: "£4,253",
            expenditureAverageWeek: "£4,243",
        }


        // //emailjs to send email
        // emailjs.send('service_vhvmdc2', 'template_b4gj0c5', emailContent, 'V_nH2nvFeD1k31Dpg')
        //     .then((result) => {
        //         //if successful display "new code sent"
        //         alert("sent email");
        //     }, (error) => {
        //         //if fails display "Error occured while sending email"
        //         alert(error);
        //     });




    }

    generatePDF = async (event) => {
        event.preventDefault();

        alert("attempting to send email");

        // emailjs.send("service_vhvmdc2","template_74t4ffc",{
        //     siteName: "NewportHospital",
        //     dateStart: "28/11/2022",
        //     dateEnd: "04/12/2022",
        //     energyThisWeek: "123kW",
        //     energyPreviousWeek: "133kW",
        //     energyAverageWeek: "144kW",
        //     carbonThisWeek: "144kg",
        //     carbonPreviousWeek: "231kg",
        //     carbonAverageWeek: "233kg",
        //     expenditureThisWeek: "2142",
        //     expenditurePreviousWeek: "2412",
        //     expenditureAverageWeek: "2341",
        //     email: "ethanaharris10@gmail.com",
        // });

        //const input = document.getElementById('divToPrint');
        //
        const doc = new jsPDF();
        //
        //get table html
        const pdfTable = document.getElementById('email-template');
        //html to pdf format
        var html = htmlToPdfmake(pdfTable.innerHTML);

        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();



    }



    render() {
        return <div>
            <div className="loginBackground">
                <form onSubmit={this.generateReport}>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" placeholder="ESM email address..." onChange={this.getUser}></input>
                    <br/>
                    <label>Site: <label id="siteName"></label></label>
                    <br/>
                    <label>Week:</label>
                    <input list="week" name="week" id="week"></input>
                    <datalist id="week">
                        <option value="28/11/2022 - 04/12/2022"/>
                        <option value="21/11/2022 - 27/11/2022"/>
                        <option value="14/11/2022 - 20/11/2022"/>
                        <option value="07/11/2022 - 13/11/2022"/>
                        <option value="31/10/2022 - 06/11/2022"/>
                    </datalist>
                    <br/>
                    <button type="submit">Generate report</button>
                </form>
            </div>
            <div className="hidden" id="email-template">
                <h2 id="title">Newport Hospital | 07/11/2022 - 13/11/2022 weekly report</h2>
                <div className="vertical-space"></div>
                <div className="margin-left-1vw">
                    <div>
                        <div className="graph-container">
                            <h2 className="margin-left-none">Energy usage</h2>
                            <div></div>
                        </div>
                        <div>
                            <h2>Total</h2>
                            <div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>This week</th>
                                        <th>Previous week</th>
                                        <th>Historical average</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Emil</td>
                                        <td>Tobias</td>
                                        <td>Linus</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h3>Overview</h3>
                            <div>sample overview text</div>
                        </div>
                    </div>
                    <div className="vertical-space"></div>
                    <div>
                        <div className="graph-container">
                            <h2 className="margin-left-none">Carbon Emissions</h2>
                            {/*<img style={{height: "100px", width: "100px"}}  src={require('../public/images/navbar/dashboard.png').default}></img>*/}
                            {/*<div style={{height: "1030", width: "507"}}>*/}
                            {/*    <div className="graph1"></div>*/}
                            {/*</div>*/}
                            {/*<img src={"/_next/static/media/Graph1.b6d8bf7a.png"} />*/}

                        </div>
                        <div>
                            <h2>Total</h2>
                            <div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>This week</th>
                                        <th>Previous week</th>
                                        <th>Historical average</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Emil</td>
                                        <td>Tobias</td>
                                        <td>Linus</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h3>Overview</h3>
                            <div>sample overview text</div>
                        </div>
                    </div>
                    <div className="vertical-space"></div>
                    <div>
                        <div className="graph-container">
                            <h2 className="margin-left-none">Expenditure</h2>
                            <div></div>
                        </div>
                        <div>
                            <h2>Total</h2>
                            <div>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>This week</th>
                                        <th>Previous week</th>
                                        <th>Historical average</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Emil</td>
                                        <td>Tobias</td>
                                        <td>Linus</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h3>Overview</h3>
                            <div>sample overview text</div>
                        </div>
                    </div>
                    <div className="vertical-space"></div>
                </div>
            </div>
            <button className="hidden margin-left-1vw" id="generateButton" onClick={this.generatePDF}>generate pdf</button>
        </div>
    }
}

export default WeeklyEmailPage;
