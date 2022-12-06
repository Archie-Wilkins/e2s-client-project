import organisations from "../../../db/organisations";
import sites from "../../../db/sites";
import floors from "../../../db/floors";
import rooms from "../../../db/rooms";
import assets from "../../../db/assets";

export default async function handler(req, res) {

    // Get organisation ID from request's body.
    const orgId = req.body.orgId;
    if (!orgId) {
        return res.status(400).json({data: 'Missing data!'})
    }

    // Iterate through sites under org id, floors under site id, rooms under floor id, assets under room id.
    // This is disgusting, but it beats querying with 4 inner joins then deconstructing the data.
    // (hence in organisations db, there is a function that does the aformentioned)
    // Mongo db would of helped greatly here

    try {
        sites.getSitesWithOrgId(orgId).then((sites) => {
            for (let i = 0; i < sites.length; i++) {
                floors.getFloorsWithSiteId(sites[i].site_id).then((floors) => {
                    for (let j = 0; j < floors.length; j++) {
                        rooms.getRoomsWithFloorId(floors[j].floor_id).then((rooms) => {
                            for (let k = 0; k < rooms.length; k++) {
                                assets.getAssetsWithRoomId(rooms[k].room_id).then((assets) => {
                                    rooms[k].assets = assets;
                                });
                            }
                            floors[j].rooms = rooms;
                        });
                    }
                    sites[i].floors = floors;
                });
            }
            res.status(200).json({data: sites});
        });
    } catch(e){
        console.log(e);
        return res.status(500);
    }

}
