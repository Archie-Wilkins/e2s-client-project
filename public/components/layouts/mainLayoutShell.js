import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import TopNavBar from './topNavBar.js';
import MasterNavBar from "./masterNavBar";

class MainLayoutShell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Need to change this to get this 
            //infomation from API
            isAdmin: false,
        };
    }

    render() {
        return <div className='overflow-hidden'>
            <MasterNavBar isAdmin={this.props.isAdmin} isDirector={this.props.isDirector} />
            <TopNavBar pageName={this.props.pageName} />
            <div className="content greyBackground">
                {this.props.children}
            </div>
        </div >
    }

}


export default MainLayoutShell