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


            this.filter();


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
        let id = 0;

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
                    id++;
                    if (days.getDay() + new Date(Monday).getDay() === 1) {
                        listHtml = listHtml + '<tr class="reportListRow"><td class="reportListRowText">' + site_filter[record].name + '</td>' +
                            '<td class="reportListRowText">' + site_filter[record].site_name + '</td>' +
                            '<td class="reportListRowText">' + site_filter[record].county + '</td>' +
                            '<td class="reportListRowText">' + Monday + ' - ' + date + '</td>' +
                            '<td class="reportButtonHolder"><div id="data'+ id +'" style="display: none">' + site_filter[record].site_id + ' ' + Monday + '|' + date + ' ' + site_filter[record].site_name +'</div><button class="reportDownloadButton" id="btn' + id + '">download</button></td></tr>'
                    }
                }
            }
        }


        // let datetime = "01/01/2020 00:00:00";
        // let [date, time] = datetime.split(" ");
        // let [year, month, day] = date.split('/');
        // let newDate = year + "-" + month + "-" + day;

        document.getElementById("resultsNumber").innerText = id;

        list.innerHTML = listHtml;

        for (let i = 1; i < id+1; i++){
            try{
                let btn = document.getElementById("btn"+i);
                btn.addEventListener('click', function (){
                    clickDetect(i);
                });
            } catch (e) {}
        }

        async function clickDetect(id) {
            const [siteID, week, siteName] = document.getElementById("data" + id).innerText.split(" ");
            const [weekStart, weekEnd] = week.split("|");

            alert(siteID + " " + weekStart + " " + weekEnd);

            const data = {
                siteID: siteID,
                dateStart: weekStart,
                dateEnd: weekEnd
            }
            let JSONdata = JSON.stringify(data);
            let endpoint = '/api/getSiteTimeframeData';
            let options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSONdata,
            }
            let response = await fetch(endpoint, options)
            let result = await response.json();



            //JSON to csv download ripped from

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