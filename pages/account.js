import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRouter} from 'next/router'
import React from "react";
import Cookies from "js-cookie";
import profilePic from "../public/resources/profilePic.png"

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userID: ""
        };
    }


    logout = async (event) => {
        //removes user
        Cookies.remove("user");
        window.location = "/login";
    }

    onLoad = async (event) => {
        //fetch user data from user id from cookie

    }


    render() {
        return <div className="loginBackground" aria-label="account page">
            <div className="account-container" aria-label="account page content">
                <h2>Account</h2>
                <div className="line"></div>
                <div className="account-profile-picture-container" aria-label="account profile picture"></div>
                {/*<img>sample profile picture</img>*/}
                <h3 id="name">Ethan Allen-Harris</h3>
                <p id="role">ESM</p>
                <button onClick={this.logout} aria-label="logout button">logout</button>
            </div>

        </div>
    }
}

export default AccountPage