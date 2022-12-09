class Constants {
  static get SITE_EDITOR_COLUMNS() {

      // TODO: Check if this custom formatter can be found
      // var rowDeleter = function(cell, formatterParams, onRendered){ //plain text value
      //
      //     return
      //             // <img alt="Delete Row" src='../public/images/siteEditor/binBlank.svg'
      //             //      onMouseOver="../public/images/siteEditor/binRed.svg';"
      //             //      onMouseOut="../public/images/siteEditor/binBlank.svg';"/>
      //
      // };

    return [[
        {"title": "Site Name", "field": "name", "width": 50},
        {"title": "Site Postcode", "field": "postcode", "width": 30},
        {"title": "Site Address 1", "field": "address1", "width": 70},
        {"title": "Site Address 2", "field": "address2", "width": 70},
        {"title": "County", "field": "county", "width": 40},
        {"title": "Site Size X", "field": "sizeX", "width": 10},
        {"title": "Site Size Y", "field": "sizeY", "width": 10},


    ],
        [
            {"title": "Floor Number", "field": "floorNumber"},
            {"title": "Floor Size X", "field": "sizeX"},
            {"title": "Floor Size Y", "field": "sizeY"},
        ],
        [
            {"title": "Room Name", "field": "name"},
            {"title": "Room Size X", "field": "sizeX"},
            {"title": "Room Size Y", "field": "sizeY"},
            {"title": "Room Position X", "field": "positionX"},
            {"title": "Room Position Y", "field": "positionY"},
        ],
        [
            {"title": "Asset Name", "field": "name"},
            {"title": "Asset Type", "field": "typeId"},
            {"title": "Asset Efficiency", "field": "energyEfficiency"},
            {"title": "Asset Emissions", "field": "emissions"},
        ]
    ];
  }

  static get SITE_EDITOR_CONFIG() {
      return {
          height: "800px",
          layout: "fitColumns",
          columnDefaults: {
              editor: "input",
              resizable: true
          }
      }
  }
}