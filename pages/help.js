import Link from "next/link"
import MainLayout from "../public/components/mainLayout.js"
import React from 'react';


class HelpPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: 'Help',
            //Need to change this to get this 
            //infomation from API
        };
    }

    render() {
        return <div>
            <MainLayout pageName={this.state.pageName}>
                <div className="whiteBackground mt-5">
                    <p>Help</p>
                </div>
            </MainLayout >

            <Link href="/contact"><p>Contact-Us Page</p></Link>
        </div >
    }

}

export default HelpPage
