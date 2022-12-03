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

  /*handleBusinessRender(businessName) {
    this.setState({ businessRequested: true });

    for (let i = 0; i < businessName.length; i++) {
      this.state.chosenBusinessRowArray.push(businessName[i].innerText);
    }
  }*/

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
                        <div className="customTable">
                        {this.state.employees.map((employee, index) => {
                          return (
                            <div key={index}>
                              <h2>ID: {employee.id}</h2>
                              <h2>Business: {employee.business}</h2>
                              <h2>Director: {employee.director}</h2>
                              <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        employee.id
                                        )
                                    }
                                  >
                                    Here
                                  </button>
                              <hr />
                            </div>
                          );
                        })}
                        </div>

                        <div className="tableHolder">
                          <table
                            className="table table-hover table-responsive"
                            height="100"
                            data-testid="businessTable"
                          >
                            <thead>
                              <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Business Name</th>
                                <th scope="col">Industry</th>
                                <th scope="col">Director</th>
                                <th scope={"col"}>View</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th name="r1" scope="row">
                                  1
                                </th>
                                <td name="r1" id={"row1Business"}>
                                  Mark's Tools
                                </td>
                                <td name={"r1"}>Agriculture</td>
                                <td name={"r1"}>Komodo Dragon</td>
                                <td name={"r1"}>
                                  <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        document.getElementsByName("r1")
                                      )
                                    }
                                  >
                                    Here
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th name={"r2"} scope="row">
                                  2
                                </th>
                                <td name={"r2"}>Jakob's Ladders</td>
                                <td name={"r2"}>Furniture</td>
                                <td name={"r2"}>Jason Todd</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        document.getElementsByName("r2")
                                      )
                                    }
                                  >
                                    Here
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th name="r3" scope="row">
                                  3
                                </th>
                                <td name={"r3"} colSpan={"1"}>
                                  Larry's Birds
                                </td>
                                <td name={"r3"}>Pets</td>
                                <td name={"r3"}>Michael Jordan</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        document.getElementsByName("r3")
                                      )
                                    }
                                  >
                                    Here
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th name={"r4"} scope="row">
                                  4
                                </th>
                                <td name={"r4"}>Ace Chemicals</td>
                                <td name={"r4"}>Chemicals</td>
                                <td name={"r4"}>Jack Napier</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        document.getElementsByName("r4")
                                      )
                                    }
                                  >
                                    Here
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th name="r5" scope="row">
                                  5
                                </th>
                                <td name={"r5"}>Ace Chemicals</td>
                                <td name={"r5"}>Chemicals</td>
                                <td name={"r5"}>Jack Napier</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        document.getElementsByName("r5")
                                      )
                                    }
                                  >
                                    Here
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th name="r5" scope="row">
                                  6
                                </th>
                                <td name={"r5"}>Ace Chemicals</td>
                                <td name={"r5"}>Chemicals</td>
                                <td name={"r5"}>Jack Napier</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        document.getElementsByName("r5")
                                      )
                                    }
                                  >
                                    Here
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <th name="r5" scope="row">
                                  7
                                </th>
                                <td name={"r5"}>Ace Chemicals</td>
                                <td name={"r5"}>Chemicals</td>
                                <td name={"r5"}>Jack Napier</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      this.handleBusinessRender(
                                        document.getElementsByName("r5")
                                      )
                                    }
                                  >
                                    Here
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {this.state.businessRequested === true && (
                      <div className="businessSummaryBox">
                          <h1>ID: {this.state.employees[this.state.chosenId - 1].id}</h1>
                          <h1>Business: {this.state.employees[this.state.chosenId - 1].business}</h1>
                          <h1>Industry: {this.state.employees[this.state.chosenId - 1].industry}</h1>
                          <h1>Director: {this.state.employees[this.state.chosenId - 1].director}</h1>
                          {this.state.employees[this.state.chosenId-1].esms.map((esm, index) => {
                                return (
                                  <div key={index}>
                                    <h2>ESM: {esm}</h2>
                                  </div>
                                );
                              })}
                              {this.state.employees[this.state.chosenId-1].sites.map((site, index) => {
                                return (
                                  <div key={index}>
                                    <h2>Site: {site}</h2>
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
