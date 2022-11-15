import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';


class ToggleSite extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
    console.log("Running");
        console.log(this.props)
        if (this.props.displayMenu) {
        return <div className="whiteBackground">
            <h4>Switch Site</h4>

        </div>
    }
    else {
        return null;
    }
}
}

export default ToggleSite