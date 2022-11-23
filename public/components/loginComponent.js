import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import {useState} from 'react';
//import {loginSubmit} from '../../pages/api/login'

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        };
    }


    loginSubmit = (event) => {
        event.preventDefault();
        this.state.email = document.getElementById("email").value;
        this.state.password = document.getElementById("password").value;
        console.log(this.state.email);
        console.log(this.state.password);

        var validEmail = 0;
        var validPassword = 0;


        if (!(this.state.email.includes("@") && this.state.email.includes("."))) // if email not valid
        {
            validEmail = 1;// 1 = invalid
        }

        if (this.state.password.length === 0) { //if no password has been entered
            validPassword = 1;
        }

        if (validEmail === 1 && validPassword === 1){
            document.getElementById("error").innerText = "Invalid credentials";
            document.getElementById("error").style.display = "block";
            return;
        }

        if (validEmail === 1){
            document.getElementById("error").innerText = "Invalid email";
            document.getElementById("error").style.display = "block";
            return;
        }

        if (validPassword === 1){
            document.getElementById("error").innerText = "Invalid password";
            document.getElementById("error").style.display = "block";
            return;
        }

        document.getElementById("error").style.display = "none";


    //    have {this.loginSubmit} in onSubmit= in form

    }

    loginSubmitApi = async (event) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        // Get data from the form.
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = '/api/login';

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
            // Body of the request is the JSON data we created above.
            body: JSONdata,
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        alert(`Your enquiry has been sent: ${result.data}`);
    }



    render() {
        return<div>
    <div className="LoginPanelContainer">
            <div className="LoginPanelBanner">
            <h2 className="LoginHeader">Sign In</h2>
    </div>

        <form className="LoginForm" onSubmit={this.loginSubmitApi}>
            <div className="TextInputValue">Email</div>
            <input type="email" id="email" className="TextInputBox"></input>
            <div className="TextInputValue">Password</div>
            <input type="password" id="password" className="TextInputBox"></input>
            <div className="ErrorTextHolder"><div className="ErrorText" id="error">Invalid credentials</div></div>
            <div><button className="LoginButton" type="submit">Login</button></div>
        </form>
        <div className="HelpArea">
            <div className="HelpText">Dont have an account?</div>
            <div className="HelpTextContainer"><div className="ClickHereText">click here</div><div className="SmallText">to contact our team about joining</div></div>
            <div className="HelpText">Forgot password?</div>
            <div className="HelpTextContainer"><div className="ClickHereText">click here</div><div className="SmallText">to reset your accounts password</div></div>
        </div>
    </div>

    </div>
    }
}

export default LoginComponent;