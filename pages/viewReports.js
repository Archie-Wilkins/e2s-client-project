import Link from "next/link"
import React from "react";
import NavBar from '../public/components/layouts/publicTopNav'


class ViewReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site: "",
            list: {}
        };
    }

    async componentDidMount() {






        //TO-DO list
        //- create front end DONE
        //create filter boxes (non-functional at this moment) DONE
        //create table to show data DONE



        //create event to fill table with dummy data:
        //    break into get site weeks
        //  - get organisation name
        //  - get site name
        //  - get site location
        //  - get weeks
        //download button will download dummy data
        //create filtering
        //replace both table data and download data with real database data


        //get list of all sites

        //get Site name
        //Site location
        //Weeks available for reporting
        //Add download button for each week
        //clicking download will download the CSV data for that week



    }

    getData = async () => {
        try {
            //generate data to be sent off (required for API fetch even if not needed)
            const data = {sample: "s"};
            const JSONdata = JSON.stringify(data);

            //API request to get all sites
            let endpoint = '/api/getAllSites';
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSONdata,
            }
            let response = await fetch(endpoint, options)

            let sites = await response.json();


            //if response returned no data
            if (sites === ""){
                alert("database pull failed");
                return;
            }





            //API request to get site details
            endpoint = '/api/getReportListData';
            options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSONdata,
            }
            response = await fetch(endpoint, options)
            this.state.list = await response.json();

            // var data_filter = result.filter( element => element.site_id === parseInt())
            // console.log(data_filter)

            //if response returned no data
            if (this.state.list === ""){
                alert("database pull failed");
                return;
            }

            //logic for fetching data
            //loop through all records

            let weekArray = [];
            let Monday;
            let listHtml = "";
            let currentSite = "";

            for(var site in await sites) {
                //alert(sites[site].site_id);
                currentSite = sites[site].site_id;
                //let siteOnly = JSON.parse(result.filter(({element}) => element.site_id === currentSite));
                var site_filter = this.state.list.filter( element => element.site_id === parseInt(currentSite));
                console.log(site_filter);
                for (var record in await site_filter) {
                    let [date, time] = site_filter[record].time_stamp.split("T");
                    const [year, month, day] = date.split('-');

                    let days = new Date(date);

                    //if day is a monday
                    if (site_filter[record].site_id === currentSite && days.getDay() === 1) {
                        //store monday's date
                        Monday = date;
                    }

                    //if day is a sunday
                    if (site_filter[record].site_id === currentSite && days.getDay() === 0) {
                        //end week
                        //and push the monday & sunday to array
                        if (days.getDay() + new Date(Monday).getDay() === 1) {
                            weekArray.push(Monday + " - " + date + " : " + site_filter[record].site_name);
                            listHtml = listHtml + '<tr class="reportListRow"><td class="reportListRowText">' + site_filter[record].name + '</td><td class="reportListRowText">' + site_filter[record].site_name + '</td><td class="reportListRowText">' + site_filter[record].county + '</td><td class="reportListRowText">' + Monday + ' - ' + date + '</td><td class="reportButtonHolder"><button class="reportDownloadButton">download</button></td></tr>'
                        }
                    }
                }
            }
            console.log(weekArray);
            const list = document.getElementById("list");

            //list.innerHTML = '<tr class="reportListRow"><td class="reportListRowText">Organisation</td><td class="reportListRowText">Site Name</td><td class="reportListRowText">Site Location</td><td class="reportListRowText">Dates Data Available</td><td class="reportButtonHolder"><button class="reportDownloadButton">download</button></td></tr>'

            list.innerHTML = listHtml;

            console.log(weekArray);
        } catch (e) {
            alert("error: " + e);
        }
    }




    render() {
        return <div aria-label="view reports page">
            <NavBar></NavBar>
            <div className="reportBackground greyBackground">

                <div aria-label="view reports container" className="reportsContainer">
                    <h4 className="m-3 fw-bold">Site Data</h4>
                    <p className="m-2 m-lg-3 fw-bold">Filters</p>
                    <div className="reportFilterContainer">
                        <div className="reportFilterElement">
                            <p className="reportFilterText">Organisation name</p>
                            <input className="reportFilterBox" />
                        </div>
                        <div className="reportFilterElement">
                            <p className="reportFilterText">Site name</p>
                            <input className="reportFilterBox" />
                        </div>
                        <div className="reportFilterElement">
                            <p className="reportFilterText">Site location</p>
                            <input className="reportFilterBox" />
                        </div>
                        <div className="reportFilterElement">
                            <p className="reportFilterText">Dates available</p>
                            <input className="reportFilterBox" />
                        </div>
                        <button className="filterReportsButton" onClick={this.getData}>Filter</button>
                        <p className="resultsText">Results: </p><p className="resultsText fw-normal">20 of 224</p>
                    </div>
                    <div className="centerHorizontally">
                        <div className="reportsListContainer">
                            <table>
                                <thead>
                                <tr className="reportsListHeader">
                                    <th className="reportHeaderText">Organisation</th>
                                    <th className="reportHeaderText">Site Name</th>
                                    <th className="reportHeaderText">Site Location</th>
                                    <th className="reportHeaderText">Dates Data Available</th>
                                    <th className="reportHeaderText">Download Data (CSV)</th>
                                </tr>
                                </thead>
                                <tbody id="list" className="reportDataList">
                                {/*<tr className="reportListRow">*/}
                                {/*    <td className="reportListRowText">Organisation</td>*/}
                                {/*    <td className="reportListRowText">Site Name</td>*/}
                                {/*    <td className="reportListRowText">Site Location</td>*/}
                                {/*    <td className="reportListRowText">Dates Data Available</td>*/}
                                {/*    <td className="reportButtonHolder"><button className="reportDownloadButton">download</button></td>*/}
                                {/*</tr>*/}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    }

}


export default ViewReportsPage