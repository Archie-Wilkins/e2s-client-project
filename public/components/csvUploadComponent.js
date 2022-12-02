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
                  for(let i = 0; i < results.data.length - 1; i++){
                    let lowArr = [];
                    lowArr.push(results.data[i].first_name);
                    lowArr.push(results.data[i].surname);
                    console.log(lowArr);
                    topArr.push(lowArr);
                  }
                  console.log("Comp: " + topArr[0]);
                  localStorage.setItem('userArr', JSON.stringify(topArr));
                  console.log("Comp2: " + localStorage.getItem('userArr'));
                  const link = document.querySelector('a');
                  const textBlob = new Blob([topArr], {type: 'text/csv'});
                  link.setAttribute('href', URL.createObjectURL(textBlob));
                  link.setAttribute('download', `${event.target.files[0].name}.txt`);
                  /*parseResults = results.data;
                  console.log("Parse flag: " + parseResults);
                  localStorage.setItem('userArr', parseResults);*/
                }
        });
            

    };

    handleScreen = async (event) => {
        this.setState({csvUploaded: true});
        let localCopyArr = localStorage.getItem('userArr');
        this.setState({csvData: localCopyArr});
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
                    <h1>{this.state.csvData}</h1>
                    <button onClick={this.returnHome}>Back</button>

                </div>    
            )} 
        </div>
    }
    
}

export default CsvUploadComponent;
