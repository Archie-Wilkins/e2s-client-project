import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  LineChart,
  Line,
  Label,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

class EnergyCostForecastGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGraph: this.displayGraph(1),
    };
  }

  //   componentDidMount() {
  //     this.setState({ currentGraph: "this.displayWeeklyGraph()" });
  //   }

  displayGraph = (graphNumber) => {
    console.log("Yes" + graphNumber);
    switch (graphNumber) {
      case 1:
        console.log("Yes" + "displayWeeklyGraph");
        this.setState({
          currentGraph: this.displayWeeklyGraph(),
        });
        return this.displayWeeklyGraph();
        break;
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
      <div className="w-100 h-100">
        <ResponsiveContainer>
          <LineChart data={this.props.weeklyData}>
            <Line type="monotone" dataKey="cost" stroke="#8884d8" />
            <XAxis dataKey="name">
              <Label value="Date" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="cost">
              <Label value="Cost (£)" angle={270} offset={-5} position="left" />
            </YAxis>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  displayMonthlyGraph = () => {
    console.log("2");
    return (
      <div className="w-100 h-100">
        <ResponsiveContainer>
          <LineChart data={this.props.monthlyData}>
            <Line type="monotone" dataKey="cost" stroke="#8884d8" />
            <XAxis dataKey="name">
              <Label value="Date" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="cost">
              <Label value="Cost (£)" angle={270} offset={-5} position="left" />
            </YAxis>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  displayYearlyGraph = () => {
    console.log("3");
    return (
      <div className="w-100 h-100">
        <ResponsiveContainer>
          <LineChart data={this.props.yearlyData}>
            <Line type="monotone" dataKey="cost" stroke="#8884d8" />
            <XAxis dataKey="name">
              <Label value="Date" offset={-5} position="insideBottom" />
            </XAxis>
            <YAxis dataKey="cost">
              <Label value="Cost (£)" angle={270} offset={-5} position="left" />
            </YAxis>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  render() {
    return (
      <div className="row h-100 w-75">
        <div className="col p-2 whiteBackground rounded vh-70">
          <div className="blueBackground rounded">
            <button
              onClick={() => {
                this.displayGraph(1);
              }}
            >
              Weekly
            </button>
            <button
              onClick={() => {
                this.displayGraph(2);
              }}
            >
              Monthly
            </button>
            <button
              onClick={() => {
                this.displayGraph(3);
              }}
            >
              Yearly
            </button>
          </div>

          {this.state.currentGraph}
        </div>
      </div>
    );
  }
}

export default EnergyCostForecastGraph;
