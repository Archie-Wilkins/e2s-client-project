import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRouter} from 'next/router'
import React from "react";
import Cookies from "js-cookie";
import MainLayoutShell from "../../public/components/layouts/mainLayoutShell";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userID: "",
            // Variable to define the user on the page as not a Director for any dynamic components or permissions
            isDirector: true,
            // The page name rendered in the top nav-bar
            pageName: "Account",

        };
    }


    logout = async (event) => {
        //removes user
        Cookies.remove("user");
        window.location = "/login";
    }

    async componentDidMount() {
        //fetch user data from user id from cookie
        try {
            //Get the user cookie
            let userCookieEncypted = Cookies.get().user;

            //import CryptoJS
            var CryptoJS = require("crypto-js");

            //decrypt the cookie
            var bytes = CryptoJS.AES.decrypt(userCookieEncypted, 'team4');
            //store decrypted cookie in userCookie
            var userCookie = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            //store in variable
            const userID = userCookie.user;

            const roleID = userCookie.role

            if (roleID != 2) {
                 window.location = "/login";
            }

            //catch errors
        } catch (e) {
            // No cookie found
            //return to login
            window.location = "/login";
        }
    }


    render() {
        return <div className="loginBackground" aria-label="account page">
            <MainLayout
                isDirector={this.state.isDirector}
                pageName={this.state.pageName}
            >
                <div className="account-container" aria-label="account page content">
                    <h2>Account</h2>
                    <div className="line"></div>
                    <div className="account-profile-picture-container" aria-label="account profile picture"></div>
                    {/*<img>sample profile picture</img>*/}
                    <h3 id="name" aria-label="user's name"></h3>
                    <p id="role" aria-label="user's role">Director</p>
                    <button onClick={this.logout} aria-label="logout button">logout</button>
                </div>
            </MainLayout>
        </div>
    }
}

export default AccountPage