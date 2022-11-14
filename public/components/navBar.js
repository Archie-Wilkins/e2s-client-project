import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import Image from 'next/image'
import Dashboard from '../images/navbar/dashboard.png'

// React Icons
import { FaCloud } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaListAlt } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { FaBalanceScale } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaUserCog } from "react-icons/fa";



function NavBar() {
    return <div>
        <div className="navbarContainer blueBackground">
            <div className="navbarContent">

                <Link className="w-100 navbarLink d-flex justify-content-center" href="/">
                    <h1 className='whiteText'>E<span className='accentText'>2</span>S</h1>
                </Link>

                <hr className="navbarLineBreak"></hr>

                <Link className="navbarLink d-flex justify-content-center align-items-center " href="/">
                    <FaTachometerAlt />
                <p>Dashboard</p>
                </Link>
                <Link className=" navbarLink d-flex" href="/siteForecasting">
                    <FaCloud />

                <p>Forecastings</p>
                </Link>
                <Link className=" navbarLink d-flex" href="/sitePerformance">

                    <FaChartLine />
                <p>Analysis</p>
                </Link>

                <Link className=" navbarLink d-flex" href="/siteAssets">

                    <FaListAlt />
                <p>Assets</p>
                </Link>

                <Link className=" navbarLink d-flex" href="/viewReports">

                    <FaBook />
                <p>Reports</p>
                </Link>

                <Link className=" navbarLink d-flex" href="/siteCompare">

                    <FaBalanceScale />
                <p>Compare</p>
                </Link>

                <Link className=" navbarLink d-flex" href="/billValidation">


                    <FaDollarSign />
                <p>Validate Bills</p>
                </Link>

                <hr className="navbarLineBreak"></hr>



                <Link className=" navbarLink d-flex" href="/help">

                    <FaRegQuestionCircle />
                <p>Help</p>
                </Link>
                <Link className=" navbarLink d-flex" href="/account">

                    <FaUserCog />
                <p>Account</p>
                </Link>

                <hr className="navbarLineBreak"></hr>

            </div>
        </div>
    </div >


}

export default NavBar