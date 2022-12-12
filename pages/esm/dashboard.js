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

    //this.render();



    data = {
      siteID: this.state.siteID
    }
    JSONdata = JSON.stringify(data);
    //API will get site data for the timeframe submitted (this week)
    endpoint = '/api/getSiteDetails';
    options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSONdata,
    }
    response = await fetch(endpoint, options)
    result = await response.json();

    console.log(result);

    document.getElementById("siteName").innerText = result[0].site_name;

    document.getElementById("county").innerText = result[0].county;
    // document.getElementById("orgName")



    //REPORTS HERE

    //generate data to be sent off (required for API fetch even if not needed)
    //API request to get site details
    endpoint = '/api/getReportListData';
    options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSONdata,
    }
    response = await fetch(endpoint, options)
    result = await response.json();


    let Monday;
    let listHtml = "";
    let currentSite = "";
    let id = 0;

    var site_filter = result.filter( element => element.site_id === parseInt(this.state.siteID));
    //loops through list of site data
    for (var record in await site_filter) {
      //splits the time_stamp into date and time

      if (site_filter[record].time_stamp === null) {
        alert(JSON.stringify(site_filter[record]));
      }
      let [date, time] = site_filter[record].time_stamp.split("T");
      //converts string "date" into Date object
      let days = new Date(date);

      //if day is a monday
      if (days.getDay() === 1) {
        //store monday's date
        Monday = date;
      }

      //if day is a sunday
      if (days.getDay() === 0) {
        //end week and add new HTML record
        //increment id for new record
        id++;
        if (days.getDay() + new Date(Monday).getDay() === 1) {
          //listHtml gets a new row added to it
          listHtml = listHtml + '<div class="esmReportCard">' +
              '<p class="esmReportText">' + Monday + ' - ' + date + '</p>' +
              '<div id="data'+ id +'" style="display: none">' + Monday + '|' + date + "|" + this.state.siteID + '</div>' +
              '<button class="esmRecordDownloadBtn" id="btn'+ id +'">compare</button></div>'

          //data relating to record is hidden in this <div> above
        }
      }
    }





    const list = document.getElementById("reportsList");

    list.innerHTML = listHtml

    //fetch site reports and add to reports field

    //stream reports into elements in listHTML

    //add click listeners to function



    //button function

    async function clickDetect(id) {
      document.getElementById("compareCard").style.display = "flex";
      document.getElementById("page").style.display = "none";

      const weekData = document.getElementById("data" + id).innerText;

      //split record data into start of week and end of week
      const [weekStart, weekEnd, siteID] = weekData.split("|");

      //stored the data in an object to be sent to API
      const data = {
        siteID: siteID,
        dateStart: weekStart,
        dateEnd: weekEnd
      }
      let JSONdata = JSON.stringify(data);
      let endpoint = '/api/getSiteTimeframeData';
      let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSONdata,
      }
      let response = await fetch(endpoint, options)
      let result = await response.json();

      alert(result);

    }


    //loops up to id/record count
    for (let i = 1; i < id+1; i++){
      try{
        //fetches button and add's onClick function to them
        let btn = document.getElementById("btn"+i);
        btn.addEventListener('click', function (){
          clickDetect(i);
        });
      } catch (e) {}
    }


  }

  closeCompare = async () => {
    document.getElementById("compareCard").style.display = "none";
    document.getElementById("page").style.display = "block";
  }




  render() {
    if(!this.state.dataUpdated){
      return(<div>loading data...</div>);
    }

    return (
      <div className="esmDashboardBackground">
        <MainLayout
            isDirector={this.state.isDirector}
            pageName={this.state.pageName}
            id="gridContainer"
        />
        <div className="esmSiteCardHolder" id="compareCard">
          <div className="esmCompareWeeks">
              <div className="esmCompareBanner">
                <p> 12/12/2022 compared to 05/12/2022</p>
                <div className="esmBannerExit" onClick={this.closeCompare}>X</div>
              </div>
            <p/>
            <table>
              <thead>
              <tr className="reportsListHeader">
                <th className="esmTableHeader">ThisWeek</th>
                <th className="esmTableHeader">PrevWeek</th>
                <th className="esmTableHeader">SiteAvgWeek</th>
              </tr>
              </thead>
              <tbody id="list">
                <tr className="esmTableRow">
                  <td className="esmTableData">2631kW</td>
                  <td className="esmTableData">2653kW</td>
                  <td className="esmTableData">2623kW</td>
                </tr>
                <tr className="esmTableRow">
                  <td className="esmTableData">2321Kg</td>
                  <td className="esmTableData">2441Kg</td>
                  <td className="esmTableData">5322Kg</td>
                </tr>
                <tr className="esmTableRow">
                  <td className="esmTableData">£23123</td>
                  <td className="esmTableData">£21313</td>
                  <td className="esmTableData">£21123</td>
                </tr>
              </tbody>
            </table>
            <div className="esmCompareContainer">
              <div className="esmCompareInfo">
                <div className="esmCompareTitle">Energy Demand Change</div>
                <div className="esmCompareText">+42134</div>
              </div>
              <div className="esmCompareInfo">
                <div className="esmCompareTitle">Carbon Emission Change</div>
                <div className="esmCompareText">+42134</div>
              </div>
              <div className="esmCompareInfo">
                <div className="esmCompareTitle">Energy Expenditure Change</div>
                <div className="esmCompareText">+42134</div>
              </div>
            </div>
          </div>
        </div>

        <div id="page">
          <div className="esmDashboardGridContainer" id="gridContainer">
            <div className="esmDashboardGraphPanel" aria-label="graph panel">
              <h3 className="esmPanelHeader"  aria-label="Energy demand">Energy Demand</h3>
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
                    aria-label="This week energy graph"
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
                  Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old
                </div>
                <div className="esmInsightCard">
                  Latin words, consectetur, from a Lorem Ipsum passage, and going through
                </div>
                <div className="esmInsightCard">
                  Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero
                </div>
                <div className="esmInsightCard">
                  Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero
                </div>
              </div>
            </div>
            <div className="esmDashboardPanel esmSpecificGrid">
              <h3 className="esmPanelHeader">Reports</h3>
              <div className="esmPanelListContainer" id="reportsList">
                <div className="esmReportCard">
                  <p className="esmReportText">11/12/2022-18/12/2022</p>
                  <button className="esmRecordDownloadBtn">compare</button>
                </div>
              </div>
            </div>
            <div className="esmBottomPanel">
              <div className="esmBottomPanelInfo">
                <div>Site:</div>
                <p id="siteName"></p>
              </div>
              <div className="esmBottomPanelInfo">
                <div>County:</div>
                <p id="county"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default EsmDashboard;
