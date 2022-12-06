var db = require('./DatabaseCore.js');

export const getFloorsWithSiteId = async (siteId) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM floors WHERE site_id = " + "'" + siteId + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const setFloor = async (floorNumber, floorSizeX, floorSizeY, floorSiteId) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO floors (floor_number, floor_size_x, floor_size_y, site_id) VALUES ('" + floorNumber + "', '" + floorSizeX + "', '" + floorSizeY + "', '" + floorSiteId + "')", (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export default {
    getFloorsWithSiteId,
    setFloor
}