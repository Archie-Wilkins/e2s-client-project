import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import React from 'react';
import {useState} from 'react';

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



    }



    render() {
        return<div>
    <div className="LoginPanelContainer">
            <div className="LoginPanelBanner">
            <h2 className="LoginHeader">Sign In</h2>
    </div>

        <form action="/login" method="post" className="LoginForm" onSubmit={this.loginSubmit}>
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