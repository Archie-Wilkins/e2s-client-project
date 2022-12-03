import React, { useEffect, useState } from 'react';
import * as fs from "fs";
import {parse} from "csv-parse";
import Papa from "papaparse";
class CsvUploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: [],
            csvData2: ["a","b"],
            csvFileName: "",
            csvUploaded: false,
            csvFileBody: null,
        };
    }
    
    handlCsvRequest = async (event) => {
        event.preventDefault();

        const data = {
            csvName: this.state.csvFileName,
            csvBody: this.state.csvFileBody,
        }

        const endpoint = '/api/csvUpload';
        const JSONdata = JSON.stringify(data);

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
     
        const response = await fetch(endpoint, options);
        const result = await response.json();
        console.log(result.data);

        this.setState({csvData: result.data});
        this.setState({csvUploaded: true});
    }

    handleOnChange = async (event) => {
        event.preventDefault();

        /*const value = event.target.value;
        console.log("Val: " + value);
        const files = event.target.files;
        console.log("Files: "+ files);*/
        let parseResults = "";
        let foo = false;


        Papa.parse(event.target.files[0], {
                header: true,
                download: true,
                dynamicTyping: true,
                complete: function(results) {
                  let topArr = [];  
                  /*localStorage.setItem('userArrLen', results.data.length);
                  for(let i = 0; i < results.data.length; i++){
                    let lowArr = [];
                        lowArr.push(results.data[i].first_name);
                        lowArr.push(results.data[i].surname);
                        console.log(lowArr);
                        topArr.push(lowArr);
                  }
                  console.log("Comp: " + topArr[0]);
                  localStorage.setItem('userArr', JSON.stringify(topArr));*/
                  for(let i = 0; i < results.data.length; i++){
                    let lowArr = [];
                        lowArr.push(results.data[i].Date);
                        lowArr.push(results.data[i].CHP1_Electricity_Generation_kW);
                        lowArr.push(results.data[i].CHP2_Electricity_Generation_kW);
                        lowArr.push(results.data[i].CHP1_Heat_Output_kW);
                        lowArr.push(results.data[i].CHP2_Heat_Output_kW);
                        lowArr.push(results.data[i].Boiler_Heat_Output_kW);
                        lowArr.push(results.data[i].Feels_Like_Temperature_Deg_C);
                        lowArr.push(results.data[i].Wind_Speed_ms);
                        lowArr.push(results.data[i].Site_Electricity_Demand_kW);
                        lowArr.push(results.data[i].Day_ahead_UK_electricity_price);
                        lowArr.push(results.data[i].Site_Heat_Demand_kW);
                        lowArr.push(results.data[i].Import_Electricity_kW);
                        lowArr.push(results.data[i].Export_Electricity_kW);
                        //console.log(lowArr);
                        topArr.push(lowArr);
                  }
                  localStorage.setItem('userArr', JSON.stringify(topArr));
                  localStorage.setItem('userArrName', event.target.files[0].name);
                  const link = document.querySelector('a');
                  const textBlob = new Blob([topArr], {type: 'text/csv'});
                  link.setAttribute('href', URL.createObjectURL(textBlob));
                  link.setAttribute('download', `${event.target.files[0].name}`);
                  /*parseResults = results.data;
                  console.log("Parse flag: " + parseResults);
                  localStorage.setItem('userArr', parseResults);*/
                }
        });
            

    };

    handleScreen = async (event) => {
        this.setState({csvUploaded: true});
        let localCopyArr = localStorage.getItem('userArr');
        let wordString = "";
        let rowArray = [];
        let tableArray = [];
        let wordArrayObject = [];
        let count = 0;
        for(let i = 0; i < localCopyArr.length; i++){
            if(localCopyArr[i] != "," && localCopyArr[i] != "[" && localCopyArr[i] != "]" && localCopyArr[i] != "\""){
                wordString = wordString + localCopyArr[i];
            }else{
                    if(count === 13){
                        tableArray.push(rowArray);
                        rowArray = [];
                        count = 0;
                    }if(localCopyArr[i] == ","){
                        wordArrayObject.push(wordString);
                        rowArray.push(wordArrayObject);
                        wordArrayObject = [];
                        wordString = "";
                        count++;
                    }

            }
        }
        this.setState({csvData: tableArray});
    }

    returnHome = async (event) => {
        this.setState({csvUploaded: false});
    }
    
    render() {
        return <div>
            {!this.state.csvUploaded &&(
                <div>
                        <input type="file" id="csvFile" onChange={this.handleOnChange} name="file" accept=".csv"/>
                        <br/><br/><br/>
                        <button onClick={this.handleScreen}>Submit</button>
                        <br/><br/><br/>
                        <a>Download</a>
                </div>  
            )}
            {this.state.csvUploaded === true&&(
                <div>
                    <button onClick={this.returnHome}>Back</button>
                    
                    <ul>
                        {this.state.csvData.map((name) => (
                            <div>
                                <h1>Data</h1>
                                <li>Date: {name[0]}</li>
                                <li>CHP1_Electricity_Generation_kW: {name[1]}</li>
                                <li>CHP2_Electricity_Generation_kW: {name[2]}</li>
                                <li>CHP1_Heat_Output_kW: {name[3]}</li>
                                <li>CHP2_Heat_Output_kW: {name[4]}</li>
                                <li>Boiler_Heat_Output_kW: {name[5]}</li>
                                <li>Feels_Like_Temperature_Deg_C: {name[6]}</li>
                                <li>Wind_Speed_ms: {name[7]}</li>
                                <li>Site_Electricity_Demand_kW: {name[8]}</li>
                                <li>Day_ahead_UK_electricity_price: {name[9]}</li>
                                <li>Site_Heat_Demand_kW: {name[10]}</li>
                                <li>Import_Electricity_kW: {name[11]}</li>
                                <li>Export_Electricity_kWL {name[12]}</li>
                            </div>
                        ))}
                    </ul>
                </div>    
            )} 
        </div>
    }
    
}

export default CsvUploadComponent;
