var db = require('./DatabaseCore.js');

export const getSitesWithOrgId = async (orgId) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM site_details WHERE site_org_id = " + "'" + orgId + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const setSite = async (siteName, sitePostcode, siteAdd1, siteAdd2, siteCounty, siteSizeX, siteSizeY, siteOrgId) => {
    return new Promise((resolve, reject) =>  {
        db.query("INSERT INTO site_details (site_name, address_l1, address_l2, county, site_size_x, site_size_y, site_org_id) VALUES ('" + siteName + "', '" + sitePostcode + "', '" + siteAdd1 + "', '" + siteAdd2 + "', '" + siteCounty + "', '" + siteSizeX + "', '" + siteSizeY + "', '" + siteOrgId + "')", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export default {
    getSitesWithOrgId,
    setSite
}