import "bootstrap/dist/css/bootstrap.min.css";
import LineGraph from "./lineGraph.js";
import StackGraph from "./stackGraph.js";


import React from "react";

class ToggleTimeChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGraph: this.displayGraph(1),
      randomKey: Math.floor(Math.random() * 10000000),
    };
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
    return (
      <StackGraph
        dataSet1={this.props.dataSet1}
        xAxis={"Date"}
        yAxis={this.props.yAxis}
        area1={this.props.area1}
        area2={this.props.area2}
      />
    );
  };

  displayMonthlyGraph = () => {
    return (
      <StackGraph
        dataSet1={this.props.dataSet2}
        xAxis={"Date"}
        yAxis={this.props.yAxis}
        area1={this.props.area1}
        area2={this.props.area2}
      />
    );
  };

  displayYearlyGraph = () => {
    return (
      <StackGraph
        dataSet1={this.props.dataSet3}
        xAxis={"Date"}
        yAxis={this.props.yAxis}
        area1={this.props.area1}
        area2={this.props.area2}
      />
    );
  };

  render() {
    return (
      <div className="row h-100 w-75">
        <div className="col p-2 whiteBackground rounded d-flex flex-column align-items-center ">
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
                  for={this.state.randomKey + "radio1"}
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
                  for={this.state.randomKey + "radio2"}
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
                  for={this.state.randomKey + "radio3"}
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

export default ToggleTimeChart;
