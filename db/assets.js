var db = require('./DatabaseCore.js');

export const getAssetsWithRoomId = async (roomId) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM energy_asset_data WHERE room_id = " + "'" + roomId + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const setAsset = async (assetName, assetTypeId, assetRoomId, energyUsage, gasUsage, energyGenerated, predCost, predEmissions) => {
    return new Promise((resolve, reject) =>  {
        db.query("INSERT INTO energy_asset_data (asset_name, asset_type_id, room_id, energy_usage, gas_usage, energy_generated, pred_cost, pred_emissions) VALUES ('" + assetName + "', '" + assetTypeId + "', '" + assetRoomId + "', '" + energyUsage + "', '" + gasUsage + "', '" + energyGenerated + "', '" + predCost + "', '" + predEmissions + "')", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export default {
    getAssetsWithRoomId,
    setAsset
}