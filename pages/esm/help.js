import Link from "next/link"
import MainLayout from "../../public/components/layouts/mainLayoutShell.js"
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
            isAdmin: false,
            isDirector: true,
        };
    }

    render() {
        return <div aria-label="help page">
            <MainLayout isAdmin={this.state.isAdmin} aria-label="navigation bar" isDirector={this.state.isDirector} pageName={this.state.pageName}>
                <div className="d-flex flex-column vh-100 align-items-center mt-5" aria-label="help page content">
                    <h1>Help</h1>
                    <h6 className="whiteBackground rounded w-50 text-center p-4">
                        For help please contact E2S@help.com
                        or call 0000 0000 0000
                    </h6>
                </div>


            </MainLayout >
        </div >
    }

}

export default HelpPage
