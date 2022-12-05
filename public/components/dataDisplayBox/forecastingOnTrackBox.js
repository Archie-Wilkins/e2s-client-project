import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

class ForecastingOnTrackBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  calculatePercentageChange = () => {
    return this.props.forecastedData - this.props.currentData;
  };

  calculateDifference = () => {
    return this.props.forecastedData - this.props.currentData;
  };

  render() {
    return (
      <div className="whiteBackground rounded">
        <p className="my-0 text-center mx-1">{this.props.title}</p>
        <div className="d-flex justify-content-center align-items-center mt-1">
          <p className="m-0">
            <b>{this.props.forecastedData}</b>
          </p>
          <FaLongArrowAltDown color="#2e6301" />
          <p className="greenColor m-0">Down {this.props.change}</p>
        </div>
        <div className="w-100 greenBackground rounded-bottom p-2">
          {/* <p className="text-white text-center m-0 pt-1">
          <b>Could be improved</b>
        </p> */}
        </div>
      </div>
    );
  }
}

export default ForecastingOnTrackBox;
