import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {Router} from "next/router";
import { FaThinkPeaks } from 'react-icons/fa';
import * as fs from "fs";
import {parse} from "csv-parse";
import Papa from "papaparse";


class CsvUploadComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            csvData: [],
            csvUploaded: false,
        };
    }


    handlCsvRequest = async (event) => {
        event.preventDefault();

        const data = {
            csv: "dummy",
        }

        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/csvUpload';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }

        const response = await fetch(endpoint, options)
        const result = await response.json();
        console.log(result.data);
        this.setState({csvData: result.data});
        this.setState({csvUploaded: true});
    }

    render() {
        return <div>
            {!this.state.csvUploaded &&(
                <form action="POST">
                    <input type="file" name='file' onChange={this.handlCsvRequest} accept=".csv"/>
                </form>  
            )}
            {this.state.csvUploaded === true&&(
                <div>
                    <h1>{this.state.csvData}</h1>
                    <h2>Read</h2>
                </div>    
            )} 
        </div>
    }
    
}

export default CsvUploadComponent;
