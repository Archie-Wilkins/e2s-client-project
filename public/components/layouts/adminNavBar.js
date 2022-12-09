import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import React from 'react';

// React Icons
import { FaHandshake } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";


class adminNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return <div>
            <div className="navbarContainer blueBackground fixed-top"  aria-label="navigational bar">
                <div className="navbarContent">

                    <Link className="w-100 navbarLink d-flex justify-content-center" href="/admin/dashboard"  aria-label="go home link">
                        <h1 data-testid="admin-logo" className='whiteText'>E<span className='accentText'>2</span>S</h1>
                    </Link>

                    <hr className="navbarLineBreak"></hr>

                    <Link className="navbarLink d-flex align-items-center " href="/admin/dashboard" aria-label="go to dashboard link">
                        <FaTachometerAlt />
                        <p>Dashboard</p>
                    </Link>

                    <Link className=" navbarLink d-flex align-items-center" href="/admin/onboarding" aria-label="go to onboarding page link">
                        <FaHandshake />
                        <p>Onboarding</p>
                    </Link>

                    <Link className=" navbarLink d-flex align-items-center" href="/admin/organisations" aria-label="go to organisations page link">
                        <FaHouseUser />
                        <p>Organizations</p>
                    </Link>

                    <Link className=" navbarLink d-flex align-items-center" href="/admin/users" aria-label="view users page link">
                        <FaUsers />
                        <p>Users</p>
                    </Link>

                    <hr className="navbarLineBreak align-items-center"></hr>

                    <div aria-label="current user name section">
                        <p className='whiteText m-0'>Signed in as:</p>
                        <p className='whiteText m-0' data-testid="loggedUser">Dan Schnee</p>
                    </div>

                </div>
            </div>
        </div >
    }

}

export default adminNavBar