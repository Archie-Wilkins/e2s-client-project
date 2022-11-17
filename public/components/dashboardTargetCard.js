import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class DashboardTargetCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }




    render() {
        return<div className="TargetCard">
            <div className="CardInformationConatiner">

                <div className="TargetProgressBarContainer">
                    <div className="TargetProgressBarFill"></div>
                </div>
                <div className="TargetText">Sample target text here Sample target text here</div>
            </div>

        </div>
    }
}

export default DashboardTargetCard;