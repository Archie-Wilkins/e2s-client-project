class Constants {
  static get SITE_EDITOR_COLUMNS() {
    return [[
        {"title": "Site Name", "field": "name"},
        {"title": "Site Postcode", "field": "postcode"},
        {"title": "Site Address 1", "field": "address1"},
        {"title": "Site Address 2", "field": "address2"},
        {"title": "County", "field": "county"},
        {"title": "Site Size X", "field": "sizeX"},
        {"title": "Site Size Y", "field": "sizeY"},
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
}