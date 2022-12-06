var db = require('./DatabaseCore.js');

export const getAllChildrenOfOrgs = async (orgId) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM ((((organisations INNER JOIN site_details ON " +
            "organisations.org_id = site_details.site_org_id) INNER JOIN" +
            " floors ON floors.site_id = site_details.site_id) INNER JOIN" +
            " rooms ON floors.floor_id = rooms.floor_id) INNER JOIN" +
            " energy_asset_data ON energy_asset_data.room_id = rooms.room_id) WHERE organisations.org_id = " + orgId , (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export default {
    getAllChildrenOfOrgs
}