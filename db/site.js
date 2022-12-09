var db = require('./DatabaseCore.js');

export const all = async () => {
    return new Promise((resolve, reject) =>  {
        db.query('SELECT * from sites_historic', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const insertHistoricalData = async (a,b,c,d,e,f,g,h,i,j,k,l,m) => {
    return new Promise((resolve, reject) =>  {
        db.query("INSERT into sites_historic(site_id, supplier_id, energy_hour_usage, energy_hour_cost, energy_hour_output, energy_hour_imported, energy_hour_exported, energy_hour_demand, heat_hour_demand, feels_like, wind_speed, carbon_day_emitted, time_stamp) Values (" +"'" + a + "',"+"'" + b + "',"+"'" + c + "',"+"'" + d + "',"+"'" + e + "',"+"'" + f + "',"+"'" + g + "',"+"'" + h + "',"+"'" + i + "',"+"'" + j + "',"+"'" + k + "',"+"'" + l + "'"+"'" + m + "')", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}


export default {
    all,
}