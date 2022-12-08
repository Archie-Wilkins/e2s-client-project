import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRouter} from 'next/router'
import React from "react";
import Cookies from "js-cookie";

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
        Cookies.remove("user");
        window.location = "/login";
    }


    render() {
        return <div className="loginBackground" aria-label="account page">
            <div className="account-container" aria-label="account page content">
                <h2>Account</h2>
                <div className="line"></div>
                <div className="account-profile-picture-container" aria-label="account profile picture">
                    <img style={{width: "150px", height: "150px"}} src={"/_next/static/media/profilePic.fd0cd22e.png"}/>
                    {/*<img src={profilePic}/>*/}
                </div>
                {/*<img>sample profile picture</img>*/}
                <button onClick={this.logout} aria-label="logout button">logout</button>
            </div>

        </div>
    }
}

export default AccountPage