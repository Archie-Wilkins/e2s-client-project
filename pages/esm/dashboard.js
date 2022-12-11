import Link from "next/link";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
// import EnergyCostForecastGraph from "../../public/components/graphs/toggleTimeChart";
// import StackGraph from "../../public/components/graphs/stackGraph";
import LineGraph from "../../public/components/graphs/lineGraph";
import ToggleStackChart from "../../public/components/graphs/toggleStackChart.js";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ForecastingInfoBox from "../../public/components/dataDisplayBox/forecastingInfoBox.js";
import React from "react";
import BottomFooter from "../../public/components/layouts/bottomFooter.js";
import Cookies from "js-cookie";

//https://codesandbox.io/s/github/reactchartjs/react-chartjs-2/tree/master/sandboxes/line/default?from-embed=&file=/App.tsx:1134-1173


class EsmDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDirector: false,
      pageName: "dashboard",
      data: [],
      dataUpdated: false,
      siteID: ""
    };
  }


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

    //fetch site historical data
    let data = {
      userID: userCookie.user.toString()
    }

    let JSONdata = JSON.stringify(data);
    let endpoint = '/api/getUserSite';
    let options = {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSONdata,}
    let response = await fetch(endpoint, options)
    let result = await response.json();

    console.log(result.data.site);

    if(result.data.message === "no site"){
      alert("server error, no site found related to user")
      return;
    }

    //save siteID to state
    this.state.siteID = result.data.site;


    //fetch site data between 2021-01-09 - 2021-01-16
    data = {
      siteID: this.state.siteID,
      dateStart: "2021-01-09",
      dateEnd: "2021-01-15"
    }
    JSONdata = JSON.stringify(data);
    //API will get site data for the timeframe submitted (this week)
    endpoint = '/api/getSiteDataTimeRangeDaily';
    options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSONdata,
    }
    response = await fetch(endpoint, options)
    result = await response.json();
    //DB returns JSON wrapped in [] which javascript doesn't like
    //so we stringify it, remove [], then parse back to JSON

    console.log(result);

    for(var day in result){
      console.log(result[day].date.split("T")[0]);
    }

    data = [
      { date: result[0].date.split("T")[0], demand: result[0].energy_demand },
      { date: result[1].date.split("T")[0], demand: result[1].energy_demand },
      { date: result[2].date.split("T")[0], demand: result[2].energy_demand },
      { date: result[3].date.split("T")[0], demand: result[3].energy_demand },
      { date: result[4].date.split("T")[0], demand: result[4].energy_demand },
      { date: result[5].date.split("T")[0], demand: result[5].energy_demand },
      { date: result[6].date.split("T")[0], demand: result[6].energy_demand },
    ]

    this.state.data = data;
    this.setState({ data: data });

    this.state.dataUpdated = true;

    // console.log(data);
    this.render();


    //fetch site reports and add to reports field
  }



  render() {
    if(!this.state.dataUpdated){
      return(<div></div>);
    }

    return (
      <div className="esmDashboardBackground">
        <MainLayout
          isDirector={this.state.isDirector}
          pageName={this.state.pageName}
        />
        <div className="esmDashboardGridContainer">
          <div className="esmDashboardGraphPanel">
            <h3 className="esmPanelHeader">Energy Demand</h3>
            <div className="esmGraphCard">
              <LineGraph
                  toggle1={"Week"}
                  toggle2={"Month"}
                  toggle3={"Year"}
                  dataSet={this.state.data}
                  xAxis={"Date"}
                  yAxis={"kW"}
                  xAxisDataKey={"date"}
                  yAxisDataKey={"demand"}
              />
            </div>
          </div>
          <div className="esmDashboardPanel">
            <h3 className="esmPanelHeader">Insights</h3>
            <div className="esmPanelListContainer">
              <div className="esmInsightCard">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
              </div>
              <div className="esmInsightCard">
                insight
              </div>
              <div className="esmInsightCard">
                insight
              </div>
              <div className="esmInsightCard">
                insight
              </div>
              <div className="esmInsightCard">
                insight
              </div>
              <div className="esmInsightCard">
                insight
              </div>
              <div className="esmInsightCard">
                insight
              </div>
              <div className="esmInsightCard">
                insight
              </div>
            </div>
          </div>
          <div className="esmDashboardPanel">
            <h3 className="esmPanelHeader">Reports</h3>
            <div className="esmPanelListContainer">
              <div className="esmReportCard">
                <p className="esmReportText">11/12/2022-18/12/2022</p>
                <button className="esmRecordDownloadBtn">send</button>
              </div>

              <div className="esmReportCard">
                <p className="esmReportText">11/12/2022-18/12/2022</p>
                <button className="esmRecordDownloadBtn">send</button>
              </div>

              <div className="esmReportCard">
                <p className="esmReportText">11/12/2022-18/12/2022</p>
                <button className="esmRecordDownloadBtn">send</button>
              </div>

            </div>
          </div>
          <div className="esmBottomPanel">
            <div className="esmBottomPanelInfo">
              <div>Site:</div>
              <p>McDonalds</p>
            </div>
            <div className="esmBottomPanelInfo">
              <div>County:</div>
              <p>Surrey</p>
            </div>
            <div className="esmBottomPanelInfo">
              <div>Organisation:</div>
              <p>Man With A Hammer</p>
            </div>
          </div>
        </div>


        {/*  /!* Energy Cost *!/*/}
        {/*  <div className="container d-flex flex-column align-items-center w-100">*/}
        {/*    <div className="row mt-5 w-75">*/}
        {/*      <div className="col-lg rounded text-center">*/}
        {/*        <h1>Dashboard</h1>*/}
        {/*      </div>*/}
        {/*    </div>*/}



        {/*    /!*<EnergyCostForecastGraph*!/*/}
        {/*    /!*  toggle1={"Week"}*!/*/}
        {/*    /!*  toggle2={"Month"}*!/*/}
        {/*    /!*  toggle3={"Year"}*!/*/}
        {/*    /!*  dataSet1={this.state.weeklyData}*!/*/}
        {/*    /!*  dataSet2={this.state.monthlyData}*!/*/}
        {/*    /!*  dataSet3={this.state.yearlyData}*!/*/}
        {/*    /!*  xAxis={"Date"}*!/*/}
        {/*    /!*  yAxis={"Cost (£)"}*!/*/}
        {/*    /!*  xAxisDataKey={"date"}*!/*/}
        {/*    /!*  yAxisDataKey={"cost"}*!/*/}
            {/*/>*/}
        {/*  </div>*/}
        {/*  /!* End of Energy Cost *!/*/}

        {/*  <BottomFooter className="mt-3" />*/}
        {/*</MainLayout>*/}
      </div>
    );
  }
}



export default EsmDashboard;
