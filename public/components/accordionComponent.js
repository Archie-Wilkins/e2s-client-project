import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {Router} from "next/router";


class AcordionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
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
    
}

export default AcordionComponent;