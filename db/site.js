
var db = require('./DatabaseCore.js');

export const all = async () => {
    return new Promise((resolve, reject) =>  {
        db.query('SELECT * from sites', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const allSites = async () => {
    return new Promise((resolve, reject) =>  {
        db.query('SELECT * from sites', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const allHistoric = async () => {
    return new Promise((resolve, reject) =>  {
        db.query('SELECT * from sites_historic', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteDataFromMonth = async (month) =>{
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM sites_historic WHERE SELECT MONTH(time_stamp) = ?", month,(err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        })
    })
}


export const insertHistoricalTest = async (dataArray) => {
    return new Promise((resolve, reject) =>  {
        let query = "INSERT into sites_historic(site_id, supplier_id, energy_demand, heat_demand, energy_cost, energy_output, energy_imported, energy_exported, feels_like, wind_speed, carbon_emitted, time_stamp) values (?)";
        db.query(query, dataArray,(err, results) => {
            if(err) {
                console.log("Error");
                return reject(err);
            }else{
                console.log("Inserted.");
                resolve(results);
            }
        });
    });
}

export const insertHistoricalData = async (a,b,c,d,e,f,g,h,i,j,k,l) => {

    return new Promise((resolve, reject) =>  {
        let query = "Insert into sites_historic(site_id, supplier_id, energy_demand, heat_demand, energy_cost, energy_output, energy_imported, energy_exported, feels_like, wind_speed, carbon_emitted, time_stamp) VALUES (" + "'" + a + "'," + "'" + b + "'," + "'"+ c + "',"+ "'"+ d + "'," + "'"+ e + "'," + "'"+ f + "'," + "'"+ g + "'," + "'"+ h + "'," + "'"+ i + "',"+ "'"+ j + "',"+ "'"+ k + "',"+ "'"+ newDateTime + "'"+")";
        //console.log(query);
        //query = "Insert into user_esm(esm_id, user_id, site_id) Values (696921, 74445, 90000)";
        db.query(query, (err, results) => {
        //db.query("INSERT into sites_historic(site_id, supplier_id, energy_demand, heat_demand, energy_cost, energy_output, energy_imported, energy_exported, feels_like, wind_speed, carbon_emitted, time_stamp) Values (" +"'" + a + "',"+"'" + b + "',"+"'" + c + "',"+"'" + d + "',"+"'" + e + "',"+"'" + f + "',"+"'" + g + "',"+"'" + h + "',"+"'" + i + "',"+"'" + j + "')", (err, results) => {
            if(err) {
                console.log("Error");
                return reject(err);
            }else{
                console.log("Inserted.");
                resolve(results);
            }
        });
    });
}

export const getSiteIDFromUserID = async (userID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT site_id FROM user_esm WHERE user_id = " + userID, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getHistoricalSiteDataFromUserID = async (user_id) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM (sites_historic INNER JOIN user_esm ON sites_historic.site_id = user_esm.site_id) WHERE user_esm.user_id = (?)",user_id.userID, (err, results) => {
            if(err) {
                console.log("Error in query.");
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getSiteDetails = async (siteID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM sites WHERE site_id = " + siteID, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteIDFromEmail = async (email) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT user_esm.site_id FROM user_esm INNER JOIN user_credentials ON user_esm.user_id = user_credentials.user_id WHERE user_credentials.email = " + "'" + email + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const getSiteDataByDay = async (siteID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT site_id, SUM(energy_demand) as energy_day_demand, SUM(heat_demand) as heat_day_demand, SUM(energy_cost) as energy_day_cost, SUM(energy_output) as energy_day_output, SUM(energy_imported) as energy_day_imported, SUM(energy_exported) as energy_day_exported, AVG(feels_like) as week_day_avg, AVG(wind_speed) as week_day_avg, SUM(carbon_emitted) as carbon_day_emitted, time_stamp" +
            " FROM sites_historic WHERE site_id = '" + siteID + "'" +
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
        db.query("SELECT site_id, SUM(energy_demand) as energy_week_demand, SUM(heat_demand) as heat_week_demand, SUM(energy_cost) as energy_week_cost, SUM(energy_output) as energy_week_output, SUM(energy_imported) as energy_week_imported, SUM(energy_exported) as energy_week_exported, AVG(feels_like) as week_temp_avg, AVG(wind_speed) as week_wind_avg, SUM(carbon_emitted) as carbon_week_emitted" +
        " FROM sites_historic WHERE site_id = " + siteID + " AND time_stamp > convert( '" + dateStart + " 00:00:00', datetime) AND time_stamp < convert('" + dateEnd + " 23:31:00', datetime) GROUP BY site_id;", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getSiteDataDayRange6Hourly = async (siteID, dateStart, dateEnd) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT site_id, energy_demand, heat_demand, energy_cost, energy_output, energy_imported, energy_exported, feels_like, wind_speed, carbon_emitted, time_stamp as date" +
            " FROM sites_historic WHERE site_id = " + siteID + " AND time_stamp > convert( '" + dateStart + " 00:00:00', datetime) AND time_stamp < convert('" + dateEnd + " 23:00:00', datetime) GROUP BY DAY(date), HOUR(date);", (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const getSiteDataDayRangeDaily = async (siteID, dateStart, dateEnd) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT site_id, energy_demand, heat_demand, energy_cost, energy_output, energy_imported, energy_exported, feels_like, wind_speed, carbon_emitted, time_stamp as date" +
            " FROM sites_historic WHERE site_id = " + siteID + " AND time_stamp > convert( '" + dateStart + " 00:00:00', datetime) AND time_stamp < convert('" + dateEnd + " 23:00:00', datetime) GROUP BY MONTH(date),DAY(date);", (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export const getSiteDataDayRangeMonthly = async (siteID, dateStart, dateEnd) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT site_id, energy_demand, heat_demand, energy_cost, energy_output, energy_imported, energy_exported, feels_like, wind_speed, carbon_emitted, time_stamp as date" +
            " FROM sites_historic WHERE site_id = " + siteID + " AND time_stamp > convert( '" + dateStart + " 00:00:00', datetime) AND time_stamp < convert('" + dateEnd + " 23:00:00', datetime) GROUP BY MONTH(date);", (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}


export const getSiteWeekHistoricalAverage = async (siteID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT site_id, AVG(energy_demand) * 7 * 48 as energy_avg_week_demand, AVG(heat_demand) * 7 * 48 as heat_avg_week_demand, AVG(energy_cost) * 7 * 48 as energy_avg_week_cost, AVG(energy_output) * 7 * 48 as energy_avg_week_output, AVG(energy_imported) * 7 * 48 as energy_avg_week_imported, AVG(energy_exported) * 7 * 48 as energy_avg_week_exported, AVG(feels_like) * 7 * 48 as week_avg_temp, AVG(wind_speed) * 7 * 48 as week_avg_wind, avg(carbon_emitted) * 7 * 48 as carbon_avg_week_emitted" +
        " FROM sites_historic WHERE site_id = " + siteID +
        " GROUP BY site_id;", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}



export const getSiteTimeFrameData = async (siteID, dateStart, dateEnd) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT energy_demand, heat_demand, energy_cost, energy_output, energy_imported, energy_exported, feels_like, wind_speed, carbon_emitted, time_stamp" +
            " FROM sites_historic WHERE site_id = " + siteID + " AND time_stamp > convert( '" + dateStart + " 00:00:00', datetime) AND time_stamp < convert('" + dateEnd + " 23:59:00', datetime);", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getSiteReportListData = async () => {
    return new Promise((resolve, reject) =>  {
        db.query('SELECT sites.site_id, sites.site_name, sites.county, organisations.name, sites_historic.time_stamp FROM ((sites' +
            ' INNER JOIN organisations ON sites.org_id = organisations.org_id)' +
            ' INNER JOIN sites_historic ON sites.site_id = sites_historic.site_id)' +
            ' GROUP BY DATE(time_stamp), site_name LIMIT 0, 600;', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}



export const getSitePastWeekAverage = async (siteID) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT site_id, AVG(energy_demand) * 7 * 48 as energy_avg_week_demand, AVG(heat_demand) * 7 * 48 as heat_avg_week_demand, AVG(energy_cost) * 7 * 48 as energy_avg_week_cost, AVG(energy_output) * 7 * 48 as energy_avg_week_output, AVG(energy_imported) * 7 * 48 as energy_avg_week_imported, AVG(energy_exported) * 7 * 48 as energy_avg_week_exported, AVG(feels_like) * 7 * 48 as week_avg_temp, AVG(wind_speed) * 7 * 48 as week_avg_wind, avg(carbon_emitted) as carbon_avg_week_emitted" +
            " FROM sites_historic WHERE site_id = " + siteID +
            " GROUP BY site_id ORDER by entry_id DESC LIMIT 336;", (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
    });
}

export default {
    all,
    allSites,
    allHistoric,
    getSiteIDFromUserID,
    getSiteDetails,
    getSiteIDFromEmail,
    getSiteDataByDay,
    getSiteWeekData,
    getSiteDataDayRangeDaily,
    getSiteWeekHistoricalAverage,
    getSiteDataDayRange6Hourly,
    getSiteDataDayRangeMonthly,
    getSitePastWeekAverage,
    getSiteWeekHistoricalAverage,
    getSiteDataFromMonth,
    insertHistoricalTest,
    getHistoricalSiteDataFromUserID,
    getSiteTimeFrameData,
    getSiteReportListData
}