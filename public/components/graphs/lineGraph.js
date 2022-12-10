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

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w-100 h-100">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={this.props.dataSet}>
            <Line
              type="monotone"
              dataKey={this.props.yAxisDataKey}
              stroke="#8884d8"
            />
            <XAxis dataKey={this.props.xAxisDataKey}>
              <Label
                value={this.props.xAxis}
                offset={-5}
                position="insideBottom"
              />
            </XAxis>
            <YAxis dataKey={this.props.yAxisDataKey}>
              <Label
                value={this.props.yAxis}
                angle={270}
                offset={-5}
                position="left"
              />
            </YAxis>
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default LineGraph;
