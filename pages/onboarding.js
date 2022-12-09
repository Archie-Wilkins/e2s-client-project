import Link from "next/link"
import OnboardingBuilder from "../public/components/onboarding/onboardingBuilder.js"
import React from 'react';


class OnboardingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // onboardingBuilder: new OnboardingBuilder()
        };
    }

    render() {
        return <div className="root">
            <div className="blueBackground w-100 h-100">
                <h1>E2S</h1>
                <h1>E2S</h1>
                <h1>E2S</h1>

            <div className="onboardingLogo">
                <h1>E2S</h1>
            <div className="onboardingCentreTab">
            </div>
            </div>
            </div>


        </div>
    }
}

export default OnboardingPage;