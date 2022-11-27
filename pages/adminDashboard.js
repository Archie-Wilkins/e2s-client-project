
function AdminHub(){
    return <div>
        <div className={"dashboard-header"}>
            <h1>ADMIN DASHBOARD</h1>
            <hr className={"h1-underline"}/>
            <p className={"dashboard-sub-header"}>Welcome to E2S, Admin.</p>
        </div>
        <div className={"admin-content"}>
            <div className="row">
                <div className="col-sm">
                    <div className={"business-section"}>
                        <h3>View All Businesses</h3>
                        <table className="table table-hover table-responsive">
                            <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Business Name</th>
                                <th scope="col">Industry</th>
                                <th scope="col">Director</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark's Tools</td>
                                <td>Agriculture</td>
                                <td>Komodo Dragon</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Brodie</td>
                                <td>Wayne</td>
                                <td>@batman</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div><br/>
            <div className={"row"}>
                <div className="col-sm">
                    <div className={"calendar-section"}>
                        <h3>Your previous onboardings</h3>
                        <table className="table table-hover table-responsive">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Brodie</td>
                                <td>Wayne</td>
                                <td>@batman</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div><br/>
            <div className={"row"}>
                <div className="col-sm">
                    <div className={"calendar-section"}>
                        <h3>Your upcoming onboarding dates</h3>
                        <table className="table table-hover table-responsive">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">4</th>
                                <td>Brodie</td>
                                <td>Wayne</td>
                                <td>@batman</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default AdminHub