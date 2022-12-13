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

      // Array to store all sites registered to the site
      siteDataArray: [],

      // The page name rendered in the top nav-bar
      pageName: "Zone Pricing Help Page",

      // Variable to define the user on the page as an Admin for any dynamic components or permissions
      isAdmin: false,

      // Variable to define the user on the page as not a Director for any dynamic components or permissions
      isDirector: false,

      ednSectionOpen: true,

      peakTimesSectionOpen: false,

      priceZoneInfoSectionOpen: false,

      helpSectionOpen: false, 
      
    };
  }

  expandEdnContent = async () =>
  {
    if(this.state.ednSectionOpen){
        this.setState({ednSectionOpen: false});
    }else{
        this.setState({ednSectionOpen: true});
    }
  }

  expandPeakSection = async () =>
  {
    if(this.state.peakTimesSectionOpen){
        this.setState({peakTimesSectionOpen: false});
    }else{
        this.setState({peakTimesSectionOpen: true});
    }
  }

  expandZoneSection = async () =>
  {
    if(this.state.priceZoneInfoSectionOpen){
        this.setState({priceZoneInfoSectionOpen: false});
    }else{
        this.setState({priceZoneInfoSectionOpen: true});
    }
  }

  expandHelpSection = async () =>
  {
    if(this.state.helpSectionOpen){
        this.setState({helpSectionOpen: false});
    }else{
        this.setState({helpSectionOpen: true});
    }
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
            <div className="graphBox">
              <h1 className="dashboard-header">Zone Pricing</h1>
              <p className={"dashboard-sub-header"}>What is it?</p>
              
            </div>
            <div className={"directorContent"} aria-label="director dashboard section container">
              <hr/>
              <div>
                <div>
                  <div className="flexContainer">
                    <div>
                    <h3 className="articleHeader">Energy Distribution Networks<button onClick={this.expandEdnContent}>Expand</button></h3>
                        {this.state.ednSectionOpen &&(
                            <div>
                                <p>First, to understand price zones, we need to understand <b>Energy Distribution Networks (EDN)</b>.</p>
                                <p>An EDN is an a network of powerline infastructure operated by a <b>Distribution Network Operator</b> 
                                <Link href="https://www.nationalgrid.com/electricity-transmission/contact-us/who-is-my-distribution-network-operator">(DNO)</Link>.
                                Transmission companies such as The National Grid are tasked with sending high amounts of electricty across long distances for 
                                DNOs constantly.
                                </p>
                                <hr/>
                            </div>  
                        )}
                      

                        <h3 className="articleHeader">Peak Times <button onClick={this.expandPeakSection}>Expand</button></h3>
                        {this.state.peakTimesSectionOpen &&(
                            <div>
                                <p>When energy demand is particularly high, during the middle of the day on a weekday for example,
                                EDNs will add a sometimes significant premium to the cost of use for a number of hours. The good news is that 
                                no companies set red-zone prices on weekends. 
                                </p>
                                <hr/>
                            </div>
                        )}

                        <h3 className="articleHeader">What are price zones? <button onClick={this.expandZoneSection}>Expand</button></h3>
                        {this.state.priceZoneInfoSectionOpen &&(
                            <div>
                                <p><b>Red Band/Red Zone:</b> Typically <b>16:00 - 19:00</b> on <b>weekdays</b>. Represents the most expensive tariffs and
                            highest demand for energy across the country. </p>
                        <p><b>Amber Band/Amber Zone:</b> Typically <b>07:00 - 16:00</b> and <b>19:00 - 23:00</b> on <b>weekdays</b>. Represents the second most 
                            expensive tariffs and moderate demand for energy across the country. </p> 
                        <p><b>Green Band/Green Zone</b>: Typically <b>00:00 - 07:00</b> on <b>weekdays</b> and <b>all day on weekends</b>. Represents the cheapest
                           tariffs and low demand for energy across the country. </p> 
                           <hr/>
                            </div>
                        )}
       
                        <h3 className="articleHeader">What can I do? <button onClick={this.expandHelpSection}>Expand</button></h3>
                        {this.state.helpSectionOpen &&(
                            <div>
                                <p>Avoid high demand times! By trading off the convenience of typical operational hours of
                                energy usage on your site, you could possibly offset thousands in energy bills. Use our robust
                                energy usage metrics to find out when you are using energy and how you could start saving.  
                                </p>
                                <hr/>
                            </div>
                        )}

                    </div>

                  </div>
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