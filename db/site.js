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


export default {
    all,
}