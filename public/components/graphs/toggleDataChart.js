import "bootstrap/dist/css/bootstrap.min.css";
import LineGraph from "./lineGraph.js";

import React from "react";

class ToggleDataChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGraph: null,
      randomKey: null,
    };
  }

  componentDidMount() {
    this.setState({
      randomKey: Math.floor(Math.random() * 100000),
    });
    this.displayGraph(1);
  }

  displayGraph = (graphNumber) => {
    switch (graphNumber) {
      case 1:
        this.setState({
          currentGraph: this.displayWeeklyGraph(),
        });
        return this.displayWeeklyGraph();
      case 2:
        this.setState({
          currentGraph: this.displayMonthlyGraph(),
        });
        break;
      case 3:
        this.setState({
          currentGraph: this.displayYearlyGraph(),
        });
        break;
      default:
        this.setState({
          currentGraph: this.displayWeeklyGraph(),
        });
    }
  };

  displayWeeklyGraph = () => {
    console.log("1");
    return (
      <LineGraph
        dataSet={this.props.dataSet}
        xAxis={this.props.xAxis1}
        yAxis={this.props.yAxis1}
        xAxisDataKey={this.props.xAxisDataKey1}
        yAxisDataKey={this.props.yAxisDataKey1}
      />
    );
  };

  displayMonthlyGraph = () => {
    console.log("2");
    return (
      <LineGraph
        dataSet={this.props.dataSet}
        xAxis={this.props.xAxis2}
        yAxis={this.props.yAxis2}
        xAxisDataKey={this.props.xAxisDataKey2}
        yAxisDataKey={this.props.yAxisDataKey2}
      />
    );
  };

  displayYearlyGraph = () => {
    console.log("3");
    return (
      <LineGraph
        dataSet={this.props.dataSet}
        xAxis={this.props.xAxis3}
        yAxis={this.props.yAxis3}
        xAxisDataKey={this.props.xAxisDataKey3}
        yAxisDataKey={this.props.yAxisDataKey3}
      />
    );
  };

  render() {
    return (
      <div className="row h-100 w-100">
        <div className="col whiteBackground rounded d-flex flex-column align-items-center ">
          <div>
            <ul className="d-flex blueBackground p-1 rounded noListStyle">
              <li className="whiteBackground d-flex justify-content-center">
                <input
                  value={this.props.toggle1}
                  type="radio"
                  name={this.state.randomKey + "timeRange"}
                  className="invisibleInput"
                  id={this.state.randomKey + "radio1"}
                  onClick={() => {
                    this.displayGraph(1);
                  }}
                />
                <label
                  className="selectableLabel px-4"
                  htmlFor={this.state.randomKey + "radio1"}
                >
                  Weekly
                </label>
              </li>
              <li className="whiteBackground mx-1 d-flex justify-content-center">
                <input
                  value={this.props.toggle2}
                  type="radio"
                  name={this.state.randomKey + "timeRange"}
                  className="invisibleInput"
                  onClick={() => {
                    this.displayGraph(2);
                  }}
                  id={this.state.randomKey + "radio2"}
                />
                <label
                  className="selectableLabel px-4"
                  htmlFor={this.state.randomKey + "radio2"}
                >
                  Monthly
                </label>
              </li>
              <li className="whiteBackground d-flex justify-content-center">
                <input
                  value={this.props.toggle3}
                  type="radio"
                  name={this.state.randomKey + "timeRange"}
                  className="invisibleInput"
                  onClick={() => {
                    this.displayGraph(3);
                  }}
                  id={this.state.randomKey + "radio3"}
                />
                <label
                  className="selectableLabel px-4"
                  htmlFor={this.state.randomKey + "radio3"}
                >
                  Yearly
                </label>
              </li>
            </ul>
          </div>

          {this.state.currentGraph}
        </div>
      </div>
    );
  }
}

export default ToggleDataChart;
