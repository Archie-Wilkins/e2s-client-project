import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import React from 'react';
import Cookies from "js-cookie";

// React Icons
import { FaHandshake } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";


class adminNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            data: "",
            dataUpdated: false,
        };
    }

    async componentDidMount() {
        try {
            //Get the user cookie
            let userCookieEncypted = Cookies.get().user;
            //import CryptoJS
            var CryptoJS = require("crypto-js");
            //decrypt the cookie
            var bytes = CryptoJS.AES.decrypt(userCookieEncypted, 'team4');
            //store decrypted cookie in userCookie
            var userCookie = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            //get userID from cookie
            let data = { userID: userCookie.user }
            //JSONify it for api
            let JSONdata = JSON.stringify(data);
            let endpoint = '/api/user/getUserDetails';
            let options = { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSONdata, }
            let response = await fetch(endpoint, options)
            let result = await response.json();
            let stringResult = JSON.stringify(result);
            stringResult = stringResult.replace("[", "");
            stringResult = stringResult.replace("]", "");
            result = JSON.parse(stringResult);
            //sets name in state to user records first_name
            this.state.name = result.first_name;
            this.state.data = "";
            this.setState({ data: "" });
            //updates value to make the page render the graph
            this.state.dataUpdated = true;

        } catch (e) {
            //window.location = "/login";
        }
    }

    render() {
        if (!this.state.dataUpdated) {
            return;
        }
        return <div>
            <div className="navbarContainer blueBackground fixed-top"  aria-label="navigational bar">
                <div className="navbarContent">

                    <Link className="w-100 navbarLink d-flex justify-content-center" href="/admin/dashboard"  aria-label="go home link">
                        <h1 data-testid="admin-logo" className='whiteText'>E<span className='accentText'>2</span>S</h1>
                    </Link>

                    <hr className="navbarLineBreak"></hr>

                    <Link className="navbarLink d-flex align-items-center " href="/admin/dashboard" aria-label="go to dashboard link">
                        <FaTachometerAlt />
                        <p>Dashboard</p>
                    </Link>

                    <Link className=" navbarLink d-flex align-items-center" href="/admin/account" aria-label="go to account page link">
                        <FaUserCog />
                        <p>Account</p>
                    </Link>

                    <hr className="navbarLineBreak align-items-center"></hr>

                    <div aria-label="current user name section">
                        <p className='whiteText m-0'>Signed in as:</p>
                        <p className='whiteText m-0' data-testid="loggedUser">{this.state.name}</p>
                    </div>

                </div>
            </div>
        </div >
    }

}

export default adminNavBar