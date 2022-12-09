import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

class ForecastingNeedsImprovementBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="whiteBackground rounded">
        <p className="my-0 text-center mx-2">{this.props.title}</p>
        <div className="d-flex justify-content-center align-items-center mt-1">
          <p className="m-0">
            <b>{this.props.forecastedData}</b>
          </p>
          <FaLongArrowAltUp color="#910012" />
          <p className="redColor m-0">Up {this.props.change}</p>
        </div>
        <div className="w-100 redBackground rounded-bottom p-2">
          {/* <p className="text-white text-center m-0 pt-1">
            <b>Could be improved</b>
          </p> */}
        </div>
      </div>
    );
  }
}

export default ForecastingNeedsImprovementBox;
