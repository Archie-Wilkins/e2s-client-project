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
            validEmail:""
        };
    }




    //toDO
    //auto check email as its entered DO NOW
    //ONLY allow "ready" when:
    //  - user/email entered is an ESM of a site
    //  - a valid timeframe has been selected

    //submit will only work when ready = "yes"

    getUser = async () => {
        event.preventDefault();
        //resets site
        document.getElementById("siteName").innerText = "";
        this.state.siteName = "";
        this.state.siteID = "";
        this.state.validEmail = "false";

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

        //if user is not related to a site
        if(!result.site_id) {
            //make red/orange X show
            console.log("no site id");
            return;
        }
        //user has a valid email
        this.state.validEmail = "true";

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

        let selectBox = document.getElementById("weeks");
        selectBox.innerHTML="";

        weekArray.forEach(date =>{
            let dateOption = new Option(date,date.value);
            selectBox.options.add(dateOption);
        })
    }

    sendEmail = async (event) => {
        event.preventDefault();

        // this.state.validEmail = "false";
        // this.state.siteID = "";
        // this.state.siteName = "";
        // let selectBox = document.getElementById("weeks");
        // selectBox.innerHTML="Fetch user data";
        // document.getElementById("siteName").innerText = "";
        // this.state.ready = "no";

        //check email is valid
        if(this.state.validEmail === "false"){
            alert("invalid email, if email is correct please fetch user data");
        }

        if(this.state.ready === "no"){
            alert("please make sure all fields are correctly filled out");
        }

        //get email

        const userEmail = document.getElementById("email").value;

        //get site Name

        const siteName = this.state.siteName;

        //get date

        const date = document.getElementById("weeks").value;

        const dateStart = date.substring(0, 10);

        const dateEnd = date.substring(13, date.length)


        //get energy this week

        //make api get this siteweek data

        let data = {
            siteID: this.state.siteID,
            dateStart: date.substring(0, 10),
            dateEnd: date.substring(13, date.length)
        }

        let JSONdata = JSON.stringify(data);

        let endpoint = '/api/getSiteWeekData';
        let options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        let response = await fetch(endpoint, options)
        let result = await response.json();

        let stringResult = JSON.stringify(result);
        stringResult = stringResult.replace("[", "");
        stringResult = stringResult.replace("]", "");

        result = JSON.parse(stringResult);

        //energy this week
        console.log(result.energy_week_usage + "kW");

        const thisEnergyUsage = result.energy_week_usage + "kW";

        //carbon this week
        console.log(result.carbon_week_emitted + "kg");

        const thisCarbonUsage = result.carbon_week_emitted + "kg";

        //expenditure this week
        console.log("£" + result.energy_week_cost);

        const thisExpenditure = "£" + result.energy_week_cost;

        //get energy previous week

        //get previous week start
        let prevStart = new Date();

        const previousWeekStart = Date.parse(date.substring(0, 10)) - (7 * 24 * 60 * 60 * 1000);

        //get previous week end
        const previousWeekEnd = Date.parse(date.substring(13, date.length)) - (7 * 24 * 60 * 60 * 1000);

        //get previous week date and format it

        //format date function from: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
        function formatDate(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + (d.getDate()),
                year = d.getFullYear();

            if (month.length < 2)
                month = '0' + month;
            if (day.length < 2)
                day = '0' + day;

            return [year, month, day].join('-');
        }

        //make api get previous siteweek data
        data = {
             siteID: this.state.siteID,
             dateStart: formatDate(previousWeekStart),
             dateEnd: formatDate(previousWeekEnd)
         }

        JSONdata = JSON.stringify(data);

        endpoint = '/api/getSiteWeekData';
        options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        response = await fetch(endpoint, options)
        result = await response.json();

        stringResult = JSON.stringify(result);
        stringResult = stringResult.replace("[", "");
        stringResult = stringResult.replace("]", "");

        result = JSON.parse(stringResult);

        console.log("previous week");


        //energy previous week
        console.log(result.energy_week_usage + "kW");

        const previousEnergyUsage = result.energy_week_usage + "kW";

        //carbon previous week
        console.log(result.carbon_week_emitted + "kg");

        const previousCarbonUsage = result.carbon_week_emitted + "kg";

        //expenditure previous week
        console.log("£" + result.energy_week_cost);

        const previousExpenditure = "£" + result.energy_week_cost;





        //get energy site average week

        //make api get previous siteweek data

        //produce energy overview

        data = {
            siteID: this.state.siteID
        }

        JSONdata = JSON.stringify(data);

        endpoint = '/api/getSiteHistoricalData';
        options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        response = await fetch(endpoint, options)
        result = await response.json();

        stringResult = JSON.stringify(result);
        stringResult = stringResult.replace("[", "");
        stringResult = stringResult.replace("]", "");

        result = JSON.parse(stringResult);

        console.log("average history");

        //energy previous week
        console.log(result.energy_week_usage + "kW");

        const averageEnergyUsage = result.energy_week_usage + "kW";

        //carbon previous week
        console.log(result.carbon_week_emitted + "kg");

        const averageCarbonUsage = result.carbon_week_emitted + "kg";

        //expenditure previous week
        console.log("£" + result.energy_week_cost);

        const averageExpenditure = "£" + result.energy_week_cost;







        // emailjs.send("service_vhvmdc2","template_74t4ffc",{
        //     siteName: "NewportHospital",
        //     date: "",
        //     energyThisWeek: "123kW",
        //     energyPreviousWeek: "133kW",
        //     energyAverageWeek: "144kW",
        //     energyOverview: "Newport Hospital has used 95Kw less of energy than the previous week. Keep up the good work!\n" +
        //         "\n" +
        //         "\n" +
        //         "\n" +
        //         "Newport Hospital is 289Kw under its historical average for energy consumption",
        //     carbonThisWeek: "144kg",
        //     carbonPreviousWeek: "231kg",
        //     carbonAverageWeek: "233kg",
        //     carbonOverview: "Newport Hospital has used 95Kg less of energy than the previous week. Keep up the good work!\n" +
        //         "\n" +
        //         "\n" +
        //         "\n" +
        //         "Newport Hospital is 52Kg under its historical average for energy consumption\n" +
        //         "\n" +
        //         "\n" +
        //         "\n" +
        //         "You currently have 2 potential improvements for energy and carbon.",
        //     expenditureThisWeek: "2142",
        //     expenditurePreviousWeek: "2412",
        //     expenditureAverageWeek: "2341",
        //     expenditureOverview: "\n" +
        //         "Newport Hospital has spent £23 less than the previous week. Keep up the good work!\n" +
        //         "\n" +
        //         "\n" +
        //         "\n" +
        //         "Newport Hospital is £13 under its historical average for expenditure\n" +
        //         "\n" +
        //         "\n" +
        //         "\n" +
        //         "You currently have 1 potential improvements for expenditure.",
        //     email: "ethanaharris10@gmail.com",
        // }, 'V_nH2nvFeD1k31Dpg').then((result) => {
        //                 alert("email sent");
        //             }, (error) => {
        //                 alert("email failed: " + error);
        //             });




        //const input = document.getElementById('divToPrint');
        //
        //const doc = new jsPDF();
        //
        //get table html
        //const pdfTable = document.getElementById('email-template');
        //html to pdf format
        //var html = htmlToPdfmake(pdfTable.innerHTML);

        //const documentDefinition = { content: html };
        //pdfMake.vfs = pdfFonts.pdfMake.vfs;
        //pdfMake.createPdf(documentDefinition).open();






    }

    updateEmail = async (event) => {
        this.state.validEmail = "false";
        this.state.siteID = "";
        this.state.siteName = "";
        let selectBox = document.getElementById("weeks");
        selectBox.innerHTML="Fetch user data";
        document.getElementById("siteName").innerText = "";
        this.state.ready = "no";
    }

    weekSelected = async (event) => {
        this.state.ready = "yes";
    }

    render() {
        //const { siteHistory = []  = this.state.siteHistory;
        //console.log(this.state.siteHistory);
        return <div>
            <div className="loginBackground">
                <form>
                    <label>Email:</label>
                    <input type="email" id="email" name="email" placeholder="ESM email address..." onChange={this.updateEmail}></input>
                    <button onClick={this.getUser}>Fetch User Data</button>
                    <br/>
                    <label>Site: <label id="siteName"></label></label>
                    <br/>
                    <label>Week:</label>
                    <select id="weeks" onClick={this.weekSelected}>
                        <option value="sample date">sampleDate</option>
                    </select>
                    <br/>
                    <button onClick={this.sendEmail}>Send Report</button>
                </form>
                <br/>
            </div>
            <button className="hidden margin-left-1vw" id="generateButton" onClick={this.generatePDF}>generate pdf</button>
        </div>
    }
}

export default WeeklyEmailPage;
