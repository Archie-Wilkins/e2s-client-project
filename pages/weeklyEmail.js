import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import Cookies from 'universal-cookie';
import { useState } from 'react';
import Cookies from 'js-cookie';
import emailjs from 'emailjs-com';



class WeeklyEmailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            siteID:"",
            ready:"",
            siteName:""
        };
    }

    //toDO
    //auto check email as its entered DO NOW
    //ONLY allow "ready" when:
    //  - user/email entered is an ESM of a site
    //  - a valid timeframe has been selected

    //submit will only work when ready = "yes"

    getUser = async () => {
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

        //get historical weeks from siteID - API call





    }

    sendEmail = async (event) => {

        event.preventDefault();
        //if form data isnt correct atm


        if(!this.state.ready.value === "no"){
            //output error
            console.log("no");
            return;
        }



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


        //emailjs to send email
        emailjs.send('service_vhvmdc2', 'template_b4gj0c5', emailContent, 'V_nH2nvFeD1k31Dpg')
            .then((result) => {
                //if successful display "new code sent"
                alert("sent email");
            }, (error) => {
                //if fails display "Error occured while sending email"
                alert(error);
            });


    }


    render() {
        return <div className="loginBackground" onSubmit={this.sendEmail}>
            <form>
                <label>Email:</label>
                <input type="email" id="email" name="email" placeholder="ESM email address..." onChange={this.getUser}></input>
                <br/>
                <label>Site: <label id="siteName"></label></label>
                <br/>

                <label>Week:</label>
                <input list="week" name="week"></input>
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
    }
}

export default WeeklyEmailPage;
