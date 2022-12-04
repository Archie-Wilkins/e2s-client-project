import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import React from "react";
import MainLayout from "../../public/components/layouts/mainLayoutShell.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenBusinessRowArray: [],
      businessRequested: false,
      chosenId: 0,
      employees: [
        //{id: 0, sites: [{esm: "ray romano", site: "staton island"},{esm: "debrah", site: "nemos"}], business: "New York Times"},
        {id: 1, business: 'Larry\'s Birds', industry: 'Pets', director: 'Ray Romano', esms: ['Brad Garett', 'Sideshow Bob', 'Marie Frank'], sites: ['Cardiff City']},
        {id: 2, business: 'Michael\'s Jordans', industry: 'Sneakers', director: 'Kelsey Grammar', esms: ['Marris', 'Mel', 'Daphne'], sites: ['Liverpool Stadium', 'Birkenhead Produce']},
        {id: 3, business: 'Lionel Mess', industry: 'Catering', director: 'Stormzy', esms: ['Chance The Rapper', 'Childish Gambino', 'Earl Sweatshirt'], sites: ['Newport Abacws', 'Swansea University']},
      ]
    };
  }

  handleBusinessRender(businessId) {
    console.log("Business: " + businessId);
    this.setState({ businessRequested: true });
    this.setState({chosenId: businessId});
  }

  handleReturn() {
    this.setState({ chosenBusinessRowArray: [] });
    this.setState({ businessRequested: false });
  }

  render() {
    return (
      <div>
        <MainLayout isAdmin={true} pageName={"Admin Hub"}>
          <div className={"admin-header-container"}>
            <h1 className="dashboard-header">ADMIN DASHBOARD</h1>
            <hr className={"h1-underline"} />
            <p className={"dashboard-sub-header"}>Welcome to E2S, Admin.</p>
            <br />
            <div className={"admin-content"}>
              <div className="row">
                <div className="col-sm">
                  <div className={"business-section"}>
                    {this.state.businessRequested === false && (
                      <div>
                        <h1>View All Businesses</h1><br/>

                        <table className="table table-hover">
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Business Name</th>
                                <th scope="col">Director</th>
                                <th scope={"col"}>View</th>
                              </tr>
                            </thead>
                            
                          {this.state.employees.map((employee, index) => {
                            return (
                              <tbody key={index}>
                                <tr>
                                  <th scope="row">{employee.id}</th>
                                  <td>{employee.business}</td>
                                  <td>{employee.director}</td>
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
                    {this.state.businessRequested === true && (
                      <div className="businessSummaryBox">
                          <p>ID: {this.state.employees[this.state.chosenId - 1].id}</p>
                          <h1>{this.state.employees[this.state.chosenId - 1].business}</h1>
                          <p>Industry: {this.state.employees[this.state.chosenId - 1].industry}</p>
                          <p>Director: {this.state.employees[this.state.chosenId - 1].director}</p>
                          <br/><h2>ESMs</h2>
                          {this.state.employees[this.state.chosenId-1].esms.map((esm, index) => {
                              return (
                                  <div key={index}>
                                    <p>{esm}</p>
                                  </div>
                                );
                              })}
                          <br/><h2>Sites</h2>
                          {this.state.employees[this.state.chosenId-1].sites.map((site, index) => {
                              return (
                                  <div key={index}>
                                    <p>{site}</p>
                                  </div>
                                );
                              })}
                              <hr />
                        <br />
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
