import Link from "next/link"
import React from "react";
import NavBar from '../public/components/layouts/publicTopNav'


class ViewReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site: "",
            list: {},
            sites: {},
            filteredList: []
        }
    }

    async componentDidMount() {
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

            this.state.sites = await response.json();


            //if response returned no data
            if (this.state.sites === ""){
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
            let countEntries = 0;

            for(var site in await this.state.sites) {
                //alert(sites[site].site_id);
                currentSite = this.state.sites[site].site_id;
                //let siteOnly = JSON.parse(result.filter(({element}) => element.site_id === currentSite));
                var site_filter = this.state.list.filter( element => element.site_id === parseInt(currentSite));
                for (var record in await site_filter) {
                    let [date, time] = site_filter[record].time_stamp.split("T");

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
                            countEntries++;
                            weekArray.push(Monday + " - " + date + " : " + site_filter[record].site_name);
                            listHtml = listHtml + '<tr class="reportListRow"><td class="reportListRowText">' + site_filter[record].name + '</td><td class="reportListRowText">' + site_filter[record].site_name + '</td><td class="reportListRowText">' + site_filter[record].county + '</td><td class="reportListRowText">' + Monday + ' - ' + date + '</td><td class="reportButtonHolder"><button class="reportDownloadButton">download</button></td></tr>'
                        }
                    }
                }
            }
            const list = document.getElementById("list");


            document.getElementById("resultsNumber").innerText = countEntries + " of " + countEntries;

            //list.innerHTML = '<tr class="reportListRow"><td class="reportListRowText">Organisation</td><td class="reportListRowText">Site Name</td><td class="reportListRowText">Site Location</td><td class="reportListRowText">Dates Data Available</td><td class="reportButtonHolder"><button class="reportDownloadButton">download</button></td></tr>'

            list.innerHTML = listHtml;

        } catch (e) {
            alert("error: " + e);
        }
    }


    filter = async () => {

        const list = document.getElementById("list");
        list.innerHTML = "";

        //have a state variable for each filter, if vlaue is not empty dont bother filtering it

        const orgFilter = document.getElementById("org").value;
        const nameFilter = document.getElementById("name").value;
        const countyFilter = document.getElementById("county").value;
        const dateFilter = document.getElementById("date").value;

        this.state.filteredList = this.state.list;

        if (orgFilter !== ""){
            this.state.filteredList = this.state.list.filter( element => element.name.includes(orgFilter));
            console.log(this.state.filteredList);
        }
        if (nameFilter !== ""){
            this.state.filteredList = this.state.filteredList.filter( element => element.site_name.includes(nameFilter));
        }
        if (countyFilter !== ""){
            this.state.filteredList = this.state.filteredList.filter( element => element.county.includes(countyFilter));
        }
        if (dateFilter !== ""){
            this.state.filteredList = this.state.filteredList.filter( element => element.time_stamp.includes(dateFilter));
        }



        let Monday;
        let listHtml = "";
        let currentSite = "";

        for(var site in this.state.sites) {
            //alert(sites[site].site_id);
            currentSite = this.state.sites[site].site_id;
            //let siteOnly = JSON.parse(result.filter(({element}) => element.site_id === currentSite));
            var site_filter = this.state.filteredList.filter( element => element.site_id === parseInt(currentSite));
            for (var record in await site_filter) {
                let [date, time] = site_filter[record].time_stamp.split("T");

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
                        listHtml = listHtml + '<tr class="reportListRow"><td class="reportListRowText">' + site_filter[record].name + '</td><td class="reportListRowText">' + site_filter[record].site_name + '</td><td class="reportListRowText">' + site_filter[record].county + '</td><td class="reportListRowText">' + Monday + ' - ' + date + '</td><td class="reportButtonHolder"><button class="reportDownloadButton">download</button></td></tr>'
                    }
                }
            }
        }



        list.innerHTML = listHtml;

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
                            <input className="reportFilterBox" id="org" onChange={this.filter} />
                        </div>
                        <div className="reportFilterElement">
                            <p className="reportFilterText">Site name</p>
                            <input className="reportFilterBox" id="name" onChange={this.filter} />
                        </div>
                        <div className="reportFilterElement">
                            <p className="reportFilterText">Site location</p>
                            <input className="reportFilterBox" id="county" onChange={this.filter} />
                        </div>
                        <div className="reportFilterElement">
                            <p className="reportFilterText">Dates available</p>
                            <input className="reportFilterBox" id="date" onChange={this.filter} />
                        </div>
                        <button className="filterReportsButton">Filter</button>
                        <p className="resultsText">Results: </p><p className="resultsText fw-normal" id="resultsNumber"></p>
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