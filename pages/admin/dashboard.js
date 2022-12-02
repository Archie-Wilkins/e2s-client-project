import Link from "next/link"
import MainLayout from "../../public/components/layouts/mainLayoutShell.js"
import React, { useLayoutEffect } from 'react';
import Cookies from 'js-cookie'

class SystemAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'System Admin ',
            //Need to change this to get this 
            //infomation from API
            //Would be ideal to store these in some sort of cookie or global variable
            //if these are not present then the nav bar will default to standard ESM nav bar 
            isAdmin: true,
            isDirector: true,
        };
    }

    checkUser = async (event) => {
        let userCookie

        try {
            userCookie = JSON.parse(Cookies.get().user);
        } catch (e) {
            console.log(e);
        }

        //console.log(userCookie);

        //if user role is not 3, 3 = admin
        if (userCookie.role != 3){
            Cookies.remove('user');
            window.location = "/login";
        }
    }

    render() {
        return <div onLoad={this.checkUser} onMouseEnter={this.checkUser}>
            <MainLayout isAdmin={this.state.isAdmin} isDirector={this.state.isDirector} pageName={this.state.pageName}>
                <div className="whiteBackground mt-5">
                    <h1>System Admin </h1>
                </div>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>
                <h1>System Admin </h1>

            </MainLayout >
        </div >
    }

}

export default SystemAdmin
