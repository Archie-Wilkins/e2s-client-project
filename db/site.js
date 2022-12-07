var db = require('./DatabaseCore.js');

export const all = async () => {
    return new Promise((resolve, reject) =>  {
        db.query('SELECT * from site_details', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteIDFromUserID = async (userID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT site_id FROM user_data_site_data_crossreference WHERE user_id = " + userID, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteDetails = async (siteID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM site_details WHERE site_id = " + siteID, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteIDFromEmail = async (email) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT user_data_site_data_crossref.site_id FROM user_data_site_data_crossref INNER JOIN user_data ON user_data_site_data_crossref.user_id = user_data.user_id WHERE user_data.email = " + "'" + email + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteDataByDay = async (siteID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT site_id, SUM(energy_hour_usage) as energy_day_usage, SUM(energy_hour_cost) as energy_day_cost, SUM(energy_hour_output) as energy_day_output, SUM(energy_hour_imported) as energy_day_imported, SUM(energy_hour_exported) as energy_day_exported, AVG(temp_average) as average_day_temperature, AVG(wind_speed) as average_day_wind_speed, SUM(carbon_hour_emitted) as carbon_day_emitted, DATE(time_stamp) as day" +
            " FROM site_energy_data WHERE site_id = '" + siteID + "'" +
            " GROUP BY DATE(time_stamp);", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteWeekData = async (siteID, dateStart, dateEnd) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT site_id, SUM(energy_hour_usage) as energy_week_usage, SUM(energy_hour_cost) as energy_week_cost, SUM(carbon_hour_emitted) as carbon_week_emitted" +
        " FROM site_energy_data WHERE site_id = " + siteID + " AND time_stamp > convert( '" + dateStart + " 00:00:00', datetime) AND time_stamp < convert('" + dateEnd + " 23:00:00', datetime) GROUP BY site_id;", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getSiteWeekHistoricalAverage = async (siteID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT site_id, AVG(energy_hour_usage) * 7 * 24 as energy_week_usage, AVG(energy_hour_cost) * 7 * 24 as energy_week_cost, AVG(carbon_hour_emitted) * 7 * 24 as carbon_week_emitted" +
        " FROM site_energy_data WHERE site_id = " + siteID +
        " GROUP BY site_id;", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export default {
    all,
    getSiteIDFromUserID,
    getSiteDetails,
    getSiteIDFromEmail,
    getSiteDataByDay,
    getSiteWeekData,
    getSiteWeekHistoricalAverage
}