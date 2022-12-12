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

    //used to fetch user and site data from database
    getUser = async () => {
        event.preventDefault();
        //resets all data
        document.getElementById("siteName").innerText = "";
        this.state.siteName = "";
        this.state.siteID = "";
        this.state.validEmail = "false";

        //gets email
        const formEmail = document.getElementById("email").value;

        //check user exists in database via email
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
            alert("user not related to a site");
            return;
        }

        //creates json using siteID from previous API call
        this.state.siteID = result.data.site.toString();
        data = {siteID: result.data.site.toString()};
        JSONdata = JSON.stringify(data);


        //API request to get site details
        endpoint = '/api/getSiteDetails';
        options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        response = await fetch(endpoint, options)
        result = await response.json();
        //DB returns JSON wrapped in [] which javascript doesn't like
        //so we stringify it, remove [], then parse back to JSON
        let stringResult = JSON.stringify(result);
        stringResult = stringResult.replace("[", "");
        stringResult = stringResult.replace("]", "");
        result = JSON.parse(stringResult);

        //if user is not related to a site
        if(!result.site_id) {
            alert("user is not related to a site");
            return;
        }
        //user has a valid email
        this.state.validEmail = "true";

        //update page information
        this.state.siteName = await result.county;
        document.getElementById("siteName").innerText = this.state.siteName;

        //fetch site historical data (returned in days)
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

        //initialise variables
        let weekArray = [];
        let Monday;

        //loops through dates in JSON response to find weeks
        for(var record in await result){
            let [date, time] = result[record].time_stamp.split("T");
            const [year, month, day] = date.split('-');

            let days = new Date(date);

            //if day is a monday
            if(days.getDay() === 1){
                //store monday's date
                Monday = date;
            }

            //if day is a sunday
            if(days.getDay() === 0){
                //end week
                //and push the monday & sunday to array
                if(days.getDay() + new Date(Monday).getDay() === 1){
                    weekArray.push(Monday + " - " + date);
                }
            }
        }

        //clears select box
        let selectBox = document.getElementById("weeks");
        selectBox.innerHTML="";

        //will make each week appear as an option in dropdown in select box
        weekArray.forEach(date =>{
            let dateOption = new Option(date,date.value);
            selectBox.options.add(dateOption);
        })
    }

    sendEmail = async (event) => {
        event.preventDefault();

        //check email is valid
        if(this.state.validEmail === "false"){
            alert("invalid email, if email is correct please fetch user data");
            return;
        }

        //if email not ready to be sent
        if(this.state.ready === "no"){
            alert("please make sure all fields are correctly filled out");
            return;
        }

        //get email
        const userEmail = document.getElementById("email").value;

        //get site Name
        const siteName = this.state.siteName;

        //get date
        const date = document.getElementById("weeks").value;

        //get date start through substring
        const dateStart = date.substring(0, 10);
        //get date end through substring
        const dateEnd = date.substring(13, date.length)

        //creates object to convert to json
        let data = {
            siteID: this.state.siteID,
            dateStart: date.substring(0, 10),
            dateEnd: date.substring(13, date.length)
        }
        let JSONdata = JSON.stringify(data);
        //API will get site data for the timeframe submitted (this week)
        let endpoint = '/api/getSiteWeekData';
        let options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSONdata,
        }
        let response = await fetch(endpoint, options)
        let result = await response.json();
        //DB returns JSON wrapped in [] which javascript doesn't like
        //so we stringify it, remove [], then parse back to JSON
        let stringResult = JSON.stringify(result);
        stringResult = stringResult.replace("[", "");
        stringResult = stringResult.replace("]", "");
        result = JSON.parse(stringResult);

        //energy this week
        const thisEnergyUsage = result.energy_week_demand;

        //carbon this week
        const thisCarbonUsage = result.carbon_week_emitted;

        //expenditure this week
        const thisExpenditure = result.energy_week_cost;


        //got all current week data, begins to fetch previous week data

        //calculates the previous week's beginning
        const previousWeekStart = Date.parse(date.substring(0, 10)) - (7 * 24 * 60 * 60 * 1000);

        //calculates the previous week's end
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

        //make api get previous siteweek data (uses function for correct format)
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
        //result is JSON response of API
        //JSON holds previous weeks site data

        //energy previous week
        const previousEnergyUsage = result.energy_week_demand;

        //carbon previous week
        const previousCarbonUsage = result.carbon_week_emitted;

        //expenditure previous week
        const previousExpenditure = result.energy_week_cost;


        //API request to get site averages
        data = {siteID: this.state.siteID}
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


        //energy average week
        const averageEnergyUsage = result.energy_avg_week_demand;

        //carbon average week
        const averageCarbonUsage = result.carbon_avg_week_emitted;

        //expenditure average week
        const averageExpenditure = result.energy_avg_week_cost;



        //function to dynamically generate energy overview text
        function generateOverview(thisWeek, previousWeek, average, unit, siteName) {
            let overview = "";
            //needs different format of overview

            //calculate difference between this week and prev
            //set variable to difference
            let thisWeekPrevWeekDiff = parseFloat(thisWeek) - parseFloat(previousWeek);
            //reduces decimal number to two digits
            thisWeekPrevWeekDiff = thisWeekPrevWeekDiff.toFixed(2);

            //calculate difference between this week and average
            //set variable to difference
            let thisWeekAvgDiff = parseFloat(thisWeek) - parseFloat(average);
            //reduces decimal number to two digits
            thisWeekAvgDiff = thisWeekAvgDiff.toFixed(2);

            //I seperated the unit into money/expenditure and energy usage and carbon emissions
            //because of the way I worded the emials in the wireframe
            if(unit === "£"){
                //same spent as previous week
                if(thisWeekPrevWeekDiff === 0){
                    overview = siteName + " has spent the same as the previous week.\n";
                }
                //spent less than previous week
                if(thisWeekPrevWeekDiff < 0){
                    const positiveFloat = -thisWeekPrevWeekDiff;
                    overview = siteName + " has spent £" + -thisWeekPrevWeekDiff +
                        " less than the previous week. Keep up the good work!\n";
                }
                //spent more than previous week
                if(thisWeekPrevWeekDiff > 0){
                    overview = siteName + " has spent £" + thisWeekPrevWeekDiff + " more than the previous week.\n\n" +
                        "Login to E2S or consult us for potential improvements and insights\n";
                }

                //same spent as average week
                if(thisWeekAvgDiff === 0){
                    overview = overview + "\n" + siteName + " has spent the same as the average week.";
                }
                //spent less than average week
                if(thisWeekAvgDiff < 0){
                    overview = overview + "\n" + siteName + " is £" + -thisWeekAvgDiff +
                        " under its historical average for expenditure.";
                }
                //spent more than average week
                if(thisWeekAvgDiff > 0){
                    overview = overview + "\n" + siteName + " is £" + thisWeekAvgDiff +
                        " over its historical average for expenditure.";
                }

                return overview;
            }
            let buzzword; //either 'emitted' or 'used' for carbon and energy
            if(unit === "kW"){
                buzzword = "used";
            } else if(unit === "Kg"){
                buzzword = "emitted";
            } else {
                //incorrect unit input
                return "function generate overview error: unit not recognised";
            }

            //same spent as previous week
            if(thisWeekPrevWeekDiff === 0){
                overview = siteName + " has " + buzzword + " the same " + unit + " as the previous week.\n";
            }
            //spent less than previous week
            if(thisWeekPrevWeekDiff < 0){
                overview = siteName + " has " + buzzword + " " + -thisWeekPrevWeekDiff + unit +
                    " less than the previous week. Keep up the good work!\n";
            }
            //spent more than previous week
            if(thisWeekPrevWeekDiff > 0){
                overview = siteName + " has " + buzzword + " " + thisWeekPrevWeekDiff + unit +
                    " more than the previous week.\n\n" +
                    "Login to E2S or consult us for potential improvements and insights \n";
            }

            //same spent as average week
            if(thisWeekAvgDiff === 0){
                overview = overview + siteName + " has " + buzzword + " the same " + unit +
                    " as the average week.";
            }
            //spent less than average week
            if(thisWeekAvgDiff < 0){
                overview = overview +"\n" + siteName + " is " + -thisWeekAvgDiff + unit +
                    " under its historical average.";
            }
            //spent more than average week
            if(thisWeekAvgDiff > 0){
                overview = overview +"\n" + siteName + " is " + thisWeekAvgDiff + unit +
                    " over its historical average.";
            }

            return overview;
        }

        //generates overviews via generateOverview function
        const energyOverview = generateOverview(thisEnergyUsage, previousEnergyUsage, averageEnergyUsage, "kW", siteName);
        const carbonOverview = generateOverview(thisCarbonUsage, previousCarbonUsage, averageCarbonUsage, "Kg", siteName);
        const expenditureOverview = generateOverview(thisExpenditure, previousExpenditure, averageExpenditure, "£", siteName);

        //sends off email with all the data/content generated
        emailjs.send("service_vhvmdc2","template_74t4ffc",{
            siteName: siteName,
            date: date,
            energyThisWeek: thisEnergyUsage + "kW",
            energyPreviousWeek: previousEnergyUsage + "kW",
            energyAverageWeek: averageEnergyUsage + "kW",
            energyOverview: energyOverview,
            carbonThisWeek: thisCarbonUsage + "Kg",
            carbonPreviousWeek: previousCarbonUsage + "Kg",
            carbonAverageWeek: averageCarbonUsage + "Kg",
            carbonOverview: carbonOverview,
            expenditureThisWeek: "£" + thisExpenditure,
            expenditurePreviousWeek: "£" + previousExpenditure,
            expenditureAverageWeek: "£" + averageExpenditure,
            expenditureOverview: expenditureOverview,
            email: userEmail,
        }, 'V_nH2nvFeD1k31Dpg').then((result) => {
                        alert("email sent");
                    }, (error) => {
                        alert("email failed: " + error);
                    });

    }

    updateEmail = async (event) => {
        //this is used to reset all the variables when email is changed
        this.state.validEmail = "false";
        this.state.siteID = "";
        this.state.siteName = "";
        let selectBox = document.getElementById("weeks");
        selectBox.innerHTML="Fetch user data";
        document.getElementById("siteName").innerText = "";
        this.state.ready = "no";
    }

    weekSelected = async (event) => {
        //when a week is selected
        this.state.ready = "yes";
    }

    render() {
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
