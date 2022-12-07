import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CarouselComponent from "../public/components/carouselComponent"
import BottomFooter from "../public/components/layouts/bottomFooter.js"


class LandingPage extends React.Component {
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

        if (this.state.formSubmitted === false) {
            this.setState({ formSubmitted: true });
        } else if (this.state.formSubmitted === true) {
            this.setState({ formSubmitted: false });
        }

        this.setState({ userIndustry: data.industry });
        this.setState({ userBusiness: data.business });
        this.setState({ userEmail: data.email });
        this.setState({ userComments: data.comments });
        this.setState({ userCo2: data.co2 });
        this.setState({ userEnergy: data.energy });
        this.setState({ userSpending: data.spending });
        this.setState({ userTechnology: data.technology });
    }

    handleReset = async (event) => {
        window.scrollTo(0, 0);
        this.setState({ formSubmitted: false });
    }

    handleFormScroll = async (event) => {
        window.scrollTo(0, 1200);
    }

    render() {
        return <div className="landing-page" aria-label="landing page">
            <nav class="navbar navbar-expand-lg navbar-light bg-light" aria-label="navigation bar">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/" aria-label="e2s home button link">E2S</a>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-label="about us link" aria-current="page" href="/about">About Us</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" aria-label="request industry energy usage data link" href="#">Energy Data</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" aria-label="sign up link" href="#" onClick={this.handleFormScroll}>Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <CarouselComponent />
            <div className="landingBody" aria-label="body of the page">

                {/* About Us information */}
                <h1 className='mx-5 mt-3'>About Us</h1>
                <hr className="underline-style" />

                <div>
                    <h3 className="mx-5">Who are we?</h3>
                    <p className="mx-5"><strong>We are E2S</strong>, a service as a platform to offer you a variety of tools to manage your energy usage. We support work sites in tracking all of their usage metrics, their spending, and their CO2 emissions. Our bespoke solution offers Directors and Site Managers in-depth reports on where their money is going. We offer forecasting data and predictions about where your energy usage is taking you and where you could be heading. You can set targets and we will offer you the best advice and planning to meet them. We offer new technology and feedback based on what will work best for you site!
                    </p>
                    <h3 className="mx-5">What do we do?</h3>
                    <p className="mx-5">We assist large sites across the UK in managing their energy use and taking control of their finances. Through our forecasting, insights, and recommendations, we help companies to reduce their emissions and increase their efficiency.</p>
                    <h3 className="mx-5">What can we do for you?</h3>
                    <p className="mx-5">We can help your site to become its best version. With our analysis suite of tools, you will be on the road to saving money and saving the environment.</p>
                    <b className="mx-5">Start today?</b>
                </div>


                {/* End of About Us Information  */}
                <div aria-label="sign up enquiry section heading">
                    <h1 className='mx-5 mt-5'>Enquire</h1>
                    <hr className="underline-style" />
                    <p className='mx-5'>If you would like to request more information on how to get started, please fill
                        out the form below and a member of the team will get back to you.</p>
                </div>

                {this.state.formSubmitted === true && (
                    <div className="enquiry-form className='mx-5'" aria-label="sign up enquiry form">
                        <div className={"enquiry-form-header"} aria-label="enquiry form header">
                            <h1>REQUEST FORM</h1>
                        </div>
                        <div className={"enquiry-form-content"} aria-label="enquiry form summary content">

                            {/*Ignored on text, switch for div tag sections */}
                            <div aria-label="personal details summary section">
                                <h2>Your request summary:</h2>

                                <label>Industry: {this.state.userIndustry}</label>

                                <label>Business: {this.state.userBusiness}</label>

                                <label>Email: {this.state.userEmail}</label>

                                <label>Comments: {this.state.userComments}</label>

                            </div>

                            <h2 aria-label="goals section">Goals</h2>

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
                        <button onClick={this.handleReset} className={"enquiry-form-submit-button"} aria-label="return home">BACK</button>
                    </div>
                )}

                {!this.state.formSubmitted && (
                    <div className='w-100 d-flex justify-content-center'>
                        <form onSubmit={this.enquirySubmitApi} aria-label="enquiry form" className="my-2 enquiry-form rounded" method="post" id={"enquiryForm"} data-testid="form">
                            <div className={"enquiry-form-header"} aria-label="enquiry form header">
                                <h1>REQUEST FORM</h1>
                            </div>
                            <div className="enquiry-form-content d-flex flex-column justify-content-around" aria-label="enquiry form questions section">
                                <label className="mt-2" htmlFor="industry">Which industry are you in? (Required)</label>
                                <input type="text" id="industry" name="industry" required minLength={"1"} maxLength={"50"} data-testid="industry" />

                                <label className="mt-2" htmlFor="business">What is your business name? (Required)</label>
                                <input type="text" id="business" name="business" required minLength={"1"} maxLength={"50"} data-testid="business" />

                                <label className="mt-2" htmlFor="email">What is your email address? (Required)</label>
                                <input type="email" id="email" name="email" required minLength={"1"} maxLength={"50"} data-testid="email" />

                                <div className="form-check mt-2" aria-label="co2 target checkbox">
                                    <input className="form-check-input" type="checkbox" value="" id="co2" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">CO2 Emissions</label>
                                </div>
                                <div className="form-check" aria-label="spending target chechbox">
                                    <input className="form-check-input" type="checkbox" value="" id="spending" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Spending</label>
                                </div>
                                <div className="form-check" aria-label="energy target checkbox">
                                    <input className="form-check-input" type="checkbox" value="" id="energy" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Energy Use</label>
                                </div>
                                <div className="form-check" aria-label="technology checkbox">
                                    <input className="form-check-input" type="checkbox" value="" id="technology" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Technology Insights</label>
                                </div>
                            </div>

                            <label htmlFor={"enquiryCommentSection"} className="enquiry-form-comment-section-label mt-3">Would you like to ask any questions? (Optional)</label>
                            <input type={"text"} className={"enquiry-form-comment-section"} id={"enquiryCommentSection"}></input>
                            <div className="w-100 d-flex justify-content-center">
                                <button type="submit" role="button" className={"btn btn-primary my-3"} aria-label="submit enquiry form button">Submit</button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            <BottomFooter />
    </div>
    }

}

export default LandingPage;