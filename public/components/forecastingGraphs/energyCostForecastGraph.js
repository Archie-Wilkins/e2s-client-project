import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import React from "react";

// React Icons
import { FaHandshake } from "react-icons/fa";
import { FaTachometerAlt } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

class EnergyCostForecastGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/* Energy Cost */}
        <div className="container d-flex flex-column align-items-center w-100">
          <div className="row mt-5 w-75">
            <div className="col-lg rounded text-center">
              <h2>Energy Cost</h2>
            </div>
          </div>

          <div className="row h-100 w-75">
            <div className="col p-2 whiteBackground rounded vh-70">
              <ResponsiveContainer>
                <LineChart data={this.state.monthlyData}>
                  <Line type="monotone" dataKey="cost" stroke="#8884d8" />
                  <XAxis dataKey="name">
                    <Label value="Date" offset={-5} position="insideBottom" />
                  </XAxis>
                  <YAxis dataKey="cost">
                    <Label
                      value="Cost (£)"
                      angle={270}
                      offset={-5}
                      position="left"
                    />
                  </YAxis>
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="row mt-2 g-2 w-75">
            <div className="col whiteBackground rounded mr-1">Box 1</div>
            <div className="col whiteBackground rounded mx-1">Box 1</div>
            <div className="col whiteBackground rounded ml-1">Box 1</div>
          </div>
        </div>
      </div>
    );
  }
}

export default energyCostForecastGraph;
