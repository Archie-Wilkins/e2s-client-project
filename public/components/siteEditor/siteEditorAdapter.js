import AssetObject from './baseClasses/assetObject.js';
import RoomObject from './baseClasses/roomObject.js';
import FloorObject from './baseClasses/floorObject.js';
import SiteObject from './baseClasses/siteObject.js';
import axios from "axios";

export default class SiteEditorAdapter {
    constructor(organisation) {
        // TODO - This is the organisation object at a later point
        console.log("SiteEditorAdapter constructor called with value of " + organisation);
        this.organisation = organisation;
    }


    pullDataForSiteEditor = async (event) => {
        try {
            // Get all possible site data for
            console.log("Getting sites");
            await axios.post(
                {
                    url: "api/populateEditor",
                    data: {orgId: 1},
                }).then((response) => {
                console.log(response);
                if (response.data.message.toString() === "success") {
                    // TODO - This is the response.data.data object at a later point
                    return response.data.data;
                }
                else{
                    console.log("Error");
                    return null
                }
            })}
        catch (e) {
            console.log(e);
            return null;
        }
    }
    // Class for mapping data from database to the objects to be used in site data.
    formatDataForSiteEditor = async (event) => {
        // Get the data from the database
        const data = await this.pullDataForSiteEditor();

        if (data === null) {
            console.log("Error getting data from database");
            return null;
        }

        // Check for null response, then unleash the hounds
        if (data){
            try{
                for (let i = 0; i < data.length; i++) {
                    // Create a site object
                    const site = new SiteObject(data[i].site_id, data[i].site_name, data[i].post_code,
                        data[i].address_l1, data[i].address_l2, data[i].county, data[i].site_size_x,
                        data[i].site_size_y);

                    for (let j = 0; j < data[i].floors.length; j++) {
                        // Create a floor object
                        const floor = new FloorObject(data[i].floors[j].floor_id, data[i].floors[j].floor_number,
                            data[i].floors[j].floor_size_x, data[i].floors[j].floor_size_y);

                        for (let k = 0; k < data[i].floors[j].rooms.length; k++) {
                            // Create a room object
                            const room = new RoomObject(data[i].floors[j].rooms[k].room_id,
                                data[i].floors[j].rooms[k].room_name, data[i].floors[j].rooms[k].room_size_x,
                                data[i].floors[j].rooms[k].room_size_y, data[i].floors[j].rooms[k].room_pos_x,
                                data[i].floors[j].rooms[k].room_pos_y);

                            for (let l = 0; l < data[i].floors[j].rooms[k].assets.length; l++) {
                                // Create an asset object
                                const asset = new AssetObject(data[i].floors[j].rooms[k].assets[l].asset_id,
                                    data[i].floors[j].rooms[k].assets[l].asset_name,
                                    data[i].floors[j].rooms[k].assets[l].type_id,
                                    data[i].floors[j].rooms[k].assets[l].energy_efficiency,
                                    data[i].floors[j].rooms[k].assets[l].energy_demand,
                                    data[i].floors[j].rooms[k].assets[l].emissions);

                                // Add the asset to the room
                                room.addAssetObject(asset);
                            }

                            // Add the room to the floor
                            floor.addRoomObject(room);
                        }

                        // Add the floor to the site
                        site.addFloorObject(floor);
                    }

                    // Add the site to the organisation
                    this.organisation.addSite(site);
                }
            }
            catch(e){
                console.log(e);
                return null;
            }
        }
    }

    }
