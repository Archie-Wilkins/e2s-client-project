import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

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