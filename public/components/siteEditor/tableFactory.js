import {TabulatorFull as Tabulator} from "tabulator-tables"; //import Tabulator library


class TableFactory{
    constructor(){

    }

    createFlatTable(tableID, tableConfig, tableData, tableColumns){
        tableConfig.push({"columns" : [tableColumns]});
        var table = new Tabulator(tableID, {
            tableConfig
        });
        return table;
    }

    createNestedTable(tableID, tableData, tableColumns, tableConfig){
        tableConfig.push(tableData);
        var table = new Tabulator(tableID, {
            tableConfig
        }


        );
        return table;
    }
}