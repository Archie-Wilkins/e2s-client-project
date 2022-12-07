import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
//import Cookies from 'universal-cookie';
import { useState } from 'react';
import Cookies from 'js-cookie';
import profilePic from '../public/resources/profilePic.png';



class AccountView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userID: ""
        };
    }

    loginSubmitApi = async (event) => {

    }

    forgotPassword = (event) => {
        window.location = "/forgotPassword";
    }

    render() {
        return <div className="loginBackground" aria-label="account page">
            <div className="account-container" aria-label="account page content">
                <h2>Account</h2>
                <div className="line"></div>
                <div className="account-profile-picture-container">
                    <img style={{width: "150px", height: "150px"}} src={"/_next/static/media/profilePic.fd0cd22e.png"}/>
                    {/*<img src={profilePic}/>*/}
                </div>
                {/*<img>sample profile picture</img>*/}
                <button>logout</button>
            </div>

        </div>
    }
}

export default AccountView;
