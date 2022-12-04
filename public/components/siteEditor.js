import React from "react";
import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library
import "tabulator-tables/dist/css/tabulator.min.css"; //import Tabulator stylesheet

// https://tabulator.info/docs/5.4/frameworks#react

class SiteEditor extends React.Component{

    reactRef = React.createRef();
    siteTable = null
    nestedData = [
        {id:1, sName:"Cardiff Uni", sPost:"CF24", sLine1:"The Road Next To Lidl", sLine2:"Middle", sCounty:"Wales",
            sSizeX: "20", sSizeY: "20", floors:[
                {fName:"Floor 1", fSizeX:"20", fSizeY:"20"},
                {fName:"Floor 2", fSizeX:"15", fSizeY:"5"},
            ]}
    ]

    componentDidMount() {

        this.siteTable = new Tabulator(this.reactRef, {
            height: "400px",
            layout: "fitColumns",
            columnDefaults: {
                resizable: true,
            },
            data: this.nestedData,
            columns: [
                {title: "Site Name", field: "sName"},
                {title: "Postcode", field: "sPost"},
                {title: "Address Line 1", field: "sLine1"},
                {title: "Address Line 2", field: "sLine2"},
                {title: "County", field: "sCounty"},
                {title: "Size X", field: "sSizeX"},
                {title: "Size Y", field: "sSizeY"},
            ],
            rowFormatter: function (row) {
                //create and style holder elements
                var holderEl = document.createElement("div");
                var tableEl = document.createElement("div");

                holderEl.style.boxSizing = "border-box";
                holderEl.style.padding = "10px 30px 10px 10px";
                holderEl.style.borderTop = "1px solid #333";
                holderEl.style.borderBotom = "1px solid #333";


                tableEl.style.border = "1px solid #333";

                holderEl.appendChild(tableEl);

                row.getElement().appendChild(holderEl);

                var floorTable = new Tabulator(tableEl, {
                    layout: "fitColumns",
                    data: row.getData().floors,
                    columns: [
                        {title: "Floor Name/Number", field: "fName"},
                        {title: "Floor Size X", field: "fSizeX"},
                        {title: "Floor Size Y", field: "fSizeY"},
                    ]
                })
            },
        })

    }

    render() {
        return <div ref={reactRef => (this.reactRef = reactRef)}></div>
    }
}

export default SiteEditor
