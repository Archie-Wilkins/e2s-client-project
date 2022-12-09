import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import React from 'react';
import AdminNavBar from "./adminNavBar";
import NavBar from "./navBar";
class MasterNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    displayNavBar = () => {
        if (this.props.isAdmin) {
            return <AdminNavBar />
        }
        else {

            return <NavBar isDirector={this.props.isDirector || false} />;
        }
    }

    render() {
        return <div>
            {this.displayNavBar()}
        </div >
    }

}


export default MasterNavBar