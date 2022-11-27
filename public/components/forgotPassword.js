import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Cookies from 'universal-cookie';
import emailjs from 'emailjs-com';


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:""
        };
    }

    submitEmail = async (event) => {
        // Stop the form from submitting and refreshing the page.
        event.preventDefault();

        this.state.email = event.target.email.value;

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
            email: event.target.email.value
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = '/api/checkUserExistsFromEmail';

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

        if(result.data.toString() === "email found") {
            alert("email exists");
            //user was found in database from the email
            emailjs.sendForm('service_vhvmdc2', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
                .then((result) => {

                }, (error) => {
                    console.log(error.text);
                });
        } else {
            //shows user was not found in database from email entered
            document.getElementById("error").innerText = "this email is not registered here";
            document.getElementById("error").style.display = "block";
            return;
        }
    }



    render() {
        return<div>
            <div className="LoginPanelContainer">
                <div className="LoginPanelBanner">
                    <h2 className="LoginHeader">Sign In</h2>
                </div>

                <form className="LoginForm" onSubmit={this.submitEmail}>
                    <div className="TextInputValue">Email</div>
                    <input type="email" id="email" name="email" className="TextInputBox"></input>
                    <div className="ErrorTextHolder"><div className="ErrorText" id="error">sample error text</div></div>
                    <div><button className="LoginButton" name="submit" type="submit">send code</button></div>
                </form>
            </div>

        </div>
    }
}

export default ForgotPassword;