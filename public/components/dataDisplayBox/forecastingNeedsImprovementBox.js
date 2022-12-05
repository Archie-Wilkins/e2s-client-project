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
        <p className="my-0 text-center">Predicted Energy Usage In 12 Months</p>
        <div className="d-flex justify-content-center align-items-center my-2">
          <p className="m-0">
            <b>{this.props.unit + "" + this.props.forecastedData}</b>
          </p>
          <FaLongArrowAltDown color="rgb(163, 2, 2)" />
          <p className="redColor m-0">
            Down {this.props.unit + "" + this.props.forecastedData}
          </p>
        </div>
        <div className="w-100 redBackground rounded-bottom">
          <p className="text-white text-center m-0 pt-1">
            <b>Needs Improvement</b>
          </p>
          <div className="d-flex justify-content-around align-items-center">
            {/* Left Side */}
            <div className="d-flex justify-content-center align-items-center">
              <FaLongArrowAltDown color="white" />
              <div>
                <p className="text-white text-center my-0">Forecasted</p>
                <p className="text-white text-center my-0">16%</p>
                <p className="text-white text-center my-0">(£52403)</p>
              </div>
            </div>
            {/* Center Divider */}
            <div class="verticalLine"></div>
            {/* Right Side */}
            <div className="d-flex justify-content-center align-items-center">
              <FaLongArrowAltDown color="white" />
              <div>
                <p className="text-white text-center my-0">Target</p>
                <p className="text-white text-center my-0">20%</p>
                <p className="text-white text-center my-0">(£55711)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ForecastingNeedsImprovementBox;
