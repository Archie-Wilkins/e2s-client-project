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

export const getSiteData = async (email) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT user_data_site_data_crossref.site_id FROM user_data_site_data_crossref INNER JOIN user_data ON user_data_site_data_crossref.user_id = user_data.user_id WHERE user_data.email = " + "'" + email + "'", (err, results) => {
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
    getSiteIDFromEmail
}