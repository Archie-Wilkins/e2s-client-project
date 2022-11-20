import React from 'react';
import {FaCaretDown, FaCaretUp} from "react-icons/fa";

class DashboardInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeframe:"week",
            change:"12% less",
            buzzword:"emitted",
            unit:"CO2"
        };
    }


    render() {
        if (this.state.change.toString().includes("more")){
            return<div className="grid-panel center-flex-column">
                <p className="info-small-text margin-top-negative-10">This {this.state.timeframe} you have {this.state.buzzword}</p>
                <p className="info-change-text">{this.state.change} <FaCaretUp className="color-red caret-size" /></p>
                <p className="info-small-text margin-bottom-negative-10">{this.state.unit} than the previous {this.state.timeframe}</p>
            </div>
        }
        return<div className="grid-panel center-flex-column">
            <p className="info-small-text margin-top-negative-10">This {this.state.timeframe} you have {this.state.buzzword}</p>
            <p className="info-change-text">{this.state.change} <FaCaretDown className="color-green caret-size" /></p>
            <p className="info-small-text margin-bottom-negative-10">{this.state.unit} than the previous {this.state.timeframe}</p>
        </div>

    }
}

export default DashboardInformation;