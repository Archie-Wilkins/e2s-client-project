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
      <div div onLoad={this.checkUser} onMouseEnter={this.checkUser}>
        {/*Utilise a navbar with values based on the role of the current user*/}
        <MainLayout
          isAdmin={this.state.isAdmin}
          isDirector={this.state.isDirector}
          pageName={this.state.pageName}
        >
          <div className={"admin-header-container"}>
            <h1 className="dashboard-header">ADMIN DASHBOARD</h1>
            <hr className={"h1-underline"} />
            <p className={"dashboard-sub-header"}>Welcome to E2S, Admin.</p>
            <br />
            <div className={"admin-content"}>
              <div className="row">
                <div className="col-sm">
                  <div className={"business-section"}>
                    {/*Section to display all registered users */}
                    <h1>View All Users</h1>
                    <br />
                    {/*If the data is not ready to be rendered, show the user a laoding message */}
                    {this.state.displayDBData === false && (
                      <div>
                        <h1>FETCHING DATA...</h1>
                        <br />
                      </div>
                    )}

                    {/*Once the data is ready to be rendered, load it in */}
                    {this.state.displayDBData === true && (
                      <div>
                        {/*Table for user details */}
                        <table className="table table-hover" name="userTable">
                          {/*Column headers for the table. NOTE: only a small amount of data from
                               each business is siplayed here.*/}
                          <thead>
                            <tr>
                              <th scope="col">User ID</th>
                              <th scope="col">Email</th>
                              <th scope="col">Firstname</th>
                              <th scope="col">Surname</th>
                              <th scope={"col"}>Phone Number</th>
                              <th scope={"col"}>Role</th>
                            </tr>
                          </thead>
                          {/*Map out the data from the atabase state to be rendered in the table.*/}
                          {this.state.siteUserArray.map((employee, index) => {
                            return (
                              <tbody key={index}>
                                {/*Render each row using data from the given business index.*/}
                                <tr>
                                  <th scope="row">{employee.user_id}</th>
                                  <td>{employee.email}</td>
                                  <td>{employee.first_name}</td>
                                  <td>{employee.last_name}</td>
                                  <td>{employee.phone_number}</td>
                                  <td>{employee.role_id}</td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>

                        {/*If the user has not requested to see a specific business, show them all businesses with limited information */}
                        {this.state.businessRequested === false && (
                          <div aria-label="view all businesses section">
                            <br />
                            <h1>View All Businesses</h1>
                            <table
                              className="table table-hover"
                              name="siteTable"
                              data-testid="businessTable"
                            >
                              {/*Column headers for the table. NOTE: a reduced amount of data from
                                    each business is displayed here.*/}
                              <thead>
                                <tr>
                                  <th scope="col">Site ID</th>
                                  <th scope="col">Site Name</th>
                                  <th scope="col">Postcode</th>
                                  <th scope={"col"}>County</th>
                                  <th scope={"col"}>Site Size </th>
                                  <th scope="col">View</th>
                                </tr>
                              </thead>
                              {/*Map out the data from the mock database state to be rendered in the table.*/}
                              {this.state.siteDataArray.map(
                                (employee, index) => {
                                  return (
                                    <tbody key={index}>
                                      {/*Render each row using data from the given business index.*/}
                                      <tr>
                                        <th scope="row">{employee.site_id}</th>
                                        <td>{employee.site_name}</td>
                                        <td>{employee.post_code}</td>
                                        <td>{employee.county}</td>
                                        <td>
                                          {employee.site_size_x *
                                            employee.site_size_y}{" "}
                                          sq. ft
                                        </td>
                                        {/*A button to show more information about a site based on the site row clicked */}
                                        <td>
                                          <button
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
                      <div className="businessSummaryBox">
                        {/*Display data from the given index of the mock database in the sections below.*/}
                        <p>
                          ID:{" "}
                          {
                            this.state.siteDataArray[
                              this.state.chosenBusinessId - 1
                            ].site_id
                          }
                        </p>
                        <h1>
                          {
                            this.state.siteDataArray[
                              this.state.chosenBusinessId - 1
                            ].site_name
                          }
                        </h1>
                        <p>
                          Postcode:{" "}
                          {
                            this.state.siteDataArray[
                              this.state.chosenBusinessId - 1
                            ].post_code
                          }
                        </p>
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
                        <p>
                          County:{" "}
                          {
                            this.state.siteDataArray[
                              this.state.chosenBusinessId - 1
                            ].county
                          }
                        </p>
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
                        <br />
                        <br />
                        {/*Call the function to handle returning the Admin's view back to the default of all businesses*/}
                        <button onClick={() => this.handleReturn()}>
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
