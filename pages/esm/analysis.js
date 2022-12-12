

import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import EnergyCostForecastGraph from "../../public/components/graphs/toggleTimeChart";

import ToggleStackChart from "../../public/components/graphs/toggleStackChart.js";

import ForecastingInfoBox from "../../public/components/dataDisplayBox/forecastingInfoBox.js";
import React from "react";
import BottomFooter from "../../public/components/layouts/bottomFooter.js";
import { getSitePastWeekData, getSiteDataEveryWeek, getSiteDataEveryDay, getSiteDataEvery6Hours, getSiteDataEveryMonth } from "../../public/services/HistoricalSiteData.js";


class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "Analysis",

      graphDataWeekly: null,
      graphDataMonthly: null,
      graphDataYearly: null, 

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

  async componentDidMount() {

    console.log("Week")
    let weeklyData2 = await getSiteDataEvery6Hours("3", "2018-12-22", "2018-12-31")

    console.log("Month")
    let monthlyData2 = await getSiteDataEveryDay("3", "2018-12-01", "2018-12-31")

    console.log("Year")
    let yearlyData2 = await getSiteDataEveryMonth("3", "2018-01-01", "2018-12-31")

    let siteInsightsWeekAverage = await getSiteDataEveryWeek("3");

    let siteInsightsPastWeekAverage = await getSitePastWeekData("3");

    console.log("siteInsights");
    console.log(siteInsightsWeekAverage);

    console.log("pastWeek");
    console.log(siteInsightsPastWeekAverage);
    let val = siteInsightsWeekAverage[0]
    console.log(val["energy_avg_week_cost"])
    //Come back to inorder to convert timestamp into nicer format
    // for (let i = 0; i <= weeklyData2.length; i++) {
    // let item = weeklyData2[i];
    // var date = new Date(item['date']);
    // let formattedDate = date.getTime();
    // item['date'] = formattedDate;
    // }
    // console
    console.log(weeklyData2);

    console.log("SetState")
    this.setState({
      graphDataWeekly: weeklyData2,
      graphDataMonthly: monthlyData2,
      graphDataYearly: yearlyData2,
      // Energy Cost
      energyCostThisWeek: siteInsightsWeekAverage["energy_avg_week_cost"],
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
    });
  }

  render() {
    return (
      <div>
        <MainLayout pageName={this.state.pageName}>
          {/* Energy Cost */}
          <div className="container d-flex flex-column align-items-center w-100">
            <div className="row mt-5 w-75">
              <div className="col-lg rounded text-center">
                <h2>Energy Cost</h2>
              </div>
            </div>

            <div className="row d-flex justify-content-around w-75 mb-2">
              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Week"}
                  unitGoesBefore={true}
                  unit="£"
                  forecastedData={this.state.energyCostThisWeek}
                  currentData={this.state.energyCostLastWeek}
                />
              </div>

              <div className="col p-0 mx-2">
                <ForecastingInfoBox
                  title={"Past Month"}
                  unitGoesBefore={true}
                  unit="£"
                  forecastedData={this.state.energyCostThisMonth}
                  currentData={this.state.energyCostLastMonth}
                />
              </div>

              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Year"}
                  unitGoesBefore={true}
                  unit="£"
                  forecastedData={this.state.energyCostThisYear}
                  currentData={this.state.energyCostLastYear}
                />
              </div>


            </div>

            <EnergyCostForecastGraph
              toggle1={"Week"}
              toggle2={"Month"}
              toggle3={"Year"}
              dataSet1={this.state.graphDataWeekly}
              dataSet2={this.state.graphDataMonthly}
              dataSet3={this.state.graphDataYearly}
              xAxis={"Date"}
              yAxis={"Cost (£)"}
              xAxisDataKey={"date"}
              yAxisDataKey={"energy_cost"}
            />
          </div>
          {/* End of Energy Cost */}

          {/* Energy Usage */}
          <div className="container d-flex flex-column align-items-center w-100">
            <div className="row mt-5 w-75">
              <div className="col rounded text-center">
                <h2>Energy Usage</h2>
              </div>
            </div>

            <div className="row d-flex justify-content-around w-75 mb-2" >
              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Week"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyUsageThisWeek}
                  currentData={this.state.energyUsageLastWeek}
                />
              </div>

              <div className="col p-0 mx-2">
                <ForecastingInfoBox
                  title={"Past Month"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyUsageThisMonth}
                  currentData={this.state.energyUsageLastMonth}
                />
              </div>

              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Year"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyUsageThisYear}
                  currentData={this.state.energyUsageLastYear}
                />
              </div>

            </div>



            <div className="w-100 vh-60 d-flex justify-content-center">
              <ToggleStackChart
                dataSet1={this.state.graphDataWeekly}
                dataSet2={this.state.graphDataMonthly}
                dataSet3={this.state.graphDataYearly}
                xAxis={"date"}
                yAxis={"Energy Input/Output (Kw)"}
                area1={"energy_demand"}
                area2={"energy_imported"}
            />
            </div>
          </div>
          {/* End of Energy Usage */}

          {/* C02 Emissions */}
          <div className="container d-flex flex-column align-items-center w-100 mb-5">
            <div className="row mt-5 w-75">
              <div className="col-lg rounded text-center">
                <h2>C02 Emissions</h2>
              </div>
            </div>

            <div className="row d-flex justify-content-around w-75 mb-2">
              <div className="col p-0">
              <ForecastingInfoBox
                title={"Past Week"}
                unitGoesBefore={false}
                unit="Kg"
                forecastedData={this.state.c02EmissionsThisWeek}
                currentData={this.state.c02EmissionsLastWeek}
              />
            </div>

              <div className="col p-0 mx-2">
              <ForecastingInfoBox
                title={"Past Month"}
                unitGoesBefore={false}
                unit="Kg"
                  forecastedData={this.state.c02EmissionsThisMonth}
                  currentData={this.state.c02EmissionsLastMonth}
              />
            </div>

              <div className="col p-0">
              <ForecastingInfoBox
                title={"Past Year"}
                unitGoesBefore={false}
                unit="Kg"
                  forecastedData={this.state.c02EmissionsThisMonth}
                  currentData={this.state.c02EmissionsLastMonth}
              />
            </div>
            </div>
            <EnergyCostForecastGraph
              toggle1={"Week"}
              toggle2={"Month"}
              toggle3={"Year"}
              dataSet1={this.state.graphDataWeekly}
              dataSet2={this.state.graphDataMonthly}
              dataSet3={this.state.graphDataYearly}
              xAxis={"date"}
              yAxis={"C02 Emissions (Kg)"}
              xAxisDataKey={"date"}
              yAxisDataKey={"carbon_emitted"}
            />
          </div>
          {/* End of C02 Emissions */}

          <BottomFooter className="mt-3" />
        </MainLayout>
      </div>
    );
  }
}

export default Analysis;
