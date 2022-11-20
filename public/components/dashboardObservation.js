import React from 'react';

class DashboardObservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            observation:"sample observation"
        };
    }

    render() {
        return<div className="observation-card my-1">{this.state.observation}</div>
    }
}

export default DashboardObservation;