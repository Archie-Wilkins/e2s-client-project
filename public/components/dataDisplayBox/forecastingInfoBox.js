import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ForecastingNeedsImprovementBox from "./forecastingNeedsImprovementBox";

class ForecastingInfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ForecastingNeedsImprovementBox
        unit="£"
        forecastedData={this.props.forecastedData}
        currentData={this.props.currentData}
      />
    );
  }
}

export default ForecastingInfoBox;
