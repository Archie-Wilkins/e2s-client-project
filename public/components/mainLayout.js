import 'bootstrap/dist/css/bootstrap.min.css';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils.js';
import React from 'react';
import MasterNavBar from './masterNavBar.js';
import TopNavBar from './topNavBar.js';

class MainLayout extends React.Component {
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
            <MasterNavBar isAdmin={this.state.isAdmin} />
            <TopNavBar pageName={this.props.pageName} />
            <div className="content greyBackground">
                {this.props.children}
            </div>
        </div >
    }

}


export default MainLayout