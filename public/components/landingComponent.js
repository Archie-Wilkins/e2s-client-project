import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {Router} from "next/router";
import AccordionComponent from "./accordionComponent.js"
import CarouselComponent from "./carouselComponent.js"
import MainLayout from "./layouts/mainLayoutShell.js"

class LandingComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userIndustry: "",
            userEmail: "",
            userBusiness: "",
            userComments: "",
            userEnergy: "",
            userCo2: "",
            userSpending: "",
            userTechnology: "",
            formSubmitted: false,
            activeSlide: 1,
            pageName: 'Homepage',
            isAdmin: false,
            isDirector: false,
        };
    }


    enquirySubmitApi = async (event) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const data = {
            industry: event.target.industry.value,
            business: event.target.business.value,
            email: event.target.email.value,
            comments: event.target.enquiryCommentSection.value,
            co2: JSON.stringify(event.target.co2.checked),
            spending: JSON.stringify(event.target.spending.checked),
            energy: JSON.stringify(event.target.energy.checked),
            technology: JSON.stringify(event.target.technology.checked),
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = '/api/enquiryForm';

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();

        if(this.state.formSubmitted === false){
            this.setState({formSubmitted: true});
        } else if (this.state.formSubmitted === true){
            this.setState({formSubmitted: false});
        }

        this.setState({userIndustry: data.industry});
        this.setState({userBusiness: data.business});
        this.setState({userEmail: data.email});
        this.setState({userComments: data.comments});
        this.setState({userCo2: data.co2});
        this.setState({userEnergy: data.energy});
        this.setState({userSpending: data.spending});
        this.setState({userTechnology: data.technology});
    }

    handleReset = async (event) => {
        window.scrollTo(0,0);
        this.setState({formSubmitted: false});
    }

    render() {
        return <div className={"landing-page"}>
            <MainLayout isAdmin={this.state.isAdmin} isDirector={this.state.isDirector} pageName={this.state.pageName}>
                <h1 className='landingHeader'>Welcome to E2S now!</h1>
                <h3 className='landingSubheader'>Take control over your energy today.</h3>
                <CarouselComponent/>
                <div className={"landingBody"}>
    <h1>About Us</h1><br/>
    <hr className={"underline-style"}/>
    <AccordionComponent/><br/>
    <h1>Enquire</h1>
    <hr className={"underline-style"}/>
    <p>If you would like to request more information on how to get started, please fill
        out the form below.</p>

    {this.state.formSubmitted === true && (
        <div className={"enquiry-form"}>
            <div className={"enquiry-form-header"}>
                <h1>REQUEST FORM</h1>
            </div>
            <div className={"enquiry-form-content"}>
                <br/>
                <label>Industry: {this.state.userIndustry}</label>
                <br/>
                <label>Business: {this.state.userBusiness}</label>
                <br/>
                <label>Email: {this.state.userEmail}</label>
                <br/>
                <label>Comments: {this.state.userComments}</label>
                <br/>
                <h2>Goals</h2>
                <br/>
                {this.state.userCo2 === "true" && (
                    <label>CO2</label>
                )}
                {this.state.userSpending === "true" && (
                        <label>Spending</label>
                )}
                {this.state.userEnergy === "true" && (
                        <label>Energy</label>
                )}
                {this.state.userTechnology === "true" && (
                        <label>Technology</label>
                )}            
            </div>
            <button onClick={this.handleReset} className={"enquiry-form-submit-button"}>BACK</button>
        </div>
    )}
    {!this.state.formSubmitted && (
        <form onSubmit={this.enquirySubmitApi} className={"enquiry-form"} method="post" id={"enquiryForm"} data-testid="form">
            <div className={"enquiry-form-header"}>
                <h1>REQUEST FORM</h1>
            </div>
            <div className={"enquiry-form-content"}>
                <label htmlFor="industry">Which industry are you in? (Required)</label>
                <br/>
                <input type="text" id="industry" name="industry" required minLength={"1"} maxLength={"50"} data-testid="industry"/>
                <br/><br/>
                <label htmlFor="business">What is your business name? (Required)</label>
                <br/>
                <input type="text" id="business" name="business" required minLength={"1"} maxLength={"50"} data-testid="business"/>
                <br/><br/>
                <label htmlFor="email">What is your email address? (Required)</label>
                <br/>
                <input type="email" id="email" name="email" required minLength={"1"} maxLength={"50"} data-testid="email"/>

                <br/><br/>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="co2"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">CO2 Emissions</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="spending"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">Spending</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="energy"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">Energy Use</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="technology"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">Technology Insights</label>
                </div>
                <br/>
            </div>

            <label htmlFor={"enquiryCommentSection"} className={"enquiry-form-comment-section-label"}>Would you like to asky any questions? (Optional)</label>
            <input type={"text"} className={"enquiry-form-comment-section"} id={"enquiryCommentSection"}></input>
            <br/>
            <button type="submit" className={"enquiry-form-submit-button"}>Submit</button>
        </form>
    )}

                </div>
            </MainLayout>
    </div>
    }
    
}

export default LandingComponent;