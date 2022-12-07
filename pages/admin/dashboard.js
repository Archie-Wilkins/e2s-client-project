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
      pageName: "Admin Hub",

      // Variable to define the user on the page as an Admin for any dynamic components or permissions
      isAdmin: true,

      // Variable to define the user on the page as not a Director for any dynamic components or permissions
      isDirector: false,

      // This is a mock dataset used to pull values from to render until the database is connected
      employees: [
        //{id: 0, sites: [{esm: "ray romano", site: "staton island"},{esm: "debrah", site: "nemos"}], business: "New York Times"},
        {
          id: 1,
          business: "Larry's Birds",
          industry: "Pets",
          director: "Ray Romano",
          esms: ["Brad Garett", "Sideshow Bob", "Marie Frank"],
          sites: ["Cardiff City"],
        },
        {
          id: 2,
          business: "Michael's Jordans",
          industry: "Sneakers",
          director: "Kelsey Grammar",
          esms: ["Marris", "Mel", "Daphne"],
          sites: ["Liverpool Stadium", "Birkenhead Produce"],
        },
        {
          id: 3,
          business: "Lionel Mess",
          industry: "Catering",
          director: "Stormzy",
          esms: ["Chance The Rapper", "Childish Gambino", "Earl Sweatshirt"],
          sites: ["Newport Abacws", "Swansea University"],
        },
      ],
    };
  }

  // This function handles rendering the business data associated with a selected row in the table dataset.
  handleBusinessRender(businessId) {
    // Update the boolean variable state used to determine whether to render a specific business to true.
    this.setState({ businessRequested: true });

    // Update the state of the variable tracking which business has been selected by the Admin for viewing.
    this.setState({ chosenBusinessId: businessId });
  }

  returnAllUsersFromDatabaseApi = async (event) => {
    // Use try catch in case the API cannot be reached.
    try {
      // API endpoint where we send form data.
      const endpoint = "../api/displayData";

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      const result = await response.json();

      // Set the state array for users to the data returned from calling the API (users from the database).
      this.setState({ siteUserArray: result.data.users });

      // Set the state of the variable tracking whether data is ready to be rendered to true
      this.setState({ displayDBData: true });

      // Handle any caught errors or responses which come from trying to access the API
    } catch (e) {
      // Return an error message to the user
    }
  };

  // Asynchronous function to collect all registered sites from the database.
  returnAllSitesFromDatabaseApi = async (event) => {
    try {
      // API endpoint where we send form data.
      const endpoint = "../api/returnSiteData";

      // Form the request for sending data to the server.
      const options = {
        // The method is POST because we are sending data.
        method: "POST",
        // Tell the server we're sending JSON.
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Send the form data to our forms API on Vercel and get a response.
      const response = await fetch(endpoint, options);

      // Get the response data from server as JSON.
      const result = await response.json();

      // Set the state array for users to the data returned from calling the API (users from the database).
      this.setState({ siteDataArray: result.data.sites });

      // Set the state of the variable tracking whether data is ready to be rendered to true
      this.setState({ displayDBData: true });
    } catch (e) {
      // No action
    }
  };

  // This fucntion handles returning back to the default view of all businesses from the currently viewed business
  handleReturn() {
    // Update the boolean variable state used to determine whether to render a specific business to false,
    // by default rendering all businesses.
    this.setState({ businessRequested: false });
  }

  // Funtion used to validate user priveleges from the login page and remove cookies. It is also used to initialise data on the page.
  checkUser = async (event) => {
    // Attempt to parse a user cookie
    try {
      // Initialise the user cookie
      let userCookie = JSON.parse(Cookies.get().user);

      // If the user has the incorrect credentials for the page, remove them
      if (userCookie.role != 3) {
        Cookies.remove("user");
        window.location = "/login";
      }
      //catch erros
    } catch (e) {
      // No action
    }

    // Wait for the async function to complete returning user data from the database
    await this.returnAllUsersFromDatabaseApi();

    // Wait for the async function to complete returning site data from the database
    await this.returnAllSitesFromDatabaseApi();
  };

  // Return the contents of the Admin Dashboard page.
  render() {
    return (
      // On laoding the main div, call the function to validate user priveleges and initialise data to be rendered
      <div onLoad={this.checkUser} onMouseEnter={this.checkUser} aria-label="admin dashboard content">
        {/*Utilise a navbar with values based on the role of the current user*/}
        <MainLayout
          isAdmin={this.state.isAdmin}
          isDirector={this.state.isDirector}
          pageName={this.state.pageName}
        >
          <div className={"admin-content-container"} aria-label="admin dashboard body">
            <h1 className="dashboard-header">ADMIN DASHBOARD</h1>
            <hr className={"h1-underline"} />
            <p className={"dashboard-sub-header"}>Welcome to E2S, Admin.</p>
            <br />
            <div className={"admin-content"} aria-label="admin dashboard section container">
              <div className="row">
                <div className="col-sm">
                  <div className={"business-section"} aria-label="view registered data section">
                    {/*Section to display all registered users */}
                    <h1>View All Users</h1>
                    <br />
                    {/*If the data is not ready to be rendered, show the user a laoding message */}
                    {this.state.displayDBData === false && (
                      <div aria-label="fetching data section">
                        <h1>FETCHING DATA...</h1>
                        <br />
                      </div>
                    )}

                    {/*Once the data is ready to be rendered, load it in */}
                    {this.state.displayDBData === true && (
                      <div aria-label="registered users section">
                        {/*Table for user details */}
                        <table className="table table-hover" name="userTable" aria-label="users table">
                          {/*Column headers for the table. NOTE: only a small amount of data from
                               each business is siplayed here.*/}
                          <thead aria-label="users table headers">
                            <tr>
                              <th scope="col" aria-label="user ID column">User ID</th>
                              <th scope="col" aria-label="user email column">Email</th>
                              <th scope="col" aria-label="user firstname column">Firstname</th>
                              <th scope="col" aria-label="user surname column">Surname</th>
                              <th scope="col" aria-label="user phone number column">Phone Number</th>
                              <th scope="col" aria-label="user role column">Role</th>
                            </tr>
                          </thead>
                          {/*Map out the data from the atabase state to be rendered in the table.*/}
                          {this.state.siteUserArray.map((employee, index) => {
                            return (
                              <tbody key={index} aria-label="user table body">
                                {/*Render each row using data from the given business index.*/}
                                <tr aria-label="user table row">
                                  <th scope="row" aria-label="user id data">{employee.user_id}</th>
                                  <td aria-label="user id data">{employee.email}</td>
                                  <td aria-label="user firstname data">{employee.first_name}</td>
                                  <td aria-label="user surname data">{employee.last_name}</td>
                                  <td aria-label="user phone number data">{employee.phone_number}</td>
                                  <td aria-label="user role data">{employee.role_id}</td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>

                        {/*If the user has not requested to see a specific business, show them all businesses with limited information */}
                        {this.state.businessRequested === false && (
                          <div aria-label="registered energy sites section">
                            <br />
                            <h1>View All Businesses</h1>
                            <table
                              className="table table-hover"
                              name="siteTable"
                              data-testid="businessTable"
                              aria-label="site table"
                            >
                              {/*Column headers for the table. NOTE: a reduced amount of data from
                                    each business is displayed here.*/}
                              <thead aria-label="energy site table headers">
                                <tr>
                                  <th scope="col" aria-label="site ID column">Site ID</th>
                                  <th scope="col" aria-label="site name column">Site Name</th>
                                  <th scope="col" aria-label="site postcode column">Postcode</th>
                                  <th scope="col" aria-label="site county column">County</th>
                                  <th scope="col" aria-label="site size column">Site Size </th>
                                  <th scope="col" aria-label="view more site details column">View</th>
                                </tr>
                              </thead>
                              {/*Map out the data from the mock database state to be rendered in the table.*/}
                              {this.state.siteDataArray.map(
                                (employee, index) => {
                                  return (
                                    <tbody key={index} aria-label="site table body">
                                      {/*Render each row using data from the given business index.*/}
                                      <tr aria-label="site table row">
                                        <th scope="row" aria-label="site ID data">{employee.site_id}</th>
                                        <td aria-label="site name data">{employee.site_name}</td>
                                        <td aria-label="site postcode data">{employee.post_code}</td>
                                        <td aria-label="site county data">{employee.county}</td>
                                        <td aria-label="site size data">
                                          {employee.site_size_x *
                                            employee.site_size_y}{" "}
                                          sq. ft
                                        </td>
                                        {/*A button to show more information about a site based on the site row clicked */}
                                        <td>
                                          <button aria-label="expand business details button"
                                            onClick={() =>
                                              this.handleBusinessRender(
                                                employee.site_id
                                              )
                                            }
                                          >
                                            Here
                                          </button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  );
                                }
                              )}
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                    <br />

                    {/*Check if the Admin has requested to view a specific business. If true...*/}
                    {this.state.businessRequested === true && (
                      <div className="businessSummaryBox" aria-label="registered sites section">
                        {/*Display data from the given index of the mock database in the sections below.*/}
                        <div aria-label="site ID">
                          <p>
                            ID:{" "}
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].site_id
                            }
                          </p>
                        </div>
                        <div aria-label="site name">
                          <h1>
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].site_name
                            }
                          </h1>
                        </div>
                        <div aria-label="site post code">
                          <p>
                            Postcode:{" "}
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].post_code
                            }
                          </p>
                        </div>
                        <div aria-label="site address first line">
                          <p>
                            Address:{" "}
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].address_l1
                            }
                            ,{" "}
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].address_l2
                            }
                          </p>
                        </div>
                        <div aria-label="site address second line">
                          <p>
                            County:{" "}
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].county
                            }
                          </p>
                        </div>
                        <div aria-label="site size in square feet">
                          <p>
                            Site Size:{" "}
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].site_size_x
                            }
                            ,{" "}
                            {
                              this.state.siteDataArray[
                                this.state.chosenBusinessId - 1
                              ].site_size_y
                            }
                          </p>
                        </div>
                        <br />
                        <br />
                        {/*Call the function to handle returning the Admin's view back to the default of all businesses*/}
                        <button onClick={() => this.handleReturn()} aria-label="return to all sites view">
                          Back
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <br />
              <br />
            </div>
          </div>
        </MainLayout>
      </div>
    );
  }
}

export default Dashboard;

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/////                  /////////////////                   /////////////////                      ///////
////      /////////////////////////////     /////////      ////////////////    /////////////////////////
///                   /////////////////////////////////   ////////////////                       //////
//       ///////////////////////////////                 ///////////////////////////////////    //////
//                     ///////////////                       /////////////                      /////
////////////////////////////////////////////////////////////////////////////////////////////////////