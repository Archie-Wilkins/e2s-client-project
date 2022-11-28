import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { FaCommentDollar } from 'react-icons/fa';


class ToggleSite extends React.Component {
    constructor(props) {
        super(props);
    }

    changeSite = (newSiteId) => {
        this.props.changeActiveSite(newSiteId);
    }

    displayAllUsersSites = () => {
        if (this.props.usersSites != null) {
            return (
                <div>
                    {
                        Object.keys(this.props.usersSites).map((key, index) => (
                            <div>
                                <p onClick={() => { this.changeSite(key) }} className="m-0 my-2 p-0 darkLink" key={this.props.usersSites[key]}>{this.props.usersSites[key]}</p>
                                <hr className="toggleSiteBreak" />
                            </div>
                        ))
                    }
                </div >
            )
        } else {
            <div>To access other sites please contact your System Admin</div>
        }
    }

    render() {
        if (this.props.displayMenu) {
            return <div className="whiteBackground p-2 rounded">
                <p className="m-0 p-0 text-center"><b>Switch Site</b></p>
                <div>{this.displayAllUsersSites()}</div>
                <p onClick={this.props.closeMenu} className="text-center mt-2 mb-1 darkLink"><b>Cancel</b></p>
        </div>
    }
    else {
        return null;
    }
}
}

export default ToggleSite