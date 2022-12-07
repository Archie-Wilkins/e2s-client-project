import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Link from 'next/link';


class PublicTopNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return <div className='pt-2 w-100 blueBackground'>
            <div className='w-100 d-flex justify-content-around'>
                <div>
                    <Link href="/"><b className="lightLink">E<span className='accentText'>2</span>S</b></Link>
                </div>
                <div className="w-50 d-flex justify-content-around">
                    <Link className="lightLink" href="/#aboutUs"><p>About Us</p></Link>
                    <Link className="lightLink" href="/requestData"><p>Request Data</p></Link>
                    <Link className="lightLink" href="/login"><p>Login</p></Link>
                    <Link className="lightLink" href="/#enquiryForm"><p>Join Us</p></Link>
                </div>
            </div>
        </div>
    }

}


export default PublicTopNav