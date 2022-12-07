import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Link from 'next/link';


class publicTopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return <div className='px-5 py-2 w-100 blueBackground'>
            <div className='w-100 d-flex justify-content-between align-items-center'>
                <div>
                    <Link className="lightLink m-0" href="/"><h4 className="m-0">E<span className='accentText'>2</span>S</h4></Link>
                </div>
                <div className="vw-40 d-flex justify-content-around align-items-center">
                    <Link className="lightLink m-0" href="/#aboutUs"><p className="m-0">About Us</p></Link>
                    <Link className="lightLink m-0" href="/requestData"><p className="m-0">Request Data</p></Link>
                    <Link className="lightLink m-0" href="/login"><p className="m-0">Login</p></Link>
                    <Link className="accentButton px-2 m-0" href="/#enquiryForm"><p className="m-0">Join Us</p></Link>
                </div>
            </div>
        </div >
    }

}


export default publicTopNav