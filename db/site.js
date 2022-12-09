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

export const getSiteReportListData = async () => {
    return new Promise((resolve, reject) =>  {
        db.query('SELECT sites.site_name, sites.county, organisations.name, sites_historic.time_stamp FROM ((sites' +
            ' INNER JOIN organisations ON sites.org_id = organisations.org_id)' +
            ' INNER JOIN sites_historic ON sites.site_id = sites_historic.site_id)' +
            ' GROUP BY DATE(time_stamp), site_name;', (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}


export default {
    all,
    getSiteReportListData
}