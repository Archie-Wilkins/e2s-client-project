import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import ToggleDataChart from "../../public/components/graphs/toggleDataChart.js";
import ForecastingInfoBox from "../../public/components/dataDisplayBox/forecastingInfoBox.js";
import React from "react";
import Cookies from "js-cookie";

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

      yearlyData: [
        { date: "Dec", cost: 400, c02: 153, energyUsage: 143 },
        { date: "Jan", cost: 415, c02: 145, energyUsage: 200 },
        { date: "Feb", cost: 460, c02: 131, energyUsage: 180 },
        { date: "Mar", cost: 501, c02: 115, energyUsage: 300 },
        { date: "Apr", cost: 446, c02: 165, energyUsage: 330 },
        { date: "May", cost: 608, c02: 135, energyUsage: 210 },
        { date: "Jun", cost: 608, c02: 138, energyUsage: 170 },
        { date: "Jul", cost: 620, c02: 165, energyUsage: 200 },
        { date: "Aug", cost: 630, c02: 175, energyUsage: 156 },
        { date: "Sep", cost: 640, c02: 185, energyUsage: 260 },
        { date: "Oct", cost: 645, c02: 175, energyUsage: 253 },
        { date: "Nov", cost: 633, c02: 165, energyUsage: 252 },
        { date: "Dec", cost: 640, c02: 165, energyUsage: 270 },
      ],

      CurrentEnergyCost: 43569,
      PredictedEnergyCost: 51034,

      CurrentEnergyUsage: 49140,
      PredictedEnergyUsage: 40114,

      CurrentC02Emissions: 1043,
      PredictedC02Emissions: 1104,
    };
  }
  // Funtion used to validate user priveleges from the login page and remove cookies. It is also used to initialise data on the page.
  async componentDidMount() {
    //will check user is allowed on this page first
    // Attempt to parse a user cookie
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
      if (userCookie.role === 4) {
        Cookies.remove("user");
        window.location = "/login";
      }

      //catch errors
    } catch (e) {
      // No cookie found
      //return to login
      window.location = "/login";
    }

  };

  render() {
    return (
      <div>
        <MainLayout
          isDirector={this.state.isDirector}
          pageName={this.state.pageName}
        >
          {/* Forecastings for next 12 months */}
          <div className="d-flex flex-column align-items-center w-100">
            <div className="mt-3 w-75">
              <div className="rounded text-center">
                <h2>Forecastings for next 12 months</h2>
              </div>
            </div>

            <div className="w-75 ">

              <div className="w-100 vh-60 mb-3 p-3 whiteBackground rounded">
                {/* Don't ask why but this needs to be here otherwise 
                  the graph doesnt display
                */}
                <h3></h3>
                <ToggleDataChart
              toggle1={"Energy Costs"}
              toggle2={"Energy Usage"}
              toggle3={"C02 Emissions"}
              dataSet={this.state.yearlyData}
              // Graph 1
              xAxis1={"Date"}
              yAxis1={"Cost (£)"}
              xAxisDataKey1={"date"}
              yAxisDataKey1={"cost"}
              // Graph 2
              xAxis2={"Date"}
              yAxis2={"Energy Usage (Mw/h)"}
              xAxisDataKey2={"date"}
              yAxisDataKey2={"energyUsage"}
              // Graph 3
              xAxis3={"Date"}
              yAxis3={"C02 Emissions (Kg)"}
              xAxisDataKey3={"date"}
              yAxisDataKey3={"c02"}
            />
              </div>

            </div>



            <div className="my-2 mb-5 w-75 d-flex justify-content-around">

                <ForecastingInfoBox
                  title={"Predicted Energy Cost In 12 Months"}
                  unitGoesBefore={true}
                  unit="£"
                  forecastedData={this.state.PredictedEnergyCost}
                  currentData={this.state.CurrentEnergyCost}
                />

              <div className="mx-2">
                <ForecastingInfoBox
                  title={"Predicted Energy Usage In 12 Months"}
                  unitGoesBefore={false}
                  unit="Kw/h"
                  forecastedData={this.state.CurrentEnergyUsage}
                  currentData={this.state.PredictedEnergyUsage}
                />
              </div>

                <ForecastingInfoBox
                  title={"Predicted C02 Emissions In 12 Months"}
                  unitGoesBefore={false}
                  unit="Kg"
                  forecastedData={this.state.CurrentC02Emissions}
                  currentData={this.state.PredictedC02Emissions}
                />
              </div>
            </div>

          {/* End of Forecastings for next 12 months */}
        </MainLayout>
      </div>
    );
  }
}

export default Forecasting;
