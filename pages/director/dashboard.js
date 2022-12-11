import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { PieChart, Pie, Slice } from "recharts";

// This is the dashboard component for admins
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      sampleData: [
        {"name": "red", "value": 100},
        {"name": "amber", "value": 200},
        {"name": "green", "value": 300},
      ],

      // Array to store all sites registered to the site
      siteDataArray: [],

      // The page name rendered in the top nav-bar
      pageName: "Director Hub",

      // Variable to define the user on the page as an Admin for any dynamic components or permissions
      isAdmin: false,

      // Variable to define the user on the page as not a Director for any dynamic components or permissions
      isDirector: true,

      userName: "",

      userSite: "",

      insightOneData: "",
      insightTwoData: "",
      insightThreeData: "",
      insightFourData: "",
      insightFiveData: "",
      insightSixData: "",

      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

      // String used to record the first given date in uploaded CSV data.
      dataStartDate: "",

      // DATA BY ALL TIME
      // Variable for all time electricty used in uploaded CSV data.
      electrictyUsed: 0,
      
      // Variable for all time heat used in uploaded CSV data.
      heatUsed: 0,
      
      // Variable for all time energy exported in uploaded CSV data.
      energyExported: 0,
      
      // Variable for all time net energy used in uploaded CSV data (calculated by comparing site demand versus export).
      netEnergy: 0,
      
      // Variable for all time spending in uploaded CSV data.
      totalSpent: 0,

      // Variable to track energy usage of asset one over all uploaded time.   
      chpOneGeneration: 0,

      // Variable to track energy usage of asset two over all uploaded time.
      chpTwoGeneration: 0,
      
      // Variable for the number of days of data in uploaded CSV data.
      daysTracked: 0,

      // DATA BY DAY 
      // Variable for electricty used in the last day in uploaded CSV data.   
      electrictyUsedDay: 0,
      
      // Variable for heat used in the last day in uploaded CSV data.
      heatUsedDay: 0,
      
      // Variable for energy exported in the last day in uploaded CSV data.
      energyExportedDay: 0,
      
      // Variable for net energy use in the last day in uploaded CSV data.
      netEnergyDay: 0,
      
      // Variable for spending in the last day in uploaded CSV data.
      totalSpentDay: 0,

      // Variable to track energy usage of asset two over the last day.
      asset1UsageDay: 0,

      // Variable to track energy usage of asset two over the last day.
      asset2UsageDay: 0,

      // Boolean to assess whether the User has submitted a valid CSV file.
      isValidCsv: false,
      
      // Boolean to assess whether or not to return an error to the User when they try to upload their CSV.
      errorReturn: false,

      // Mock data to test cases wherein data for specified dates has already been uploaded.
      dates:{
        // The first selection reflects dates which will not have been uploaded yet by users for the purpose of testing.
        val: ["31/12/2020 23:32", "01/01/2020 00:02"],

        // The second selection reflects dates which will have been uploaded yet by users for the purpose of testing.
        val2: ["31/12/2020 23:30"],
      },

      // Variable to track which energy zone the energy site resides in.
      distributionNetwork: "EPN",

      // Variable to track the amount of energy usage time spent in red-zone periods.
      redZoneUsage: 0,

      // Variable to track the amount of energy usage time spent in red-zone periods.
      amberZoneUsage: 0,

      // Variable to track the amount of energy usage time spent in red-zone periods.
      greenZoneUsage: 0,

      // Variable to count how many rows of data are being accessed.
      numberOfDataRows:0,

      zonesArray: [],
      
    };
  }

  returnSiteInsightsApi = async (userId) => {
    try {
      // API endpoint where we send form data.
      const endpoint = "../api/getAllHistoricalSiteData";

      const currentUserId = userId;

      const data = {
        userID: userId,
      }

      const JSONdata = JSON.stringify(data);

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSONdata,
      }

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      const result = await response.json();
      this.setState({siteDataArray: result.data.sites});
      const localDate = new Date(result.data.sites[0].time_stamp);
      this.setState({dataStartDate: localDate.getFullYear() + " " + this.state.months[localDate.getMonth()]});
      
      let electrictyTally = 0;
      let heatTally = 0;
      let energyExportTally = 0;
      let cumulativeSpending = 0;
      let redZonePeriodTally = 0.0;
      let amberZonePeriodTally = 0.0;
      let greenZonePeriodTally = 0.0;

      let dayTracker = 1;
      let timeSlotsChecked = 0;

      for(let i = 0; i < result.data.sites.length; i++){
        electrictyTally = electrictyTally + result.data.sites[i].energy_demand;
        heatTally = heatTally + result.data.sites[i].heat_demand;
        energyExportTally = energyExportTally + result.data.sites[i].energy_exported;
        cumulativeSpending = cumulativeSpending + result.data.sites[i].energy_cost;

        try{
          if(this.state.distributionNetwork === "EPN"){

            // Check if the day is Monday through Friday.
            if(dayTracker < 6){

                // If it is, create a substring from the date handed in the csv.
                let dateTime = new Date(result.data.sites[i].time_stamp);

                // Evaluate which time period the time falls between.
                if(dateTime.getHours() >= 16 && dateTime.getHours() <= 19){
                    // Increment counters to track how many periods of time were using which tariff of cost.
                    redZonePeriodTally = redZonePeriodTally + (result.data.sites[i].energy_demand-result.data.sites[i].energy_exported);
                }
                if((dateTime.getHours() >= 7 && dateTime.getHours() < 16) || (dateTime.getHours() > 19 && dateTime.getHours() <= 23)){
                  amberZonePeriodTally = amberZonePeriodTally + (result.data.sites[i].energy_demand-result.data.sites[i].energy_exported);
                }if(dateTime.getHours() > 23 || dateTime.getHours() < 7 || dateTime.getHours() === 0){
                  greenZonePeriodTally = greenZonePeriodTally + (result.data.sites[i].energy_demand-result.data.sites[i].energy_exported);
                }
            }

            else if(dayTracker === 6 || dayTracker === 7){

                // If it is Saturday or Sunday, there price will only ever be green zone. 
                greenZonePeriodTally = greenZonePeriodTally + (result.data.sites[i].energy_demand-result.data.sites[i].energy_exported);
            }


            // If 48 time slots have been checked, an entire day of data has been passed.
            if(timeSlotsChecked == 48){
                
                // Check if it is Sunday (Monday - 1, Tuesday - 2, ..., Sunday - 7).
                if(dayTracker < 7){

                    // Move the day tracker forward a day.
                    dayTracker = dayTracker + 1;
                }

                if(dayTracker === 7){

                    // If the day is Sunday, reset it to Monday after all slots have been checked.
                    dayTracker = 1;
                }

                // Reset the number of slots checked for a day.
                timeSlotsChecked = 0;
            }

            else if(timeSlotsChecked < 48){
                // Increment the number of slots checked for the day.
                timeSlotsChecked = timeSlotsChecked + 1;
            }
            
          }
        }catch(e){
          console.log("error");
        }

      }

      this.setState({electrictyUsed: electrictyTally});
      this.setState({heatUsed: heatTally});
      this.setState({energyExported: energyExportTally});
      this.setState({netEnergy: electrictyTally - energyExportTally});
      this.setState({totalSpent: cumulativeSpending});
      this.setState({redZoneUsage: redZonePeriodTally});
      this.setState({amberZoneUsage: amberZonePeriodTally});
      this.setState({greenZoneUsage: greenZonePeriodTally});

      redZonePeriodTally = redZonePeriodTally;
      amberZonePeriodTally = amberZonePeriodTally;
      greenZonePeriodTally =  greenZonePeriodTally;

      const redZ = parseFloat(redZonePeriodTally).toFixed(2);
      console.log("Red not an issue: " + redZ);
      const ambZ = parseFloat(amberZonePeriodTally).toFixed(2);
      console.log("Amber not an issue: " + ambZ);
      const greZ = parseFloat(greenZonePeriodTally).toFixed(2);
      console.log("Green not an issue: " + greZ);

      let localZonesArray = [
        {"name": "redzone", "value": parseFloat(redZ), fill: "#FF0000"},
        {"name": "amberzone", "value": parseFloat(ambZ), fill: "#FFA500"},
        {"name": "greenzone", "value": parseFloat(greZ), fill: "#00FF00"},
      ];

      this.setState({zonesArray: localZonesArray});
    } catch (e) {
      // No action
    }
  }

  returnUserDetailsApi = async (userId) => {
    try {
      // API endpoint where we send form data.
      const endpoint = "../api/getUserDetails";

      const currentUserId = userId;

      const data = {
        userID: userId,
      }

      const JSONdata = JSON.stringify(data);

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSONdata,
      }

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      const result = await response.json();

      // Set the state array for users to the data returned from calling the API (users from the database).
      this.setState({ userName: result[0].first_name + " " + result[0].last_name });

    } catch (e) {
      // No action
    }
  }

  returnSiteDetailsApi = async (userId) => {
    try {

      // API endpoint where we send form data.
      const endpoint = "../api/getUserSite";

      const data = {
        userID: userId,
      }

      const JSONdata = JSON.stringify(data);

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
      
        body: JSONdata,
      }

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      const result = await response.json();

      console.log(result.data);

      // Set the state array for users to the data returned from calling the API (users from the database).
      this.setState({ userSite: result.data.site });

    } catch (e) {
      // No action
    }
  }

  // Funtion used to validate user priveleges from the login page and remove cookies. It is also used to initialise data on the page.
  async componentDidMount() {
    //will check user is allowed on this page first
    // Attempt to parse a user cookie
    try {
      // Initialise the user cookie
      let userCookie = JSON.parse(Cookies.get().user);

      // If the user has the incorrect credentials for the page, remove them
      if (userCookie.role != 2) {
        Cookies.remove("user");
        window.location = "/login";
      }

      await this.returnUserDetailsApi(userCookie.user);
      await this.returnSiteDetailsApi(userCookie.user);
      await this.returnSiteInsightsApi();

      //catch errors
    } catch (e) {
      // No cookie found
      //return to login
      window.location = "/login";
    }

  };

  // Return the contents of the Admin Dashboard page.
  render() {
    return (
      // On laoding the main div, call the function to validate user priveleges and initialise data to be rendered
      <div aria-label="admin dashboard content">
        {/*Utilise a navbar with values based on the role of the current user*/}
        <MainLayout
          isAdmin={this.state.isAdmin}
          isDirector={this.state.isDirector}
          pageName={this.state.pageName}
        >
          <div className={"director-content-container"} aria-label="director dashboard body">
            <div>
              <h1 className="dashboard-header">Director Dashboard</h1>
              <hr className={"h1-underline"} />
              <p className={"dashboard-sub-header"}>Welcome to your dashboard {this.state.userName}.</p>
              
            </div>
            <div className={"directorContent"} aria-label="director dashboard section container">
              <h2>{this.state.userSite}</h2>
              <hr/>

              <div>
                <div>
                  <h3>Insights</h3>
                  <div className="flexContainer">
                    <p>Start date: {this.state.dataStartDate}</p>
                    <p>Energy Distribution Network: {this.state.distributionNetwork}</p>

                    <div className="flexBox w-125 h-100">
                      <PieChart width={400} height={200}>
                        <Pie data={this.state.zonesArray} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#fff" label>
                        </Pie>  
                      </PieChart>
                      {this.state.redZoneUsage > this.state.greenZoneUsage &&(
                        <div>
                          {this.state.redZoneUsage > this.state.amberZoneUsage &&(
                            <p> Most of your energy use was during red-zone periods.  Consider changing your energy usage times
                            and find out <Link href="/about"> more </Link> about zone pricing to see how you could save
                            money.</p>
                          )}
                          {this.state.amberZoneUsage > this.state.redZoneUsage &&(
                            <p> Most of your energy use was during amber-zone periods.  Consider changing your energy usage times
                            and find out <Link href="/about"> more </Link> about zone pricing to see how you could save
                            money.</p>
                          )}
                        </div>  
                      )}
                      {this.state.greenZoneUsage > this.state.redZoneUsage &&(
                        <div>
                          {this.state.greenZoneUsage > this.state.amberZoneUsage &&(
                            <p> Well done! Most of your energy has been during green-zone periods. Find out <Link href="/about"> 
                            more </Link> about zone pricing to see how you could save money.</p>
                          )}
                          {this.state.amberZoneUsage > this.state.greenZoneUsage &&(
                            <p> Most of your energy use was during amber-zone periods.  Consider changing your energy usage times
                            and find out <Link href="/about"> more </Link> about zone pricing to see how you could save
                            money.</p>
                          )}
                        </div>  
                      )}
                    </div>

                    <div className="flexBox"><p>Energy Demand</p> 
                    {parseFloat(this.state.electrictyUsed).toFixed(0)} KwH
                    {this.state.insightOneData}
                    </div>
                    <div className="flexBox"><p>Heat Demand</p> 
                    {parseFloat(this.state.heatUsed).toFixed(0)} KwH
                    {this.state.insightTwoData}
                    </div>
                    <div className="flexBox"><p>Energy Exported</p> 
                    {parseFloat(this.state.energyExported).toFixed(0)} KwH
                    {this.state.insightThreeData}
                    </div>
                    <div className="flexBox"><p>Net Energy Use</p> 
                    {parseFloat(this.state.netEnergy).toFixed(0)} KwH
                    {this.state.insightFourData}
                    </div>
                    <div className="flexBox"><p>Spending</p> 
                    £{parseFloat(this.state.totalSpent).toFixed(2)}
                    {this.state.insightFiveData}
                    </div>
                    <div className="flexBox"><p>Insight 6</p> 
                    {this.state.insightSixData}
                    </div>
                  </div>
                </div>

                <div>
                  <h3>Graph Performance</h3>
                  GRAPH
                </div>
              </div>
            </div>
          </div>
        </MainLayout>
      </div>
    );
  }
}

export default Dashboard;

////////////////////////////////////////////////////////////////////////////////////////////////////////////TOMORROW
/////                  ///////////////////                   /////////////////                      ///////TODAY   *
////      ///////////////////////////////  ///////////////   ////////////////    ///////////////////////// *TOMORROW
///                   ///////////////////////////////    //////////////////                     /////////TOMORROW *
//       /////////////////////////////////////       ////////  ///////////////////////////    //////////TODAY *    *
//                   ///////////////////                      /////////                      //////////   * TOMORROW
//////////////////////////////////////////////////////////////////////////////////////////////////////DAY    TOMORROW