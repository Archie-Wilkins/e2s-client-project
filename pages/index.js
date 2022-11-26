import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from "next/router";
import React, {useEffect, useState} from "react";
import Script from "next/script";

let userIndustry, userBusiness, userEmail, userComments, userCo2, userSpending, userEnergy,
    userTechnology = "";

function HomePage() {

    /*const co2Check = document.getElementById('co2');
    const spendingCheck = document.getElementById('spending');

    co2Check.addEventListener('click', function handleClick() {
        if(co2==="no"){
            co2Var = "yes";
        }else if(co2==="yes"){
            co2Var = "no";
        }else{
            //default it
            co2Var = "no";
        }
    });
    spendingCheck.addEventListener('click', function handleClick() {
        if(spendingVar==="no"){
            spendingVar = "yes";
        }else if(spendingVar==="yes"){
            spendingVar = "no";
        }else{
            //default it
            spendingVar = "no";
        }
    });*/
    const [count, setCount] = useState(0);

    const [formSubmitted, setSubmitted] = useState(false)

    const ab = "";
    const handleFormSubmitted = (e) => {
        !formSubmitted ? setSubmitted(true) : setSubmitted(false)
    }

    const handleSubmit = async (event) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            industry: event.target.industry.value,
            business: event.target.business.value,
            email: event.target.email.value,
            questions: event.target.enquiryCommentSection.value,
            co2: JSON.stringify(event.target.co2.checked),
            spending: JSON.stringify(event.target.spending.checked),
            energy: JSON.stringify(event.target.energy.checked),
            technology: JSON.stringify(event.target.technology.checked),
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data)

        // API endpoint where we send form data.
        const endpoint = '/api/enquiryForm'

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
        const result = await response.json()
        handleFormSubmitted();
        userIndustry = result.data.industry;
        userEmail = result.data.email;
        userBusiness = result.data.business;
        userComments = result.data.comments;
        userEnergy = result.data.energy;
        userCo2 = result.data.co2;
        userSpending = result.data.spending;
        userTechnology = result.data.technology;
        //alert(`Your enquiry has been sent from ` + userEmail)
        //window.location.reload()
    }

    const handleReset = async (event) => {
        window.scrollTo(0,0);
        window.location.reload();
    }

    const csvHandler = async (event) => {
        event.preventDefault();
        const endpoint = '/api/csvUpload'

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        console.log(`Your enquiry has been sent: ${result.data}`);
    }

    /*const test = [["help","no"],["ok","why"]];

    let fullTests = test.map(function(element){
        return `${element.at(0)} ${element.at(1)}`;
    })
    console.log(fullTests);*/


    return <div className={"landing-pge"}>

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">E2S</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        <a className="nav-link" href="/contact">Contact Us</a>
                        <a className="nav-link" href="/about">About Us</a>
                        <a className={"nav-link"} href={"/account"}>Account</a>
                    </div>
                </div>
            </div>
        </nav>

        <Carousel/>

        <div className={"landingBody"}>
            <h1>About Us</h1><br/>
            <hr className={"underline-style"}/>
            <Accordion/><br/>
            <h1>Enquire</h1>
            <hr className={"underline-style"}/>
            <p>Tell us about your site and your goals.</p>

            {formSubmitted === true && (
                <div className={"enquiry-form"}>
                    <div className={"enquiry-form-header"}>
                        <h1>REQUEST FORM</h1>
                    </div>
                    <div className={"enquiry-form-content"}>
                        <br/>
                        <label>Industry: {userIndustry}</label>
                        <br/>
                        <label>Business: {userBusiness}</label>
                        <br/>
                        <label>Email: {userEmail}</label>
                        <br/>
                        <label>Comments: {userComments}</label>
                        <br/>
                        <h2>Goals</h2>
                        <br/>
                        {userCo2 === "true" && (
                            <label>CO2</label>
                        )}
                        {userSpending === "true" && (
                                <label>Spending</label>
                        )}
                        {userEnergy === "true" && (
                                <label>Energy</label>
                        )}
                        {userTechnology === "true" && (
                                <label>Technology</label>
                        )}

                    </div>
                    <button onClick={handleReset} className={"enquiry-form-submit-button"}>BACK</button>
                </div>
            )}
            {!formSubmitted && (
                <form onSubmit={handleSubmit} className={"enquiry-form"} method="post" id={"enquiryForm"}>
                    <div className={"enquiry-form-header"}>
                        <h1>REQUEST FORM</h1>
                    </div>
                    <div className={"enquiry-form-content"}>
                        <label htmlFor="industry">Which industry are you in? (Required)</label>
                        <br/>
                        <input type="text" id="industry" name="industry" required minLength={"1"} maxLength={"50"}/>
                        <br/><br/>
                        <label htmlFor="business">What is your business name? (Required)</label>
                        <br/>
                        <input type="text" id="business" name="business" required minLength={"1"} maxLength={"50"}/>
                        <br/><br/>
                        <label htmlFor="email">What is your email address? (Required)</label>
                        <br/>
                        <input type="text" id="email" name="email" required minLength={"1"} maxLength={"50"}/>

                        <br/><br/>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="co2" onClick={() => setCount(count+1)}/>
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
    </div>

}

function Carousel(){
    return <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"
                    aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="2000">
                <h1>Are you a site manager?</h1>
                <button className={"carousel-button"}>ENQUIRE</button>
                <div className={"landing-carousel-1"}/>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
                <h1>Are you a site manager?</h1>
                <div className={"landing-carousel-2"}/>
                <div className="carousel-caption d-none d-md-block">
                    <button className={"carousel-button"}>ENQUIRE</button>
                </div>
            </div>
            <div className="carousel-item">
                <div className={"landing-carousel-3"}/>
                <div className="carousel-caption d-none d-md-block">
                    <h2 className={"carousel-content-dark"}>Third slide label</h2>
                    <p className={"carousel-content-dark"}>Some representative placeholder content for the third slide.</p>
                </div>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
}

function Accordion(){
    return <div className="accordion" id="accordionExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Who Are We?
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>We are E2S,</strong> a service as a platform to offer you a variety of tools to manage your energy usage.
                    We support work sites in tracking all of their usage metrics, their spending, and their CO2 emissions. Our bespoke solution offers Directors and Site Managers in-depth reports on where their money is going.
                    We offer forecasting data and predictions about where your energy usage is taking you and where you could be heading.
                    You can set targets and we will offer you the best advice and planning to meet them.
                    We offer new technology and feedback based on what will work best for you site!
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    What Do We Do?
                </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    We assist large sites across the UK in managing their energy use and taking control of their finances.
                    Through our forecasting, insights, and recommendations, we help companies to reduce their emissions and increase their
                    efficiency.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    What Can We Do For You?
                </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    We can help your site to become its best version. With our analysis suite of tools,
                    you will be on the road to saving money and saving the environment.
                    <br/><br/><strong>Start today!</strong>
                </div>
            </div>
        </div>
    </div>
}


// This gets called on every request
/*export async function getServerSideProps() {

    return {props: {example: "Test"}};
}*/



export default HomePage
