import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Cookies from 'universal-cookie';


class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
            password:""
        };
    }

    loginSubmitApi = async (event) => {

        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        this.state.email = event.target.email.value;
        this.state.password = event.target.password.value;

        //sets variables for validation
        // 0 = valid
        var validEmail = 0;
        var validPassword = 0;

        // if email not valid
        if (!(this.state.email.includes("@") && this.state.email.includes(".")))
        {
            validEmail = 1;// 1 = invalid, email variable is invalid
        }

        //if no password has been entered
        if (this.state.password.length === 0) {
            validPassword = 1; //password variable is invalid
        }

        //if both email and password is invalid
        if (validEmail === 1 && validPassword === 1){
            document.getElementById("error").innerText = "Invalid credentials";
            document.getElementById("error").style.display = "block"; //displays error msg
            return;
        }

        //if only email is invalid
        if (validEmail === 1){
            document.getElementById("error").innerText = "Invalid email";
            document.getElementById("error").style.display = "block";
            return;
        }

        //if only password invalid (not entered anything)
        if (validPassword === 1){
            document.getElementById("error").innerText = "Invalid password";
            document.getElementById("error").style.display = "block";
            return;
        }

        //hides error msg if validation is passed
        document.getElementById("error").style.display = "none";

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
        const result = await response.json();

        //if server retuns JSON "unsuccessfulLogin" means login attempt has failed
        if(result.data.toString() === "unsuccessfulLogin") {
            //shows login was unsuccessful
            document.getElementById("error").innerText = "password or email is incorrect";
            document.getElementById("error").style.display = "block";
            return;
        } else {
            //else means login was successful
            //creates session via cookie which holds user ID in 'result.data'
            const cookies = new Cookies();
            cookies.set('user', result.data, { path: '/' });
            //will relocate to dashboard, currently just index/home page
            window.location = "/";
        }
    }



    render() {
        return<div>
            <div className="LoginPanelContainer">
                <div className="LoginPanelBanner">
                    <h2 className="LoginHeader">Sign In</h2>
                </div>

                <form className="LoginForm" onSubmit={this.loginSubmitApi}>
                    <div className="TextInputValue">Email</div>
                    <input type="email" id="email" name="email" className="TextInputBox"></input>
                    <div className="TextInputValue">Password</div>
                    <input type="password" id="password" name="password" className="TextInputBox"></input>
                    <div className="ErrorTextHolder"><div className="ErrorText" id="error">Invalid credentials</div></div>
                    <div><button className="LoginButton" name="submit" type="submit">Login</button></div>
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