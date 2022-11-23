var mysql = require('mysql'),
    db;

module.exports = {
    init: function(conf){
        if(!db){
            db = mysql.createPool({
                host: conf.host,
                user: conf.root,
                password: conf.password,
                database: conf.database
            });
        }
    },
    get: function() {
        if(!db) {
            throw new Error('The db pool has not been initialized, call init({}) prior to get().');
        }

        return db;
    }
};

