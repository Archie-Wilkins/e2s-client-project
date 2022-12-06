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
                {fName:"Floor 1", fSizeX:"20", fSizeY:"20", rooms:[
                        {test : "room"}
                    ]},
                {fName:"Floor 2", fSizeX:"15", fSizeY:"5", rooms:[
                        {test : "room"}]},
            ]}
    ]


    componentDidMount() {

        // ComponetDidMount is called after the component is rendered. This is where the table should be initialized.
        var the_Function = function(cell, formatterParams, onRendered){ //plain text value

            console.log(cell.getRow().getData().id);

            return '<button type="submit" id="OpenImgUpload">ID upload</button></form>';
        };

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
                {title:"Button", field: "Button",formatter:the_Function,
                    width:100, align:"center",cellClick:function(e, cell){

//button's function for example
                        var Btn = document.createElement('Button');
                        console.log(Btn);


                    }}
            ],

            rowFormatter: function (row) {
                //create and style holder elements
                var floorHolderEl = document.createElement("div");
                var floorTableEl = document.createElement("div");

                floorHolderEl.style.boxSizing = "border-box";
                floorHolderEl.style.padding = "10px 30px 10px 10px";
                floorHolderEl.style.borderTop = "1px solid #333";
                floorHolderEl.style.borderBotom = "1px solid #333";


                floorTableEl.style.border = "1px solid #333";

                floorHolderEl.appendChild(floorTableEl);

                row.getElement().appendChild(floorHolderEl);

                var floorTable = new Tabulator(floorTableEl, {
                    layout: "fitColumns",
                    data: row.getData().floors,
                    columns: [
                        {title: "Floor Name/Number", field: "fName"},
                        {title: "Floor Size X", field: "fSizeX"},
                        {title: "Floor Size Y", field: "fSizeY"},
                    ],
                    rowFormatter: function (row) {
                        //create and style holder elements

                        var roomHolderEl = document.createElement("div");
                        var roomTableEl = document.createElement("div");

                        roomHolderEl.style.boxSizing = "border-box";
                        roomHolderEl.style.padding = "8px 24px 8px 8px";
                        roomHolderEl.style.borderTop = "1px solid #333";
                        roomHolderEl.style.borderBotom = "1px solid #333";


                        roomTableEl.style.border = "1px solid #333";

                        roomHolderEl.appendChild(roomTableEl);

                        row.getElement().appendChild(roomHolderEl);

                        var roomTable = new Tabulator(roomTableEl, {
                            layout: "fitColumns",
                            data: row.getData().test,
                            columns: [
                                {title: "test", field: "test"},
                            ]

                        })
                    },
                })

            }
        })};

    render() {
        return <div ref={reactRef => (this.reactRef = reactRef)}></div>
    }
}

export default SiteEditor
