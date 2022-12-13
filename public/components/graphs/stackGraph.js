import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { AreaChart, Area, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { curveCardinal } from 'd3-shape';

class StackGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardinal: curveCardinal.tension(0.2),
    }
  }

  render() {
    return (
      <div className="w-100 h-100">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={"100%"}
            height={"100%"}
            data={this.props.dataSet1}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={this.props.xAxis}>
              <Label
                value={this.props.xAxis}
                offset={-5}
                position="insideBottom"
              />
            </XAxis>
            <YAxis >
              <Label
                value={this.props.yAxis}
                angle={270}
                offset={20}
                position="insideBottomLeft"
              />
            </YAxis>
            <Tooltip />
            <Area type="monotone" dataKey={this.props.area1} stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type={this.state.cardinal} dataKey={this.props.area2} stackId="2" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default StackGraph;
