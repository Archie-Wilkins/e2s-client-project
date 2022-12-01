import Link from "next/link";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import EnergyCostForecastGraph from "../../public/components/forecastingGraphs/energyCostForecastGraph";
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

class Forecasting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "Forecasting",
      //Need to change this to get this
      //infomation from API

      //Would be ideal to store these in some sort of cookie or global variable
      //if these are not present then the nav bar will default to standard ESM nav bar

      isDirector: false,

      weeklyData: [
        { name: "Mon 5th", cost: 400, c02: 153 },
        { name: "Tue 6th", cost: 415, c02: 145 },
        { name: "Wed 7th", cost: 460, c02: 131 },
        { name: "Thu 8th", cost: 501, c02: 115 },
        { name: "Fri 9th", cost: 446, c02: 165 },
        { name: "Sat 10th", cost: 608, c02: 135 },
        { name: "Sun 11th", cost: 608, c02: 135 },
      ],

      monthlyData: [
        { name: "14/11/2022", cost: 400, c02: 153 },
        { name: "15/11/2022", cost: 415, c02: 145 },
        { name: "16/11/2022", cost: 460, c02: 131 },
        { name: "17/11/2022", cost: 501, c02: 115 },
        { name: "18/11/2022", cost: 446, c02: 165 },
        { name: "19/11/2022", cost: 608, c02: 135 },
        { name: "20/11/2022", cost: 562, c02: 115 },
        { name: "21/11/2022", cost: 531, c02: 112 },
        { name: "22/11/2022", cost: 558, c02: 113 },
        { name: "23/11/2022", cost: 515, c02: 109 },
        { name: "24/11/2022", cost: 589, c02: 106 },
        { name: "25/11/2022", cost: 605, c02: 105 },
        { name: "26/11/2022", cost: 601, c02: 103 },
        { name: "27/11/2022", cost: 561, c02: 101 },
        { name: "28/11/2022", cost: 410, c02: 103 },
        { name: "29/11/2022", cost: 440, c02: 111 },
        { name: "30/11/2022", cost: 495, c02: 121 },
        { name: "1/12/2022", cost: 411, c02: 136 },
        { name: "2/12/2022", cost: 452, c02: 141 },
        { name: "3/12/2022", cost: 431, c02: 145 },
        { name: "4/12/2022", cost: 459, c02: 131 },
        { name: "5/12/2022", cost: 473, c02: 113 },
        { name: "6/12/2022", cost: 413, c02: 121 },
        { name: "7/12/2022", cost: 519, c02: 117 },
        { name: "8/12/2022", cost: 511, c02: 113 },
        { name: "9/12/2022", cost: 506, c02: 121 },
        { name: "10/12/2022", cost: 520, c02: 119 },
        { name: "11/12/2022", cost: 549, c02: 131 },
        { name: "12/12/2022", cost: 560, c02: 136 },
        { name: "13/12/2022", cost: 580, c02: 145 },
        { name: "14/12/2022", cost: 600, c02: 145 },
      ],

      yearlyData: [
        { name: "December", cost: 400, c02: 153 },
        { name: "January", cost: 415, c02: 145 },
        { name: "February", cost: 460, c02: 131 },
        { name: "March", cost: 501, c02: 115 },
        { name: "April", cost: 446, c02: 165 },
        { name: "May", cost: 608, c02: 135 },
        { name: "June", cost: 608, c02: 138 },
        { name: "July", cost: 620, c02: 165 },
        { name: "August", cost: 630, c02: 175 },
        { name: "September", cost: 640, c02: 185 },
        { name: "October", cost: 645, c02: 175 },
        { name: "November", cost: 633, c02: 165 },
        { name: "December", cost: 640, c02: 165 },
      ],
    };
  }

  render() {
    return (
      <div>
        <MainLayout
          isDirector={this.state.isDirector}
          pageName={this.state.pageName}
        >
          {/* Energy Cost */}
          <div className="container d-flex flex-column align-items-center w-100">
            <div className="row mt-5 w-75">
              <div className="col-lg rounded text-center">
                <h2>Energy Cost</h2>
              </div>
            </div>

            <EnergyCostForecastGraph
              weeklyData={this.state.weeklyData}
              monthlyData={this.state.monthlyData}
              yearlyData={this.state.yearlyData}
            />

            <div className="row mt-2 g-2 w-75">
              <div className="col whiteBackground rounded mr-1">Box 1</div>
              <div className="col whiteBackground rounded mx-1">Box 1</div>
              <div className="col whiteBackground rounded ml-1">Box 1</div>
            </div>
          </div>

          {/* Energy Usage */}
          <div className="container d-flex flex-column align-items-center w-100">
            <div className="row mt-5 w-75">
              <div className="col-lg rounded text-center">
                <h2>C02 Emissions</h2>
              </div>
            </div>

            <div className="row h-100 w-75">
              <div className="col p-2 whiteBackground rounded vh-70">
                {/* <h3>Graph goes here</h3> */}
                <ResponsiveContainer>
                  <LineChart data={this.state.monthlyData}>
                    <Line type="monotone" dataKey="c02" stroke="#8884d8" />
                    <XAxis dataKey="name">
                      <Label value="Date" offset={-5} position="insideBottom" />
                    </XAxis>
                    <YAxis dataKey="c02">
                      <Label
                        value="C02 Emissions (Kg)"
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

          {/* Energy Usage */}
        </MainLayout>

        <Link href="/contact">
          <p>Contact-Us Page</p>
        </Link>
      </div>
    );
  }
}

export default Forecasting;
