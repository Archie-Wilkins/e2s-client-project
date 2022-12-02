import "bootstrap/dist/css/bootstrap.min.css";
import LineGraph from "./lineGraph.js";

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

class ForecastingBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
      </div>
    );
  }
}

export default ForecastingBox;
