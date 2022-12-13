import Link from "next/link"
import MainLayout from "../../public/components/layouts/mainLayoutShell.js"
import React from 'react';
import Cookies from "js-cookie";


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

    // Funtion used to validate user priveleges from the login page and remove cookies. It is also used to initialise data on the page.
    async componentDidMount() {
        //will check user is allowed on this page first
        // Attempt to parse a user cookie
        try {
            //Get the user cookie
            let userCookieEncypted = Cookies.get().user;

            //import CryptoJS
            var CryptoJS = require("crypto-js");

            //decrypt the cookie
            var bytes = CryptoJS.AES.decrypt(userCookieEncypted, 'team4');
            //store decrypted cookie in userCookie
            var userCookie = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            // If the user has the incorrect credentials for the page, remove them
            if (userCookie.role === 4) {
                Cookies.remove("user");
                window.location = "/login";
            }

            //catch errors
        } catch (e) {
            // No cookie found
            //return to login
            window.location = "/login";
        }

    };

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
