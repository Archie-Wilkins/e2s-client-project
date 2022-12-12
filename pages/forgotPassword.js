import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Cookies from 'universal-cookie';
import emailjs from 'emailjs-com';
import {isString} from "next/dist/build/webpack/plugins/jsconfig-paths-plugin";
import Link from "next/link"

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:"",
            email:""
        };
    }

    submitEmail = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        try {
            this.state.email = event.target.email.value
        } catch(e){
            //jest hates event target values so will throw an error
            this.state.email = document.getElementById("email").value
        }


        // if email not valid
        if (!(this.state.email.includes("@") && this.state.email.includes(".")))
        {
            document.getElementById("error").innerText = "Invalid email";
            document.getElementById("error").style.display = "block"; //displays error msg
            return;
        }
        //hides error msg if validation is passed
        document.getElementById("error").style.display = "none";

        // Get data from the form.

        const data = {
            email: this.state.email
        }


        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = '/api/authentication/checkUserExistsFromEmail';

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

        //wrapping API and emial in try catch for Jest
        try {
            // Send the form data to our forms API on Vercel and get a response.
            const response = await fetch(endpoint, options)

            // Get the response data from server as JSON.
            const result = await response.json();

            if(result.data.message.toString() === "email not found"){
                document.getElementById("error").innerText = "User not registered";
                document.getElementById("error").style.display = "block"
                return;
            }
            //saves userID to state
            this.state.userID = result.data.user.toString();


            if(result.data.message.toString() === "email found") {
                //user was found in database from the email

                // creates data structure which contains userID
                const data = {
                    userID: this.state.userID
                }
                // Send the data to the server in JSON format.
                const JSONdata = JSON.stringify(data);
                const endpoint = '/api/authentication/generateResetCode';
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSONdata,
                }
                //sends API request to generate a code for UserID
                const response = await fetch(endpoint, options)
                const result = await response.json();

                //has generated code

                //if server failed to generated code
                if(result.data.message.toString() === "fail"){
                    //code generation failed
                    //display appropriate error message
                    document.getElementById("error").innerText = "Internal server error while generating code";
                    document.getElementById("error").style.display = "block"; //displays error msg
                    return;
                }

                //formats data to be sent off
                const emailContent = {
                    email: event.target.email.value,
                    code: result.data.code.toString(),
                }
                //sends email
                emailjs.send('service_vhvmdc2', 'template_st6zi62', emailContent, 'V_nH2nvFeD1k31Dpg')
                    .then((result) => {
                        document.getElementById("page1").style.display = "none";
                        document.getElementById("page2").style.display = "flex";
                    }, (error) => {
                        document.getElementById("error").innerText = "error sending off email";
                        document.getElementById("error").style.display = "block";
                    });

            } else {
                //shows user was not found in database from email entered
                document.getElementById("error").innerText = "this email is not registered here";
                document.getElementById("error").style.display = "block";
                return;
            }
        } catch (e) {
            //catches any error from API or sending email
            //made because Jest throws errors with API's
            document.getElementById("error").innerText = "Internal server error";
            document.getElementById("error").style.display = "block";
        }

    }

    submitCode = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        const code = document.getElementById("code").value;

        //if no code has been entered, display message
        if(code === ""){
            document.getElementById("error2").innerText = "no code has been entered";
            document.getElementById("error2").style.display = "block";
            return;
        }

        //API call to compare code entered with records code via UserID

        const data = {
            userID: this.state.userID,
            code: code
        }
        try {
            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data);
            const endpoint = '/api/authentication/checkResetCode';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            }
            //sends API request to generate a code for UserID
            const response = await fetch(endpoint, options)
            const result = await response.json();

            //if code matches code from database
            if(result.data.message.toString() === "match"){
                //go to next step/page
                document.getElementById("page2").style.display = "none";
                document.getElementById("page3").style.display = "flex";
            } else {
                //code entered did not match
                document.getElementById("error2").innerText = "incorrect code";
                document.getElementById("error2").style.display = "block";
                return;
            }
        } catch (e) {
            //catches server error from API -- mainly for Jest testing
            document.getElementById("error2").innerText = "Internal server error";
            document.getElementById("error2").style.display = "block";
        }
    }

    submitNewPassword = async (event) => {
        //stop the form from submitting and refreshing the page.
        event.preventDefault();

        //passing textbox values to const's
        const password1 = document.getElementById("password1").value;
        const password2 = document.getElementById("password2").value;

        //checks user entered a value into field 1
        if(password1 === ""){
            document.getElementById("error3").innerText = "enter a password";
            document.getElementById("error3").style.display = "block";
            return;
        }

        //check both fields match
        if(!(password1 === password2)){
            document.getElementById("error3").innerText = "make sure passwords match";
            document.getElementById("error3").style.display = "block";
            return;
        }

        //if both fields match, call API to change password of userID

        try {
            //creates data const to hold userID and password
            const data = {
                userID: this.state.userID,
                password: password1
            }
            // Send the data to the server in JSON format.
            const JSONdata = JSON.stringify(data);
            const endpoint = '/api/authentication/updateUserPassword';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata,
            }
            //sends API request to update user password
            const response = await fetch(endpoint, options)
            const result = await response.json();

            //if the API request failed
            if(result.data.message.toString() === "fail"){
                document.getElementById("error3").innerText = "server error, please try again";
                document.getElementById("error3").style.display = "block";
                return;
            }

            //relocates to login page
            window.location = "/login";
        } catch (e) {
            //catches error with API
            //in jest this means that validation has been passed and the app intended to
            // send off the data to server
            document.getElementById("error3").innerText = "API error, please try again";
            document.getElementById("error3").style.display = "block";
        }

    }

    //this event is for a user incase they didn't recieve an email
    resendCode = async (event) => {
        const data = {
            userID: this.state.userID
        }
        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/authentication/generateResetCode';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        //sends API request to generate a code for UserID
        const response = await fetch(endpoint, options)
        const result = await response.json();

        //if server failed to generated code
        if(result.data.message.toString() === "fail"){
            //code generation failed
            //display appropriate error message
            document.getElementById("error").innerText = "Internal server error while generating code";
            document.getElementById("error").style.display = "block"; //displays error msg
            return;
        }

        //formats data to be sent via email
        const emailContent = {
            email: this.state.email,
            code: result.data.code.toString(),
        }
        //emailjs to send email
        emailjs.send('service_vhvmdc2', 'template_st6zi62', emailContent, 'V_nH2nvFeD1k31Dpg')
            .then((result) => {
                //if successful display "new code sent"
                document.getElementById("infoText").innerText = "New code sent";
                document.getElementById("infoText").style.display = "block";
                document.getElementById("error3").style.display = "none";
            }, (error) => {
                //if fails display "Error occured while sending email"
                document.getElementById("error3").innerText = "Error occured while sending email";
                document.getElementById("error3").style.display = "block";
                document.getElementById("infoText").style.display = "none";
            });
    }

    render() {
        return<div className="loginBackground" aria-label="forgot password page content">
            {/*send code to email*/}
            <div className="loginPanelContainer" id="page1" data-testid="page1" aria-label="forgot password form section">
                <div className="forgotPasswordPanelBanner" aria-label="forgot password form header">
                    <h2 className="loginHeader">Reset Password</h2>
                </div>
                <div className="forgotPasswordFormContainer">
                    <form className="forgotPasswordForm" onSubmit={this.submitEmail} data-testid="email-form" aria-label="forgot password form">
                        <div className="textInputValue">Email</div>
                        <input type="email" id="email" name="email" aria-label="email input box" className="textInputBox" data-testid="email"></input>
                        <div className="errorTextHolder"><div className="errorText" id="error" data-testid="email-error">sample error text</div></div>
                        <div><button className="loginButton" name="submit" type="submit" aria-label="submit forgot password request">send code</button></div>
                    </form>

                </div>
            </div>
            {/*enter code*/}
            <div className="loginPanelContainer displayNone" id="page2" aria-label="forgot password code confirmation page">
                <div className="forgotPasswordPanelBanner" aria-label="forgot password form header">
                    <h2 className="loginHeader">Reset Password</h2>
                </div>
                <div className="textInputValue">Your email should have recieved a code</div>
                <div className="forgotPasswordFormContainer">
                    <form className="forgotPasswordForm" onSubmit={this.submitCode} data-testid="code-form">
                        <div className="textInputValue" aria-label="confirmation code section">Code</div>
                        <input  id="code" name="code" className="textInputBox"  data-testid="code"></input>
                        <div className="errorTextHolder"><div className="errorText" id="error2" data-testid="code-error"></div></div>
                        <div><button className="loginButton" name="submit" type="submit">submit code</button></div>
                    </form>
                    <div className="errorTextHolder"><div className="infoText" id="infoText">email result</div></div>
                    <div className="helpTextContainer margin-top-20px">
                        <div className="textInputValue">have not recieved a code?
                            <div className="textInputValue resendEmailText" onClick={this.resendCode}>send another</div>
                        </div>
                    </div>
                </div>


            </div>
            {/*enter new password*/}
            <div className="loginPanelContainer displayNone" id="page3" aria-label="create a new password page">
                <div className="forgotPasswordPanelBanner" aria-label="forgot password form header">
                    <h2 className="loginHeader">Reset Password</h2>
                </div>
                <div className="forgotPasswordFormContainer" aria-label="create a new password form section">
                    <form className="forgotPasswordForm" onSubmit={this.submitNewPassword} data-testid="password-form" aria-label="create a new password form">
                        <div className="textInputValue">Password</div>
                        <input type="password" id="password1" name="password1" className="textInputBox" data-testid="password1" aria-label="enter new password box"></input>
                        <div className="errorTextHolder"/>
                        <div className="textInputValue">Confirm Password</div>
                        <input type="password" id="password2" name="password2" className="textInputBox" data-testid="password2" aria-label="confirm new password box"></input>
                        <div className="errorTextHolder"><div className="errorText" id="error3" data-testid="password-error"></div></div>
                        <div><button className="loginButton" name="submit" type="submit" aria-label="submit new password button">submit</button></div>
                    </form>
                </div>
            </div>
        </div>
    }
}

export default ForgotPassword;