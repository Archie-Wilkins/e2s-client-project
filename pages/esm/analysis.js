import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import EnergyCostForecastGraph from "../../public/components/graphs/toggleTimeChart";

import ToggleStackChart from "../../public/components/graphs/toggleStackChart.js";
import Cookies from "js-cookie";
import ForecastingInfoBox from "../../public/components/dataDisplayBox/forecastingInfoBox.js";
import React from "react";
import BottomFooter from "../../public/components/layouts/bottomFooter.js";
import { getSitePastWeekData, getSiteDataEveryWeek, getSiteDataEveryDay, getSiteDataEvery6Hours, getSiteDataEveryMonth } from "../../public/services/HistoricalSiteData.js";
import { getDayName } from "../../public/services/DateConverter";


class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageName: "Analysis",

      dataUpdated: false,

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

      // Energy Imported
      energyImportedThisWeek: 425,
      energyImportedLastWeek: 442,

      energyUsageThisMonth: 435,
      energyUsageLastMonth: 250,

      energyUsageThisYear: 435,
      energyUsageLastYear: 250,

      // Energy Demand
      energyDemandThisWeek: 435,
      energyDemandLastWeek: 256,

      energyDemandThisMonth: 435,
      energyDemandLastMonth: 250,

      energyDemandThisYear: 435,
      energyDemandLastYear: 250,

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

    try {
      //Get the user cookie
      let userCookieEncypted = Cookies.get().user;

      //import CryptoJS
      var CryptoJS = require("crypto-js");

      //decrypt the cookie
      var bytes = CryptoJS.AES.decrypt(userCookieEncypted, 'team4');
      //store decrypted cookie in userCookie
      var userCookie = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      // If the user has the incorrect credentials for the page, remove them
      if (userCookie.role != 3) {
        Cookies.remove("user");
        window.location = "/login";
      }
      //catch errors
    } catch (e) {
      // No cookie found
      //return to login
      window.location = "/login";
    }

    let weeklyData = await getSiteDataEvery6Hours("1", "2022-02-28", "2022-03-07")

    let monthlyData = await getSiteDataEveryDay("1", "2022-02-07", "2022-03-07")

    let yearlyData = await getSiteDataEveryMonth("1", "2021-03-07", "2022-03-07")

    let siteInsightsWeekAverage = await getSiteDataEveryWeek("1");

    let siteInsightsPastWeekAverage = await getSitePastWeekData("1");


    let thisWeek = siteInsightsWeekAverage[0]
    let pastWeek = siteInsightsPastWeekAverage[0]

    // Setting date axis for weekly data 
    for (let i = 0; i < weeklyData.length; i++) {
      let item = weeklyData[i];
      let dateVal = new Date(item['date']);
      let dayName = getDayName(dateVal)
      let localTime = dateVal.getHours();
      let localDate = dayName + " " + localTime + ":00";
      weeklyData[i]['date'] = localDate;
    }

    console.log(weeklyData);

    // Setting date axis for monthly data 
    for (let i = 0; i < monthlyData.length; i++) {
      let item = monthlyData[i];
      let dateVal = new Date(item['date']);
      let month = dateVal.getMonth();
      let dayDate = dateVal.getDate();
      let monthDay = month + "/" + dayDate;
      monthlyData[i]['date'] = monthDay;
    }

    // Setting date axis for yearly data 
    for (let i = 0; i < yearlyData.length; i++) {
      let item = yearlyData[i];
      let dateVal = new Date(item['date']);
      let year = dateVal.getFullYear();
      let month = dateVal.getMonth();
      let yearMonth = month + "/" + year;
      yearlyData[i]['date'] = yearMonth;
    }

    this.setState({
      graphDataWeekly: weeklyData,
      graphDataMonthly: monthlyData,
      graphDataYearly: yearlyData,
      // Energy Cost
      energyCostThisWeek: parseFloat(thisWeek["energy_avg_week_cost"]).toFixed(2),
      energyCostLastWeek: parseFloat(pastWeek["energy_avg_week_cost"]).toFixed(2),

      energyCostThisMonth: 1004,
      energyCostLastMonth: 945,

      energyCostThisYear: 100304,
      energyCostLastYear: 584025,

      // Energy Imported
      energyImportedThisWeek: parseFloat(thisWeek["energy_avg_week_imported"]).toFixed(2),
      energyImportedLastWeek: parseFloat(pastWeek["energy_avg_week_imported"]).toFixed(2),

      energyImportedThisMonth: 10430,
      energyImportedLastMonth: 51392,

      energyImportedThisYear: 3959234,
      energyImportedLastYear: 2495393,

      // Energy Demand
      energyDemandThisWeek: parseFloat(thisWeek["energy_avg_week_imported"]).toFixed(2),
      energyDemandLastWeek: parseFloat(pastWeek["energy_avg_week_imported"]).toFixed(2),

      energyDemandThisMonth: 5935,
      energyDemandLastMonth: 2404,

      energyDemandThisYear: 40200,
      energyDemandLastYear: 24592,

      // C02 Emissions
      c02EmissionsThisWeek: parseFloat(thisWeek["carbon_avg_week_emitted"]).toFixed(2),
      c02EmissionsLastWeek: parseFloat(pastWeek["carbon_avg_week_emitted"]).toFixed(2),

      c02EmissionsThisMonth: 4355,
      c02EmissionsLastMonth: 6059,

      c02EmissionsThisYear: 25456,
      c02EmissionsLastYear: 21049,
    });

    this.setState({ dataUpdated: true });

  }

  render() {
    if (!this.state.dataUpdated) {
      return (

        <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
          <h1>loading...</h1>
        </div>);
    }
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
                  title={"This Week vs Past Week"}
                  unitGoesBefore={true}
                  unit="£"
                  forecastedData={this.state.energyCostThisWeek}
                  currentData={this.state.energyCostLastWeek}
                />
              </div>

              <div className="col p-0 mx-2">
                <ForecastingInfoBox
                  title={"This Month vs Past Month"}
                  unitGoesBefore={true}
                  unit="£"
                  forecastedData={this.state.energyCostThisMonth}
                  currentData={this.state.energyCostLastMonth}
                />
              </div>

              <div className="col p-0">
                <ForecastingInfoBox
                  title={"This Year vs Past Year"}
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
                <h2>Energy Demand and Importing</h2>
              </div>
            </div>

            {/* Energy Demand */}
            <div className="w-75 text-center">
              <h5>Energy Demand</h5>
            </div>
            <div className="row d-flex justify-content-around w-75 mb-2" >
              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Week"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyDemandThisWeek}
                  currentData={this.state.energyDemandLastWeek}
                />
              </div>

              <div className="col p-0 mx-2">
                <ForecastingInfoBox
                  title={"Past Month"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyDemandThisMonth}
                  currentData={this.state.energyDemandLastMonth}
                />
              </div>

              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Year"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyDemandThisYear}
                  currentData={this.state.energyDemandLastYear}
                />
              </div>

            </div>

            {/* Energy Imported */}
            <div className="w-75 text-center mt-2">
              <h5>Energy Imported</h5>
            </div>
            <div className="row d-flex justify-content-around w-75 mb-2" >
              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Week"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyImportedThisWeek}
                  currentData={this.state.energyImportedLastWeek}
                />
              </div>

              <div className="col p-0 mx-2">
                <ForecastingInfoBox
                  title={"Past Month"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyImportedThisMonth}
                  currentData={this.state.energyImportedLastMonth}
                />
              </div>

              <div className="col p-0">
                <ForecastingInfoBox
                  title={"Past Year"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.energyImportedThisYear}
                  currentData={this.state.energyImportedLastYear}
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
