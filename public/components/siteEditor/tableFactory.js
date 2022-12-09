import {TabulatorFull as Tabulator} from "tabulator-tables";
import Constants from "./constants";

export default class TableFactory {
    constructor() {

    }

    // The flat table would be at the bottom of the site editor (i.e the table that shows all the assets)
    createFlatTable(tableID, tableConfig= {}, tableColumns= [], tableData = []) {
        if (tableData.length > 0) {
            tableConfig.data = tableData;
        }
        if (tableColumns === []) {
            return null;
        }
        tableConfig.columns = tableColumns;
        var table = new Tabulator(tableID, {
            tableConfig
        });
        return table;
    }

    createNestedTable(tableID, tableConfig= {}, tableColumns= [], tableData=[], tabulatorTable) {
        if (tableData.length > 0) {
            tableConfig.data = tableData;
        }
        if (tableColumns === []) {
            return null;
        }
        tableConfig.columns = tableColumns;
        var table = new Tabulator(tableID, {
            tableConfig,
            rowFormatter: function (row) {

                // TODO: Objectify this at a later  date
                var holderElement = document.createElement("div");
                var tableElement = document.createElement("div");

                // Holder element properties for the table inside it
                holderElement.style.boxSizing = "border-box";
                holderElement.style.padding = "10px 30px 10px 10px";
                holderElement.style.borderTop = "1px solid #333";
                holderElement.style.borderBotom = "1px solid #333"

                // The border for the table
                tableElement.style.border = "1px solid #333";

                holderElement.appendChild(tableElement);
                row.getElement().appendChild(holderElement);

                // TODO: Does this even work???
                tableElement.appendChild(tabulatorTable);
            }
        });

        return table;
    }


    createSiteEditorTable(siteObjectData, reactRef) {

        function createTableDataForSiteEditor(siteObjectData) {
            try {
                console.log(siteObjectData);
                console.log("Trying for each")
                var nestedData = [];
                siteObjectData.forEach(siteObject => {
                    var siteJson = siteObject.getJsonFormat();
                    siteObject.getFloors().forEach(floor => {
                        var floorJson = floor.getJsonFormat();
                        floor.getRooms().forEach(room => {
                            var roomJson = room.getJsonFormat();
                            room.getAssets().forEach(asset => {
                                var assetJson = asset.getJsonFormat();
                                roomJson.push({"assets": assetJson});
                            });
                            floorJson.push({"rooms": roomJson});
                        });
                        siteJson.push({"floors": floorJson});
                    });
                });

                return nestedData;
            } catch (error) {
                console.log(error);
                return [];
            }
        }

        const constantsFile = new Constants();
        var tableData = createTableDataForSiteEditor(siteObjectData);
        var columnData = constantsFile.SITE_EDITOR_COLUMNS();
        var tableConfig = constantsFile.SITE_EDITOR_CONFIG();
        console.log(tableConfig);
        var assetsTable = this.createFlatTable("#assetsTable", tableConfig, columnData[3], tableData);
        if (assetsTable === null) {
            return null;
        }
        var roomsTable = this.createNestedTable('#roomsTable', tableData, columnData[2], tableConfig, assetsTable);
        if (roomsTable === null) {
            return null;
        }
        var floorsTable = this.createNestedTable('#floorsTable', tableData, columnData[1], tableConfig, roomsTable);
        if (floorsTable === null) {
            return null;
        }
        return this.createNestedTable(reactRef, tableData, columnData[0], tableConfig, floorsTable);

    }
}
