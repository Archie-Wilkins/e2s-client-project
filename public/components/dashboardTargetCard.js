import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class DashboardTargetCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            targetText:"sample target text"
        };
    }

    render() {
        return<div className="TargetCard">
            <div className="CardInformationConatiner">
                <div className="TargetText">{this.state.targetText}</div>
                <div className="TargetProgressBarContainer">
                    <div className="TargetProgressBarFill"></div>
                </div>
            </div>

        </div>
    }
}

export default DashboardTargetCard;