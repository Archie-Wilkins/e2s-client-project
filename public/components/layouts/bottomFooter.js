import 'bootstrap/dist/css/bootstrap.min.css';
import Link from "next/link"
import ToggleSite from "./toggleSite.js"
import React from 'react';



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
import { FaUsers } from "react-icons/fa";


class BottomFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return <div className='pt-2 blueBackground'>
            <div className='d-flex justify-content-center'>
                <p className="text-white">© Empowering Energy Solutions 2022</p>
            </div>
        </div >
    }

}


export default BottomFooter