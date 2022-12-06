import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";
import React, { useLayoutEffect } from 'react';
import Cookies from 'js-cookie';

// This is the dashboard component for admins
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      // This is a variable used to decide whether to render all businesses, or jsut one
      businessRequested: false,

      // This variable tracks which business has been selected by the Admin to be viewed
      chosenBusinessId: 0,

      displayDBData: false,
      
      siteDataArray: [],

      pageName: 'Admin Hub',

      isAdmin: true,

      isDirector: false,

      // This is a mock dataset used to pull values from to render until the database is connected
      employees: [
        //{id: 0, sites: [{esm: "ray romano", site: "staton island"},{esm: "debrah", site: "nemos"}], business: "New York Times"},
        {id: 1, business: 'Larry\'s Birds', industry: 'Pets', director: 'Ray Romano', esms: ['Brad Garett', 'Sideshow Bob', 'Marie Frank'], sites: ['Cardiff City']},
        {id: 2, business: 'Michael\'s Jordans', industry: 'Sneakers', director: 'Kelsey Grammar', esms: ['Marris', 'Mel', 'Daphne'], sites: ['Liverpool Stadium', 'Birkenhead Produce']},
        {id: 3, business: 'Lionel Mess', industry: 'Catering', director: 'Stormzy', esms: ['Chance The Rapper', 'Childish Gambino', 'Earl Sweatshirt'], sites: ['Newport Abacws', 'Swansea University']},
      ]
    };
  }

  // This function handles rendering the business data associated with a selected row in the table dataset.
  handleBusinessRender(businessId) {

    // Update the boolean variable state used to determine whether to render a specific business to true.
    this.setState({ businessRequested: true });
    
    // Update the state of the variable tracking which business has been selected by the Admin for viewing.
    this.setState({chosenBusinessId: businessId});
  }

  returnAllUsersFromDatabaseApi = async (event) => {

    // Stop the form from submitting and refreshing the page.
    event.preventDefault();

    try{
      
        // API endpoint where we send form data.
        const endpoint = '../api/displayData';

        // Form the request for sending data to the server.
        const options = {
            // The method is POST because we are sending data.
            method: 'POST',
            // Tell the server we're sending JSON.
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();
        console.log(result.data.users);
        this.setState({siteDataArray: result.data.users});
        this.setState({displayDBData: true});

        
    } catch (e) {
        console.log("error");
    }

}

  // This fucntion handles returning back to the default view of all businesses from the currently viewed business
  handleReturn() {

    // Update the boolean variable state used to determine whether to render a specific business to false,
    // by default rendering all businesses.
    this.setState({ businessRequested: false });
  }

  checkUser = async (event) => {

    try {
        let userCookie = JSON.parse(Cookies.get().user);
        if (userCookie.role != 3){
          Cookies.remove('user');
          window.location = "/login";
      }
    } catch (e) {
        console.log(e);
    }

  }

  // Return the contents of the Admin Dashboard page.
  render() {
    return (
      <div div onLoad={this.checkUser} onMouseEnter={this.checkUser}>
        <MainLayout isAdmin={this.state.isAdmin} isDirector={this.state.isDirector} pageName={this.state.pageName}>
          <div className={"admin-header-container"}>
            <h1 className="dashboard-header">ADMIN DASHBOARD</h1>
            <hr className={"h1-underline"} />
            <p className={"dashboard-sub-header"}>Welcome to E2S, Admin.</p>
            <br />
            <div className={"admin-content"}>
              <div className="row">
                <div className="col-sm">
                  <div className={"business-section"}>
                    {this.state.displayDBData === true &&(
                      <div>
                        <table className="table table-hover">
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
                          {/*Map out the data from the mock database state to be rnedered in the table.*/}  
                          {this.state.siteDataArray.map((employee, index) => {
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
                      </div>
                    )}
                    {/*Check if the Admin has requested to view a specific business, and if not...*/}
                    {this.state.businessRequested === false && (
                      <div>
                        <h1>View All Businesses</h1><br/>
                        <button onClick={this.returnAllUsersFromDatabaseApi}>TEST</button>
                        {/*Display a table containing all businesses registered in the database.
                           The table is made repsonsive using Bootstrap.*/}
                        <table className="table table-hover">
                            {/*Column headers for the table. NOTE: only a small amount of data from
                               each business is siplayed here.*/}
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Business Name</th>
                                <th scope="col">Director</th>
                                <th scope={"col"}>View</th>
                              </tr>
                            </thead>
                          {/*Map out the data from the mock database state to be rnedered in the table.*/}  
                          {this.state.employees.map((employee, index) => {
                            return (
                              <tbody key={index}>
                                {/*Render each row using data from the given business index.*/}
                                <tr>
                                  <th scope="row">{employee.id}</th>
                                  <td>{employee.business}</td>
                                  <td>{employee.director}</td>
                                  {/*Call on the function to handle displaying data about a given business.*/}
                                  <td><button
                                        onClick={() =>
                                          this.handleBusinessRender(
                                            employee.id
                                            )
                                        }
                                      >
                                        Here
                                      </button></td>
                                </tr>
                              </tbody>
                            );   
                          })}
                        </table>
                      </div>
                    )}

                    {/*Check if the Admin has requested to view a specific business. If true...*/}
                    {this.state.businessRequested === true && (
                      <div className="businessSummaryBox">
                          {/*Display data from the given index of the mock database in the sections below.*/}
                          <p>ID: {this.state.employees[this.state.chosenBusinessId - 1].id}</p>
                          <h1>{this.state.employees[this.state.chosenBusinessId - 1].business}</h1>
                          <p>Industry: {this.state.employees[this.state.chosenBusinessId - 1].industry}</p>
                          <p>Director: {this.state.employees[this.state.chosenBusinessId - 1].director}</p>
                          <br/><h2>ESMs</h2>
                          {/*Map out all ESMs in a given business (as there may be more than one)*/}
                          {this.state.employees[this.state.chosenBusinessId-1].esms.map((esm, index) => {
                              return (
                                  <div key={index}>
                                    <p>{esm}</p>
                                  </div>
                                );
                              })}
                          <br/><h2>Sites</h2>
                          {/*Map out all sites in a given business (as there may be more than one)*/}
                          {this.state.employees[this.state.chosenBusinessId-1].sites.map((site, index) => {
                              return (
                                  <div key={index}>
                                    <p>{site}</p>
                                  </div>
                                );
                              })}
                              <hr />
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
              <div className="row">
                <div className="col-sm">
                  <h1>ONBOARDING</h1>
                  <p>
                    To onboard a new client go <Link href="#"> here</Link>
                  </p>
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
