import Link from "next/link"
import React from "react";
import NavBar from '../public/components/layouts/publicTopNav'


class ViewReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            site: ""
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



        //get Site name
        //Site location
        //Weeks available for reporting
        //Add download button for each week
        //clicking download will download the CSV data for that week



    }

    getData = async () => {
        try {
            const data = {sample: "s"};
            const JSONdata = JSON.stringify(data);

            //API request to get site details
            const endpoint = '/api/getReportListData';
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSONdata,
            }
            const response = await fetch(endpoint, options)

            let result = await response.json();
            alert(result[0].time_stamp);
            alert(result[31].time_stamp);
            //DB returns JSON wrapped in [] which javascript doesn't like
            //so we stringify it, remove [], then parse back to JSON
            // let stringResult = JSON.stringify(result);
            // stringResult = stringResult.replace("[", "");
            // stringResult = stringResult.replace("]", "");
            // result = JSON.parse(stringResult);
            //if response returned no data
            if (result === ""){
                alert("database pull failed");
                return;
            }


            //logic for fetching data
            //loop through all records





            let weekArray = [];
            let Monday;

            for(var record in await result){
                let [date, time] = result[record].time_stamp.split("T");
                const [year, month, day] = date.split('-');

                let days = new Date(date);

                //if day is a monday
                if(days.getDay() === 0){
                    //store monday's date
                    Monday = date;
                }

                //if day is a sunday
                if(days.getDay() === 6){
                    //end week
                    //and push the monday & sunday to array
                    if(days.getDay() + new Date(Monday).getDay() === 6){
                        weekArray.push(Monday + " - " + date + " : " + result[record].site_name);
                    }
                }
            }





            //for

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
                            {/*<table>*/}
                            {/*    <tr className="reportsListHeader">*/}
                            {/*        <td className="reportHeaderText">Organisation</td>*/}
                            {/*        <td className="reportHeaderText">Site Name</td>*/}
                            {/*        <td className="reportHeaderText">Site Location</td>*/}
                            {/*        <td className="reportHeaderText">Dates Data Available</td>*/}
                            {/*        <td className="reportHeaderText">Download Data (CSV)</td>*/}
                            {/*    </tr>*/}
                            {/*    <tr className="reportListRow">*/}
                            {/*        <td className="reportListRowText">Organisation</td>*/}
                            {/*        <td className="reportListRowText">Site Name</td>*/}
                            {/*        <td className="reportListRowText">Site Location</td>*/}
                            {/*        <td className="reportListRowText">Dates Data Available</td>*/}
                            {/*        <td className="reportButtonHolder"><button className="reportDownloadButton">download</button></td>*/}
                            {/*    </tr>*/}
                            {/*</table>*/}

                        </div>
                    </div>
                </div>
            </div>

        </div>
    }

}


export default ViewReportsPage