import Link from "next/link"
import 'bootstrap/dist/css/bootstrap.min.css'
import {useRouter} from 'next/router'
import React from "react";
import Cookies from "js-cookie";
import MainLayoutShell from "../../public/components/layouts/mainLayoutShell";

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

    async componentDidMount() {
        //fetch user data from user id from cookie
        try {
            //get JSON being stored in user cookie
            let userCookie = JSON.parse(Cookies.get().user);
            //store in variable
            const userID = userCookie.user;

            //make API request to get role
            let data = {
                userID: userID
            }
            let JSONdata = JSON.stringify(data);
            let endpoint = '/api/user/getUserRole';
            let options = {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSONdata,}
            let response = await fetch(endpoint, options)
            let result = await response.json();
            //if API request failes
            if (result.data.message === "fail") {
                alert("internal sever error occured while fetching user role, redirecting to login page");
                Cookies.remove("user");
                window.location = "/login";
            }

            //fetches role text from HTML
            const roleText = document.getElementById("role");

            //switches resultID returned from API
            switch (result.data.role.toString()) {
                case "1": //if user is an admin
                    roleText.innerText = "Admin";
                    break;
                case "2": //if user is a Director
                    roleText.innerText = "Director";
                    break;
                case "3": //if user is an esm
                    roleText.innerText = "ESM";
                    break;
                default:
                    roleText.innerText = "No Role Found";
            }

            //fetch user name from ID
            endpoint = '/api/user/getUserDetails';
            options = {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSONdata,}
            response = await fetch(endpoint, options)
            result = await response.json();
            let stringResult = JSON.stringify(result);
            stringResult = stringResult.replace("[", "");
            stringResult = stringResult.replace("]", "");
            result = JSON.parse(stringResult);


            //get name HTML element
            document.getElementById("name").innerText = result.first_name + " " + result.last_name;


            //catch errors
        } catch (e) {
            // No cookie found
            //return to login
            window.location = "/login";
        }
    }


    render() {
        return <div className="loginBackground" aria-label="account page">
            <MainLayoutShell>
                <div className="account-container" aria-label="account page content">
                    <h2>Account</h2>
                    <div className="line"></div>
                    <div className="account-profile-picture-container" aria-label="account profile picture"></div>
                    {/*<img>sample profile picture</img>*/}
                    <h3 id="name" aria-label="user's name"></h3>
                    <p id="role" aria-label="user's role"></p>
                    <button onClick={this.logout} aria-label="logout button">logout</button>
                </div>
            </MainLayoutShell>
        </div>
    }
}

export default AccountPage