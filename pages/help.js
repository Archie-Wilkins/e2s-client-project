import Link from "next/link"
import MainLayout from "../public/components/mainLayoutShell.js"
import React from 'react';


class HelpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'Help',
            //Need to change this to get this 
            //infomation from API

            //Would be ideal to store these in some sort of cookie or global variable
            //if these are not present then the nav bar will default to standard ESM nav bar 
            isAdmin: true,
            isDirector: true,
        };
    }

    render() {
        return <div>
            <MainLayout isAdmin={this.state.isAdmin} isDirector={this.state.isDirector} pageName={this.state.pageName}>
                <div className="whiteBackground mt-5">
                    <h1>Help</h1>
                </div>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>
                <h1>Help</h1>

            </MainLayout >

            <Link href="/contact"><p>Contact-Us Page</p></Link>
        </div >
    }

}

export default HelpPage
