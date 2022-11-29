import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {Router} from "next/router";


class CarouselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleScroll = async (event) => {
        window.scrollTo(0, 1140);
    }

    render() {
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
                <div className={"carousel-content-box"}>
                    <h1>Are you a site manager?</h1>
                    <h1>Need help reducing your energy usage?</h1>
                    <button className={"carousel-button"} onClick={this.handleScroll}>ENQUIRE</button>
                </div>
                <div className={"landing-carousel-1"}/>
            </div>
            <div className="carousel-item" data-bs-interval="2000">
                <div className={"carousel-content-box"}>
                    <h1>Want to save money?</h1>
                    <h1>Need help reducing your CO2 emissions?</h1>
                    <button className={"carousel-button"} onClick={this.handleScroll}>ENQUIRE</button>
                </div>
                <div className={"landing-carousel-2"}/>
            </div>
            <div className="carousel-item">
                <div className={"carousel-content-box"}>
                    <h1>Time to switch off the lights?</h1>
                    <h1>Want your energy usage insights? </h1>
                    <button className={"carousel-button"} onClick={this.handleScroll}>ENQUIRE</button>
                </div>
                <div className={"landing-carousel-3"}/>
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
    
}

export default CarouselComponent;
