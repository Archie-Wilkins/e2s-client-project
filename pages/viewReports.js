import Link from "next/link";
import React from "react";
import NavBar from '../public/components/layouts/publicTopNav';
// import downloadCsv from 'download-csv';

class ViewReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site: "",
            list: {},
            sites: {},
            filteredList: [],
            id: 0
        }
    }

    //on page load
    async componentDidMount() {
        try {
            //generate data to be sent off (required for API fetch even if not needed)
            const data = {sample: "s"};
            const JSONdata = JSON.stringify(data);

            //API request to get all sites
            let endpoint = '/api/site/getAllSites';
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSONdata,
            }
            let response = await fetch(endpoint, options)

            this.state.sites = await response.json();
            console.log(this.state.sites);


            //if response returned no data
            if (this.state.sites === ""){
                alert("database pull failed");
                return;
            }


            //API request to get site details
            endpoint = '/api/reports/getReportListData';
            options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSONdata,
            }
            response = await fetch(endpoint, options)
            this.state.list = await response.json();

            //if response returned no data
            if (this.state.list === ""){
                alert("database pull failed");
                return;
            }

            //calls filter event to display the data
            this.filter();


        } catch (e) {
            alert("error: " + e);
        }
    }


    filter = async () => {
        //fetches HTML element to insert the HTML list into
        const list = document.getElementById("list");
        list.innerHTML = "";

        //fetches each filter textbox value
        const orgFilter = document.getElementById("org").value.toLowerCase();
        const nameFilter = document.getElementById("name").value.toLowerCase();
        const countyFilter = document.getElementById("county").value.toLowerCase();
        const dateFilter = document.getElementById("date").value.toLowerCase();

        //filtered list will store a filtered down version of the original data set
        this.state.filteredList = this.state.list;

        //if organisation filter isn't empty
        if (orgFilter !== ""){
            this.state.filteredList = this.state.list.filter(element => element.name.toLowerCase().includes(orgFilter));
        }
        //if name filter isn't empty
        if (nameFilter !== ""){
            this.state.filteredList = this.state.filteredList.filter(element => element.site_name.toLowerCase().includes(nameFilter));
        }
        //if county filter isn't empty
        if (countyFilter !== ""){
            this.state.filteredList = this.state.filteredList.filter(element => element.county.toLowerCase().includes(countyFilter));
        }
        //if date filter isn't empty
        if (dateFilter !== ""){
            this.state.filteredList = this.state.filteredList.filter(element => element.time_stamp.toLowerCase().includes(dateFilter));
        }

        //initialise variable for sorting the list and assigning id's
        let Monday;
        let listHtml = "";
        let currentSite = "";
        let id = 0;

        //double for loop to retreive each site's weekly records
        for(var site in this.state.sites) {
            //stores current siteID in variable
            currentSite = this.state.sites[site].site_id;
            //filters list down into current site
            var site_filter = this.state.filteredList.filter( element => element.site_id === parseInt(currentSite));
            //loops through list of site data
            for (var record in await site_filter) {
                //splits the time_stamp into date and time

                if (site_filter[record].time_stamp === null) {
                    alert(JSON.stringify(site_filter[record]));
                }
                let [date, time] = site_filter[record].time_stamp.split("T");
                //converts string "date" into Date object
                let days = new Date(date);

                //if day is a monday
                if (days.getDay() === 1) {
                    //store monday's date
                    Monday = date;
                }

                //if day is a sunday
                if (days.getDay() === 0) {
                    //end week and add new HTML record
                    //increment id for new record
                    id++;
                    if (days.getDay() + new Date(Monday).getDay() === 1) {
                        //listHtml gets a new row added to it
                        listHtml = listHtml + '<tr class="reportListRow"><td class="reportListRowText">' + site_filter[record].name + '</td>' +
                            '<td class="reportListRowText">' + site_filter[record].site_name + '</td>' +
                            '<td class="reportListRowText">' + site_filter[record].county + '</td>' +
                            '<td class="reportListRowText">' + Monday + ' - ' + date + '</td>' +
                            '<td class="reportButtonHolder"><div id="data'+ id +'" style="display: none">' + site_filter[record].site_id + ' ' + Monday + '|' + date + ' ' + site_filter[record].site_name +'</div><button class="reportDownloadButton" id="btn' + id + '">download</button></td></tr>'
                        //data relating to record is hidden in this <div> above
                    }
                }
            }
        }

        //sets results innerText to id which doubles as a counter of records
        document.getElementById("resultsNumber").innerText = id;

        //sets innerHTML to list generated in double for loop above
        list.innerHTML = listHtml;

        //loops up to id/record count
        for (let i = 1; i < id+1; i++){
            try{
                //fetches button and add's onClick function to them
                let btn = document.getElementById("btn"+i);
                btn.addEventListener('click', function (){
                    clickDetect(i);
                });
            } catch (e) {}
        }

        //download button clicked
        async function clickDetect(id) {
            //splits the data fetched from the hidden <div> in each record
            const [siteID, week, siteName] = document.getElementById("data" + id).innerText.split(" ");
            const [weekStart, weekEnd] = week.split("|");

            //stored the data in an object to be sent to API
            const data = {
                siteID: siteID,
                dateStart: weekStart,
                dateEnd: weekEnd
            }
            let JSONdata = JSON.stringify(data);
            let endpoint = '/api/site/getSiteTimeframeData';
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSONdata,
            }
            let response = await fetch(endpoint, options)
            let result = await response.json();
            //API has fetched JSON response of the sites data for the selected timeframe


            //JSON to csv download code sourced from: https://chat.openai.com/

            // Get keys from the JSON data
            const keys = Object.keys(result[0]);

            // Create the CSV string, including the keys as the first row
            let csv = keys.join(',') + '\n';
            result.forEach(data => {
                csv += Object.values(data).join(',') + '\n';
            });

            // Create a hidden link element and click it to trigger the download
            const link = document.createElement('a');
            link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
            link.setAttribute('download', siteName + '.csv');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            //try to download csv
            try{
                this.downloadCSV(csv);
            } catch (e) {}

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
                        <div><p className="resultsText fw-normal" id="resultsNumber"></p><p className="resultsText">Results: </p></div>
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