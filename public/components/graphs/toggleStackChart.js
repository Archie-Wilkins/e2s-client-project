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
    console.log("Yes" + graphNumber);
    switch (graphNumber) {
      case 1:
        console.log("Yes" + "displayWeeklyGraph");
        this.setState({
          currentGraph: this.displayWeeklyGraph(),
        });
        return this.displayWeeklyGraph();
      case 2:
        console.log("Yes" + "displayMonthlyGraph");
        this.setState({
          currentGraph: this.displayMonthlyGraph(),
        });
        break;
      case 3:
        console.log("Yes" + "displayYearlyGraph");
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
      <StackGraph
        dataSet1={this.props.dataSet1}
        xAxis={"Date"}
        yAxis={this.props.yAxis}
        area1={"energyUsage"}
        area2={"energyIn"}
      />
    );
  };

  displayMonthlyGraph = () => {
    console.log("2");
    return (
      <StackGraph
        dataSet1={this.props.dataSet2}
        xAxis={"Date"}
        yAxis={this.props.yAxis}
        area1={"energyUsage"}
        area2={"energyIn"}
      />
    );
  };

  displayYearlyGraph = () => {
    console.log("3");
    return (
      <StackGraph
        dataSet1={this.props.dataSet3}
        xAxis={"Date"}
        yAxis={this.props.yAxis}
        area1={"energyUsage"}
        area2={"energyIn"}
      />
    );
  };

  render() {
    return (
      <div className="row h-100 w-75">
        <div className="col p-2 whiteBackground rounded vh-70 d-flex flex-column align-items-center ">
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
