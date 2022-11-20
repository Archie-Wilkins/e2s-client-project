import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FaSistrix } from "react-icons/fa";


class TopNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //No states
        };
    }

    enterSearch = () => {
        {
            console.log(this.props);
        }
    }

    render() {
        return <div className='whiteBackground topNavBar d-flex justify-content-center '>
            <div className="d-flex justify-content-between align-items-center w-75 h-100">
                <p className="p-0 m-0"><b>{this.props.pageName}</b></p>

                <div class="input-group w-25">
                    <input type="text" className="form-control" placeholder="Search..." aria-label="Username" aria-describedby="search-addon" />
                    <button class="btn btn-outline-secondary input-group-append d-flex align-items-center" type="button" id="search-addon">
                        <FaSistrix />
                    </button>
                </div>
            </div>
        </div >
    }

}


export default TopNavBar