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


    const test = [["help","no"],["ok","why"]];

    let fullTests = test.map(function(element){
        return `${element.at(0)} ${element.at(1)}`;
    })
    console.log(fullTests);

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
        <div>
            <form onSubmit={csvHandler} method={"post"}>
                <button type={"submit"}>CLICK</button>
            </form>
            <input type="file" id="uploadfile" onSubmit={csvHandler}/>
        </div>

        <div className={"landingBody"}>
            <h1>About Us</h1><br/>
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
                    <h2>First slide label</h2>
                    <p>Some representative placeholder content for the first slide.</p>
                </div>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
                <div className={"landing-carousel-2"}/>
                <div className="carousel-caption d-none d-md-block">
                    <h2>Second slide label</h2>
                    <p>Some representative placeholder content for the second slide.</p>
                </div>
            </div>
            <div className="carousel-item">
                <div className={"landing-carousel-3"}/>
                <div className="carousel-caption d-none d-md-block">
                    <h2>Third slide label</h2>
                    <p>Some representative placeholder content for the third slide.</p>
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

// This gets called on every request
/*export async function getServerSideProps() {

    return {props: {example: "Test"}};
}*/



export default HomePage
