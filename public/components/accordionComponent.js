import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {Router} from "next/router";


class AcordionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDropdown: 1
        };
    }

    handleAccordionOpen = async (event) => {
        this.setState({activeDropdown: 1});
    }

    handleAccordionOpen2 = async (event) => {
        this.setState({activeDropdown: 2});
    }

    handleAccordionOpen3 = async (event) => {
        this.setState({activeDropdown: 3});

    }

    render() {
        return <div className="accordion" id="accordionExample" aria-label="accordion content">
            {this.state.activeDropdown === 1 &&(
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne" aria-label="accordion header">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                                onClick={this.handleAccordionOpen}>
                            Who Are We?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body" aria-label="accordion body">
                            <strong>We are E2S,</strong> a service as a platform to offer you a variety of tools to manage your energy usage.
                            We support work sites in tracking all of their usage metrics, their spending, and their CO2 emissions. Our bespoke solution offers Directors and Site Managers in-depth reports on where their money is going.
                            We offer forecasting data and predictions about where your energy usage is taking you and where you could be heading.
                            You can set targets and we will offer you the best advice and planning to meet them.
                            We offer new technology and feedback based on what will work best for you site!
                        </div>
                    </div>
                    <h2 className="accordion-header" id="headingTwo" aria-label="accordion header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                                onClick={this.handleAccordionOpen2}>
                            What Do We Do?
                        </button>
                    </h2>
                    <h2 className="accordion-header" id="headingThree" aria-label="accordion header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                                onClick={this.handleAccordionOpen3}>
                            What Can We Do For You?
                        </button>
                    </h2>
                </div>
            )}
            {this.state.activeDropdown === 2 &&(
                <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne" aria-label="accordion header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                            onClick={this.handleAccordionOpen}>
                        Who Are We?
                    </button>
                </h2>    
                <h2 className="accordion-header" id="headingTwo" aria-label="accordion header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                            onClick={this.handleAccordionOpen2}>
                        What Do We Do?
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse show" aria-labelledby="headingTwo"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body" aria-label="accordion header">
                        We assist large sites across the UK in managing their energy use and taking control of their finances.
                        Through our forecasting, insights, and recommendations, we help companies to reduce their emissions and increase their
                        efficiency.
                    </div>
                </div>
                <h2 className="accordion-header" id="headingThree" aria-label="accordion header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                            onClick={this.handleAccordionOpen3}>
                        What Can We Do For You?
                    </button>
                </h2>
            </div>
            )}
            {this.state.activeDropdown === 3 &&(
                <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne" aria-label="accordion header">
                    <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"
                            onClick={this.handleAccordionOpen}>
                        Who Are We?
                    </button>
                </h2>    
                <h2 className="accordion-header" id="headingTwo" aria-label="accordion header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                            onClick={this.handleAccordionOpen2}>
                        What Do We Do?
                    </button>
                </h2>    
                <h2 className="accordion-header" id="headingThree" aria-label="accordion header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"
                            onClick={this.handleAccordionOpen3}>
                        What Can We Do For You?
                    </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse show" aria-labelledby="headingThree"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body" aria-label="accordion header">
                        We can help your site to become its best version. With our analysis suite of tools,
                        you will be on the road to saving money and saving the environment.
                        <br/><br/><strong>Start today!</strong>
                    </div>
                </div>
            </div>
            )}
    </div>
    }
    
}

export default AcordionComponent;