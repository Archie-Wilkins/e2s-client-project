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
    //attempt to get user cookie
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

    //fetch site historical data via userID
    let data = {
      userID: userCookie.user.toString()
    }
    //sets options for API
    let JSONdata = JSON.stringify(data);
    let endpoint = '/api/getUserSite';
    let options = {method: 'POST', headers: {'Content-Type': 'application/json',}, body: JSONdata,}
    //fetches API to get user siteID
    let response = await fetch(endpoint, options)
    let result = await response.json();

    //if no site has been returned
    if(result.data.message === "no site"){
      alert("server error, no site found related to user")
      return;
    }

    //save siteID to state
    this.state.siteID = result.data.site;


    //fetch site data between 2021-01-09 - 2021-01-16, this is hard coded because we arent currently recieving live data
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

    //formats the data to be inserted into graph
    data = [
      { date: result[0].date.split("T")[0], demand: result[0].energy_demand },
      { date: result[1].date.split("T")[0], demand: result[1].energy_demand },
      { date: result[2].date.split("T")[0], demand: result[2].energy_demand },
      { date: result[3].date.split("T")[0], demand: result[3].energy_demand },
      { date: result[4].date.split("T")[0], demand: result[4].energy_demand },
      { date: result[5].date.split("T")[0], demand: result[5].energy_demand },
      { date: result[6].date.split("T")[0], demand: result[6].energy_demand },
    ]

    //sets State to refresh page with new data
    this.state.data = data;
    this.setState({ data: data });
    //updates value to make the page render the graph
    this.state.dataUpdated = true;

    //creates data object with siteID to be sent off to retrieve site details
    data = {siteID: this.state.siteID}
    JSONdata = JSON.stringify(data);
    endpoint = '/api/getSiteDetails';
    options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSONdata,
    }
    response = await fetch(endpoint, options)
    result = await response.json();

    //sets information boxes to have site details
    document.getElementById("siteName").innerText = result[0].site_name;
    document.getElementById("county").innerText = result[0].county;


    //API request to get reports for the site
    endpoint = '/api/getReportListData';
    options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSONdata,
    }
    response = await fetch(endpoint, options)
    result = await response.json();


    //initialise variables
    let Monday;
    let listHtml = "";
    let currentSite = "";
    let id = 0;

    //filter JSON to only contain curren site (via site_id)
    var site_filter = result.filter( element => element.site_id === parseInt(this.state.siteID));
    //loops through list of site data
    for (var record in await site_filter) {

      //splits the time_stamp into date and time
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

    //get reportsList html
    const list = document.getElementById("reportsList");

    //set innerHTML to list
    list.innerHTML = listHtml

    //function for buttons
    async function clickDetect(id) {
      //when button clicked hide dashboard and show card
      document.getElementById("compareCard").style.display = "flex";
      document.getElementById("page").style.display = "none";

      //get data from record
      const weekData = document.getElementById("data" + id).innerText;

      //split record data into start of week and end of week
      const [weekStart, weekEnd, siteID] = weekData.split("|");

      //set title of comparison
      document.getElementById("compareTitle").innerText = "Week " + weekStart + " compared to " + weekEnd;

      //creates object to convert to json
      let data = {
        siteID: siteID,
        dateStart: weekStart,
        dateEnd: weekEnd
      }
      let JSONdata = JSON.stringify(data);
      //API will get site data for the timeframe submitted (this week)
      let endpoint = '/api/getSiteWeekData';
      let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSONdata,
      }
      let response = await fetch(endpoint, options)
      let result = await response.json();

      //DB returns JSON wrapped in [] which javascript doesn't like
      //so we stringify it, remove [], then parse back to JSON
      let stringResult = JSON.stringify(result);
      stringResult = stringResult.replace("[", "");
      stringResult = stringResult.replace("]", "");
      result = JSON.parse(stringResult);

      //energy this week
      const thisEnergyUsage = result.energy_week_demand;

      //carbon this week
      const thisCarbonEmission = result.carbon_week_emitted;

      //expenditure this week
      const thisExpenditure = result.energy_week_cost;

      //once average data has been fetched change text in html
      document.getElementById("thisExpense").innerText = "£" + result.energy_week_cost;
      document.getElementById("thisEnergy").innerText = result.energy_week_demand + "Kw";
      document.getElementById("thisCarbon").innerText = result.carbon_week_emitted + "Kg";


      //got all current week data, begins to fetch previous week data

      //calculates the previous week's beginning
      const previousWeekStart = Date.parse(weekStart) - (7 * 24 * 60 * 60 * 1000);

      //calculates the previous week's end
      const previousWeekEnd = Date.parse(weekEnd) - (7 * 24 * 60 * 60 * 1000);

      //get previous week date and format it
      //format date function from: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
      function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + (d.getDate()),
            year = d.getFullYear();

        if (month.length < 2)
          month = '0' + month;
        if (day.length < 2)
          day = '0' + day;

        return [year, month, day].join('-');
      }


      //make api get previous siteweek data (uses function for correct format)
      data = {
        siteID: siteID,
        dateStart: formatDate(previousWeekStart),
        dateEnd: formatDate(previousWeekEnd)
      }
      JSONdata = JSON.stringify(data);
      endpoint = '/api/getSiteWeekData';
      options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSONdata,
      }
      response = await fetch(endpoint, options)
      result = await response.json();

      //result is JSON response of API
      //JSON holds previous weeks site data

      //once average data has been fetched change text in html
      document.getElementById("prevExpense").innerText = "£" + result[0].energy_week_cost;
      document.getElementById("prevEnergy").innerText = result[0].energy_week_demand + "Kw";
      document.getElementById("prevCarbon").innerText = result[0].carbon_week_emitted + "Kg";

      //calculate changes between this weke and previous week
      const thisEnergyChange = thisEnergyUsage - result[0].energy_week_demand;
      const thisCarbonEmissionChange = thisCarbonEmission - result[0].carbon_week_emitted;
      const thisExpenditureChange = thisExpenditure - result[0].energy_week_cost;

      //formats the text based on whether site has used/spent/emitted more or less of each metric
      //for energy usage change
      if (thisEnergyChange < 0){
        document.getElementById("energyChange").innerText = -thisEnergyChange + "Kw";
        document.getElementById("energyText").innerText = "less than previous week";
      } else {
        document.getElementById("energyChange").innerText = thisEnergyChange + "Kw";
        document.getElementById("energyText").innerText = "more than previous week";
      }
      //for carbon emission change
      if (thisCarbonEmissionChange < 0){
        document.getElementById("carbonChange").innerText = -thisCarbonEmissionChange + "Kg";
        document.getElementById("carbonText").innerText = "less than previous week";
      } else {
        document.getElementById("carbonChange").innerText = thisCarbonEmissionChange + "Kg";
        document.getElementById("carbonText").innerText = "more than previous week";
      }
      //for expenditure change
      if (thisExpenditureChange < 0){
        document.getElementById("spentChange").innerText = "£" + -thisExpenditureChange;
        document.getElementById("spentText").innerText = "less than previous week";
      } else {
        document.getElementById("spentChange").innerText = "£" + thisExpenditureChange;
        document.getElementById("spentText").innerText = "more than previous week";
      }


      //API request to get site weekly averages
      data = {siteID: siteID}
      JSONdata = JSON.stringify(data);
      endpoint = '/api/getSiteHistoricalData';
      options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSONdata,
      }
      response = await fetch(endpoint, options)
      result = await response.json();
      stringResult = JSON.stringify(result);
      stringResult = stringResult.replace("[", "");
      stringResult = stringResult.replace("]", "");
      result = JSON.parse(stringResult);

      //once average data has been fetched change text in html
      document.getElementById("avgExpense").innerText = "£" + result.energy_avg_week_cost;
      document.getElementById("avgEnergy").innerText = result.energy_avg_week_demand + "Kw";
      document.getElementById("avgCarbon").innerText = result.carbon_avg_week_emitted + "Kg";

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

  //close button on compare card
  closeCompare = async () => {
    document.getElementById("compareCard").style.display = "none";
    document.getElementById("page").style.display = "block";
  }


  render() {
    //will return loading data... while react/nextjs fetches data in "componentDidMount()"
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
        <div className="esmSiteCardHolder" id="compareCard" aria-label="report card">
          <div className="esmCompareWeeks">
              <div className="esmCompareBanner">
                <p aria-label="report card title" id="compareTitle"></p>
                <div aria-label="close report card button" className="esmBannerExit" onClick={this.closeCompare}>X</div>
              </div>
            <p/>
            <table aria-label="comparison table">
              <thead>
              <tr className="reportsListHeader">
                <th className="esmTableHeader">ThisWeek</th>
                <th className="esmTableHeader">PrevWeek</th>
                <th className="esmTableHeader">SiteAvgWeek</th>
              </tr>
              </thead>
              <tbody id="list">
                <tr className="esmTableRow">
                  <td className="esmTableData" aria-label="energy used this selected week" id="thisEnergy"></td>
                  <td className="esmTableData" aria-label="energy used previous week" id="prevEnergy"></td>
                  <td className="esmTableData" aria-label="average energy used weekly" id="avgEnergy"></td>
                </tr>
                <tr className="esmTableRow">
                  <td className="esmTableData" aria-label="carbon emitted this selected week" id="thisCarbon"></td>
                  <td className="esmTableData" aria-label="carbon emitted previous week" id="prevCarbon"></td>
                  <td className="esmTableData" aria-label="average energy used weekly" id="avgCarbon"></td>
                </tr>
                <tr className="esmTableRow">
                  <td className="esmTableData" aria-label="expenditure this selected week" id="thisExpense"></td>
                  <td className="esmTableData" aria-label="expenditure previous week" id="prevExpense"></td>
                  <td className="esmTableData" aria-label="average weekly expenditure" id="avgExpense"></td>
                </tr>
              </tbody>
            </table>
            <div className="esmCompareContainer">
              <div className="esmCompareInfo" aria-label="energy comparison">
                <div className="esmCompareTitle">You have used</div>
                <div className="esmCompareText" id="energyChange">42134</div>
                <div className="esmCompareTitle" id="energyText">more than last week</div>
              </div>
              <div className="esmCompareInfo" aria-label="carbon comparison">
                <div className="esmCompareTitle">You have emitted</div>
                <div className="esmCompareText" id="carbonChange">42134</div>
                <div className="esmCompareTitle" id="carbonText">more than last week</div>
              </div>
              <div className="esmCompareInfo" aria-label="expenditure comparison">
                <div className="esmCompareTitle">You have spent</div>
                <div className="esmCompareText" id="spentChange">42134</div>
                <div className="esmCompareTitle" id="spentText">more than last week</div>
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
              <h3 className="esmPanelHeader" aria-label="insights card">Insights</h3>
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
            <div className="esmDashboardPanel esmSpecificGrid" aria-label="weekly reports card">
              <h3 className="esmPanelHeader">Reports</h3>
              <div className="esmPanelListContainer" id="reportsList">
              {/*  reports are inputted here*/}
              </div>
            </div>
            <div className="esmBottomPanel" aria-label="site information card">
              <div className="esmBottomPanelInfo" aria-label="site name">
                <div>Site:</div>
                <p id="siteName"></p>
              </div>
              <div className="esmBottomPanelInfo" aria-label="site county">
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
