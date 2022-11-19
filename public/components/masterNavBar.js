import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import NavBar from ".//navBar.js"
import AdminNavBar from ".//adminNavBar.js"
import React from 'react';

class MasterNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
        };
    }

    displayNavBar = () => {
        if (this.state.isAdmin) {
            return <AdminNavBar />
        }
        else {
            return <NavBar />;
        }
    }

    render() {
        return <div>
            {this.displayNavBar()}
        </div >
    }

}


export default MasterNavBar