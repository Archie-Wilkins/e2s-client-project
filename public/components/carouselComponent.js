import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {Router} from "next/router";

class CarouselComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 1,
        };
    }

    handleScroll = async (event) => {
        window.scrollTo(0, 1140);
    }

    handleCarouselUpdateNext = async (event) => {
        if(this.state.activeSlide != 3){
            this.setState({activeSlide: this.state.activeSlide+1});
        }else{
            this.setState({activeSlide: 1});
        }
        console.log(this.state.activeSlide);
    }

    handleCarouselUpdatePrev = async (event) => {
        if(this.state.activeSlide != 1){
            this.setState({activeSlide: this.state.activeSlide-1});
        }else{
            this.setState({activeSlide: 3});
        }
        console.log(this.state.activeSlide);
    }

    handleCarouselUpdate1 = async (event) => {
        this.setState({activeSlide: 1});
    }

    handleCarouselUpdate2 = async (event) => {
        this.setState({activeSlide: 2});
    }

    handleCarouselUpdate3 = async (event) => {
        this.setState({activeSlide: 3});
    }

    render() {
        return <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
        
        <div className="carousel-inner">
            {this.state.activeSlide === 1 &&(
                <div>
                <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active"
                        aria-current="true" aria-label="Slide 1" onClick={this.handleCarouselUpdate1} id="slide1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                        aria-label="Slide 2" onClick={this.handleCarouselUpdate2} id="slide2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                        aria-label="Slide 3" onClick={this.handleCarouselUpdate3}></button>
                </div>
                <div className="carousel-item active" data-bs-interval="2000">
                <div className={"carousel-content-box"}>
                    <h1>Welcome to E2S!</h1>
                    <h1>Take control over your energy today.</h1>
                    <button className={"carousel-button"} onClick={this.handleScroll}>ENQUIRE</button>
                </div>
                <div className={"landing-carousel-1"}/>
            </div>
            </div>

            )}
            {this.state.activeSlide === 2 &&(
                <div>
                    <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                        aria-current="true" aria-label="Slide 1" onClick={this.handleCarouselUpdate1} id="slide1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                        aria-label="Slide 2" onClick={this.handleCarouselUpdate2} id="slide2" className='active'></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                        aria-label="Slide 3" onClick={this.handleCarouselUpdate3}></button>
                </div>
                <div className="carousel-item active" data-bs-interval="2000">
                <div className={"carousel-content-box"}>
                    <h1>Want to save money?</h1>
                    <h1>Need help reducing your CO2 emissions?</h1>
                    <button className={"carousel-button"} onClick={this.handleScroll}>ENQUIRE</button>
                </div>
                <div className={"landing-carousel-2"}/>
            </div>
            </div>
            )}
            {this.state.activeSlide === 3 &&(
                <div>
                    <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                        aria-current="true" aria-label="Slide 1" onClick={this.handleCarouselUpdate1} id="slide1"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                        aria-label="Slide 2" onClick={this.handleCarouselUpdate2} id="slide2"></button>
                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" className='active'
                        aria-label="Slide 3" onClick={this.handleCarouselUpdate3}></button>
                </div>
                <div className="carousel-item active">
                <div className={"carousel-content-box"}>
                    <h1>Time to switch off the lights?</h1>
                    <h1>Want your energy usage insights? </h1>
                    <button className={"carousel-button"} onClick={this.handleScroll}>ENQUIRE</button>
                </div>
                <div className={"landing-carousel-3"}/>
            </div>
            </div>
            )}
            
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev" onClick={this.handleCarouselUpdatePrev}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next" onClick={this.handleCarouselUpdateNext}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
    }
    
}

export default CarouselComponent;
