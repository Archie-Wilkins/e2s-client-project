import Link from "next/link"
import MainLayout from "../../public/components/mainLayoutShell.js"
import React from 'react';


class Onboarding extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'Onboarding',
            //Need to change this to get this 
            //infomation from API

            //Would be ideal to store these in some sort of cookie or global variable
            //if these are not present then the nav bar will default to standard ESM nav bar 
            isAdmin: true,
        };
    }

    render() {
        return <div>
            <h1>onboarding</h1>
        </div >
    }

}

export default Onboarding
