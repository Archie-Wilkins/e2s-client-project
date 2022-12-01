import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {Router} from "next/router";
import { FaThinkPeaks } from 'react-icons/fa';
import * as fs from "fs";
import {parse} from "csv-parse";
import Papa from "papaparse";
import { faPersonMilitaryToPerson } from '@fortawesome/free-solid-svg-icons';

class CsvUploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: [],
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

        console.log("Name Flag 2: " + this.state.csvFileName);
        console.log("Name Flag 2: " + this.state.csvFileBody);

        const endpoint = '/api/csvUpload';
        const JSONdata = JSON.stringify(data);

        /*const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }*/

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'text/csv',
            },
            body: JSONdata
        }

        /*console.log("This is the file: " + this.state.filename);
        var f = new File([this.state.filename], "csvUploaded.csv");
        console.log(f.name);

        const data = {
            csv: f,
        }

        const endpoint = '/api/csvUpload';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/csv',
            },
            body: data,
        }*/
     
        const response = await fetch(endpoint, options);
        const result = await response.json();
        console.log(result.data);
        this.setState({csvData: result.data});
        this.setState({csvUploaded: true});
    }

    handleOnChange = async (event) => {
        event.preventDefault();

        const link = document.querySelector('a');
 
        let name = 'Monty';            
        const textBlob = new Blob([name], {type: 'text/plain'});
            
        link.setAttribute('href', URL.createObjectURL(textBlob));
        link.setAttribute('download', `${name.toLowerCase()}.txt`);

        console.log("The entire file: " + event.target.files[0]);

        const localFilename = event.target.files[0].name;
        console.log("The file name: " + event.target.files[0].name);
        this.setState({csvFileName: localFilename});

        const localBody = document.getElementById("file").value;
        console.log("The file body: " + localBody);
        this.setState({csvFileBody: localBody});
        //NOTE: the state is updated to the file passed, but only once this function is completed and returned
    };


    returnHome = async (event) => {
        this.setState({csvUploaded: false});
    }
    
    render() {
        return <div>
            {!this.state.csvUploaded &&(
                <div>
                    <input type="file" id="file" name="file" onChange={this.handleOnChange} accept=".csv"/>
                    <button onClick={this.handlCsvRequest}>Submit</button>
                    <br/>
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
