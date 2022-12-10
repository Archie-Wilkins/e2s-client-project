import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ForecastingNeedsImprovementBox from "./forecastingNeedsImprovementBox";
import ForecastingOnTrackBox from "./forecastingOnTrackBox";

class ForecastingInfoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displayDifference = () => {
    let value = this.calculateDifference();
    if (value < 0) {
      // Remove minus sign
      value = value * -1;
    }

    let message = value + this.props.unit;
    if (this.props.unitGoesBefore == true) {
      message = this.props.unit + value;
    }
    return message;
  };

  calculateDifference = () => {
    return this.props.forecastedData - this.props.currentData;
  };

  displayForecastedData = () => {
    let message = this.props.forecastedData + this.props.unit;
    if (this.props.unitGoesBefore == true) {
      message = this.props.unit + value;
    }
    return message;
  };

  displayCurrentData = () => {
    let message = this.props.forecastedData + this.props.unit;
    if (this.props.unitGoesBefore == true) {
      message = this.props.unit + this.props.forecastedData;
    }
    return message;
  };

  render() {
    if (this.calculateDifference() < 0) {
      return (
        <ForecastingNeedsImprovementBox
          title={this.props.title}
          unit={this.props.unit}
          forecastedData={this.displayCurrentData()}
          currentData={this.props.currentData}
          change={this.displayDifference()}
        />
      );
    } else {
      return (
        <ForecastingOnTrackBox
          title={this.props.title}
          unit="£"
          forecastedData={this.displayCurrentData()}
          currentData={this.props.currentData}
          change={this.displayDifference()}
        />
      );
    }
  }
}

export default ForecastingInfoBox;
