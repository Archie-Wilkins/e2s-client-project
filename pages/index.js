import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.css'
import {Router} from "next/router";
import React, {useEffect, useState} from "react";


function HomePage() {
    const handleSubmit = async (event) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault()

        // Get data from the form.
        const data = {
            industry: event.target.industry.value,
            business: event.target.business.value,
            email: event.target.email.value,
            questions: event.target.questions.value,
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
        alert(`Your enquiry has been sent: ${result.data}`)
        window.location.reload()
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

    return <div>

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
            <Accordion/>
            <h1>Enquire</h1>
            <form onSubmit={handleSubmit} method="post">
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
                <label htmlFor="questions">Do you have any general questions or comments? (Optional)</label>
                <br/>
                <input type="text" id="questions" name="questions" minLength={"1"} maxLength={"50"}/>
                <br/><br/>
                <button type="submit">Submit</button>
            </form>
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
                <div className={"landing-carousel-1"}/>
                <div className="carousel-caption d-none d-md-block">
                    <h2 className={"carousel-content"}>First slide label</h2>
                    <p className={"carousel-content"}>Some representative placeholder content for the first slide.</p>
                </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
                <div className={"landing-carousel-2"}/>
                <div className="carousel-caption d-none d-md-block">
                    <h2 className={"carousel-content"}>Second slide label</h2>
                    <p className={"carousel-content"}>Some representative placeholder content for the second slide.</p>
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
                    Accordion Item #1
                </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse
                    plugin adds the appropriate classes that we use to style each element. These classes control the
                    overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of
                    this with custom CSS or overriding our default variables. It's also worth noting that just about any
                    HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default, until the
                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                    modify any of this with custom CSS or overriding our default variables. It's also worth noting that
                    just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit
                    overflow.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                 data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default, until the
                    collapse plugin adds the appropriate classes that we use to style each element. These classes
                    control the overall appearance, as well as the showing and hiding via CSS transitions. You can
                    modify any of this with custom CSS or overriding our default variables. It's also worth noting that
                    just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit
                    overflow.
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
