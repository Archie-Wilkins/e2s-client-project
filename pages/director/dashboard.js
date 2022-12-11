import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import React, { useLayoutEffect } from "react";
import Cookies from "js-cookie";

// This is the dashboard component for admins
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // This is a variable used to decide whether to render all businesses, or jsut one
      businessRequested: false,

      // This variable tracks which business has been selected by the Admin to be viewed
      chosenBusinessId: 0,

      // Variable to track whether data pulled from database is ready to be rendered
      displayDBData: false,

      // Array to store all users registered to the site
      siteUserArray: [],

      // Array to store all sites registered to the site
      siteDataArray: [],

      // The page name rendered in the top nav-bar
      pageName: "Director Hub",

      // Variable to define the user on the page as an Admin for any dynamic components or permissions
      isAdmin: false,

      // Variable to define the user on the page as not a Director for any dynamic components or permissions
      isDirector: true,

      userName: "",
      
    };
  }

  // This function handles rendering the business data associated with a selected row in the table dataset.
  handleBusinessRender(businessId) {
    // Update the boolean variable state used to determine whether to render a specific business to true.
    this.setState({ businessRequested: true });

    // Update the state of the variable tracking which business has been selected by the Admin for viewing.
    this.setState({ chosenBusinessId: businessId });
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

  // This fucntion handles returning back to the default view of all businesses from the currently viewed business
  handleReturn() {
    // Update the boolean variable state used to determine whether to render a specific business to false,
    // by default rendering all businesses.
    this.setState({ businessRequested: false });
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

      //catch erros
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
              <h2>Your site's performance</h2>
              <hr/>

              <div>
                <div>
                  <h3>Insights</h3>
                  <div>
                    <div>Insight 1</div>
                    <div>Insight 2</div>
                    <div>Insight 3</div>
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