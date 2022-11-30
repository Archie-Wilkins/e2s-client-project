import React from 'react';
import emailjs from 'emailjs-com';

export default function ResetPasswordEmail() {

    //email: e2s.noreply@gmail.com
    //password: example123!
    function sendEmail(e) {
        e.preventDefault();    //This is important, i'm not sure why, but the email won't send without it

        emailjs.sendForm('service_vhvmdc2', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_USER_ID')
            .then((result) => {
                window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior)
            }, (error) => {
                console.log(error.text);
            });
    }

    return (
        <form>
            <h1>Password Reset</h1>
            <div>You have recently submitted a request to reset password, if you did not request this ignore this email</div>
            <h2>Here is your code</h2>
            <p>casdaf</p>
        </form>
    );
}