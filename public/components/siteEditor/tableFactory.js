import {TabulatorFull as Tabulator} from "tabulator-tables";
import Constants from "./constants";

class TableFactory {
    constructor() {

    }

    createFlatTable(tableID, tableConfig, tableData = []) {
        tableConfig.push({"data": tableData});
        tableConfig.push({"columns": tableColumns});
        return new Tabulator(tableID, {
            tableConfig
        });
    }

    createNestedTable(tableID, tableData, tableColumns, tableConfig, tabulatorTable) {
        tableConfig.push({"data": tableData});
        tableConfig.push({"columns": tableColumns});
        var table = new Tabulator(tableID, {
            tableConfig,
            rowFormatter: function (row) {

                // TODO: Objectify this at a later  date
                var floorHolderEl = document.createElement("div");
                var floorTableEl = document.createElement("div");

                floorHolderEl.style.boxSizing = "border-box";
                floorHolderEl.style.padding = "10px 30px 10px 10px";
                floorHolderEl.style.borderTop = "1px solid #333";
                floorHolderEl.style.borderBotom = "1px solid #333";
                floorTableEl.style.border = "1px solid #333";

                floorHolderEl.appendChild(floorTableEl);
                row.getElement().appendChild(floorHolderEl);

                // TODO: Does this even work???
                floorTableEl.appendChild(tabulatorTable);
            }
        });

        return table;
    }

    createSiteEditorTable(siteObjectData, tableID, tableConfig) {

        function createTableDataForSiteEditor(siteObjectData)
        {
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
        }

        var tableData = createTableDataForSiteEditor(siteObjectData);
        var columnData = Constants.SITE_EDITOR_COLUMNS();
        var assetsTable = this.createFlatTable(tableID, tableConfig, tableData);

    }
}
