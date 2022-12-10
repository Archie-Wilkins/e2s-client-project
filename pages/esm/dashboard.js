import Link from "next/link";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import EnergyCostForecastGraph from "../../public/components/graphs/toggleTimeChart";
import StackGraph from "../../public/components/graphs/stackGraph";

import ToggleStackChart from "../../public/components/graphs/toggleStackChart.js";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import ForecastingInfoBox from "../../public/components/dataDisplayBox/forecastingInfoBox.js";
import React from "react";
import BottomFooter from "../../public/components/layouts/bottomFooter.js";

class EsmDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "Dashboard",
      //Need to change this to get this
      //infomation from API

      //Would be ideal to store these in some sort of cookie or global variable
      //if these are not present then the nav bar will default to standard ESM nav bar

      isDirector: false,

      weeklyData: [
        { date: "Mon 5th", c02: 153, cost: 400, energyUsage: 150, energyIn: 120 },
        { date: "Tue 6th", c02: 145, cost: 415, energyUsage: 150, energyIn: 120 },
        { date: "Wed 7th", c02: 131, cost: 460, energyUsage: 150, energyIn: 120 },
        { date: "Thu 8th", c02: 115, cost: 501, energyUsage: 150, energyIn: 120 },
        { date: "Fri 9th", c02: 165, cost: 446, energyUsage: 150, energyIn: 120 },
        { date: "Sat 10th", c02: 135, cost: 608, energyUsage: 150, energyIn: 120 },
        { date: "Sun 11th", c02: 135, cost: 608, energyUsage: 150, energyIn: 120 },
      ],

      monthlyData: [
        { date: "14/11/2022", cost: 2000, c02: 153, energyUsage: 180, energyIn: 120 },
        { date: "15/11/2022", cost: 415, c02: 145, energyUsage: 150, energyIn: 120 },
        { date: "16/11/2022", cost: 460, c02: 131, energyUsage: 150, energyIn: 120 },
        { date: "17/11/2022", cost: 501, c02: 115, energyUsage: 150, energyIn: 120 },
        { date: "18/11/2022", cost: 446, c02: 165, energyUsage: 150, energyIn: 120 },
        { date: "19/11/2022", cost: 608, c02: 135, energyUsage: 150, energyIn: 120 },
        { date: "20/11/2022", cost: 562, c02: 115, energyUsage: 150, energyIn: 120 },
        { date: "21/11/2022", cost: 531, c02: 112, energyUsage: 150, energyIn: 120 },
        { date: "22/11/2022", cost: 558, c02: 113, energyUsage: 150, energyIn: 120 },
        { date: "23/11/2022", cost: 515, c02: 109, energyUsage: 150, energyIn: 120 },
        { date: "24/11/2022", cost: 589, c02: 106, energyUsage: 150, energyIn: 120 },
        { date: "25/11/2022", cost: 605, c02: 105, energyUsage: 150, energyIn: 120 },
        { date: "26/11/2022", cost: 601, c02: 103, energyUsage: 150, energyIn: 120 },
        { date: "27/11/2022", cost: 561, c02: 101, energyUsage: 150, energyIn: 120 },
        { date: "28/11/2022", cost: 410, c02: 103, energyUsage: 150, energyIn: 120 },
        { date: "29/11/2022", cost: 440, c02: 111, energyUsage: 150, energyIn: 120 },
        { date: "30/11/2022", cost: 495, c02: 121, energyUsage: 150, energyIn: 120 },
        { date: "1/12/2022", cost: 411, c02: 136, energyUsage: 150, energyIn: 120 },
        { date: "2/12/2022", cost: 452, c02: 141, energyUsage: 150, energyIn: 120 },
        { date: "3/12/2022", cost: 431, c02: 145, energyUsage: 150, energyIn: 120 },
        { date: "4/12/2022", cost: 459, c02: 131, energyUsage: 150, energyIn: 120 },
        { date: "5/12/2022", cost: 473, c02: 113, energyUsage: 150, energyIn: 120 },
        { date: "6/12/2022", cost: 413, c02: 121, energyUsage: 150, energyIn: 120 },
        { date: "7/12/2022", cost: 519, c02: 117, energyUsage: 150, energyIn: 120 },
        { date: "8/12/2022", cost: 511, c02: 113, energyUsage: 150, energyIn: 120 },
        { date: "9/12/2022", cost: 506, c02: 121, energyUsage: 150, energyIn: 120 },
        { date: "10/12/2022", cost: 520, c02: 119, energyUsage: 150, energyIn: 120 },
        { date: "11/12/2022", cost: 549, c02: 131, energyUsage: 150, energyIn: 120 },
        { date: "12/12/2022", cost: 560, c02: 136, energyUsage: 150, energyIn: 120 },
        { date: "13/12/2022", cost: 580, c02: 145, energyUsage: 150, energyIn: 120 },
        { date: "14/12/2022", cost: 600, c02: 145, energyUsage: 150, energyIn: 120 },
      ],

      yearlyData: [
        { date: "Dec", cost: 400, c02: 153, energyUsage: 150, energyIn: 40 },
        { date: "Jan", cost: 415, c02: 145, energyUsage: 150, energyIn: 120 },
        { date: "Feb", cost: 460, c02: 131, energyUsage: 150, energyIn: 120 },
        { date: "Mar", cost: 501, c02: 115, energyUsage: 150, energyIn: 120 },
        { date: "Apr", cost: 446, c02: 165, energyUsage: 150, energyIn: 120 },
        { date: "May", cost: 608, c02: 135, energyUsage: 150, energyIn: 120 },
        { date: "Jun", cost: 608, c02: 138, energyUsage: 150, energyIn: 120 },
        { date: "Jul", cost: 620, c02: 165, energyUsage: 150, energyIn: 120 },
        { date: "Aug", cost: 630, c02: 175, energyUsage: 150, energyIn: 120 },
        { date: "Sep", cost: 640, c02: 185, energyUsage: 150, energyIn: 120 },
        { date: "Oct", cost: 645, c02: 175, energyUsage: 150, energyIn: 120 },
        { date: "Nov", cost: 633, c02: 165, energyUsage: 150, energyIn: 120 },
        { date: "Dec", cost: 640, c02: 165, energyUsage: 150, energyIn: 120 },
      ],

      // Energy Cost
      energyCostThisWeek: 435,
      energyCostLastWeek: 250,

      energyCostThisMonth: 435,
      energyCostLastMonth: 250,

      energyCostThisYear: 435,
      energyCostLastYear: 250,

      // Energy Usage
      energyUsageThisWeek: 435,
      energyUsageLastWeek: 256,

      energyUsageThisMonth: 435,
      energyUsageLastMonth: 250,

      energyUsageThisYear: 435,
      energyUsageLastYear: 250,

      // C02 Emissions
      c02EmissionsThisWeek: 435,
      c02EmissionsLastWeek: 250,

      c02EmissionsThisMonth: 435,
      c02EmissionsLastMonth: 250,

      c02EmissionsThisYear: 435,
      c02EmissionsLastYear: 250,
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
                <h1>Dashboard</h1>
              </div>
            </div>

            <EnergyCostForecastGraph
              toggle1={"Week"}
              toggle2={"Month"}
              toggle3={"Year"}
              dataSet1={this.state.weeklyData}
              dataSet2={this.state.monthlyData}
              dataSet3={this.state.yearlyData}
              xAxis={"Date"}
              yAxis={"Cost (£)"}
              xAxisDataKey={"date"}
              yAxisDataKey={"cost"}
            />
          </div>
          {/* End of Energy Cost */}

          <BottomFooter className="mt-3" />
        </MainLayout>
      </div>
    );
  }
}

export default EsmDashboard;
