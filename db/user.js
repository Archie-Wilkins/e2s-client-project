var db = require('./DatabaseCore.js');

export const all = async () => {
    return new Promise((resolve, reject) =>  {

<<<<<<< HEAD
        Connection.query('SELECT * from user_data', (err, results) => {
            if(err) {
                return reject(err);
            }
            console.log(results);
=======
        db.query('SELECT * from user_data', (err, results) => {
            if(err) {
                return reject(err);
            }
>>>>>>> proposed-login-changes-db-edit
            resolve(results);
        });

    });
}

export const getUserIDFromEmail = async (userEmail) => {
    return new Promise((resolve, reject) =>  {

<<<<<<< HEAD
        Connection.query("SELECT user_id FROM user_data WHERE email = " + "'" + userEmail + "'", (err, results) => {
=======
        db.query("SELECT user_id FROM user_data WHERE email = " + "'" + userEmail + "'", (err, results) => {
>>>>>>> proposed-login-changes-db-edit
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}


export const getPasswordFromID = async (userID) => {
    return new Promise((resolve, reject) =>  {

<<<<<<< HEAD
        Connection.query("SELECT CAST(aes_decrypt(password, 'ethan') AS CHAR) AS decrypted_password FROM user_data WHERE user_id = " +"'" + userID + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            console.log(results);
=======
        db.query("SELECT CAST(aes_decrypt(password, 'ethan') AS CHAR) AS decrypted_password FROM user_data WHERE user_id = " +"'" + userID + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
>>>>>>> proposed-login-changes-db-edit
            resolve(results);
        });

    });
}

<<<<<<< HEAD
=======
export const createResetRecord = async (userID, code) => {
    return new Promise((resolve, reject) =>  {

        //delete any record with matching userID
        db.query("DELETE FROM password_reset WHERE user_id = " + "'" + userID + "'" , (err, results) => {});

        //creates Date 10 mins into future
        var expiryDate = new Date(new Date().getTime() + (10 * 60 * 1000))

        var formatted_expiry_date = expiryDate.getFullYear() + "-"
            + expiryDate.getMonth() + "-"
            + expiryDate.getDate() + " "
            + expiryDate.getHours() + ":"
            + expiryDate.getMinutes() + ":"
            + expiryDate.getSeconds();


        db.query("INSERT INTO password_reset (user_id, code, expiry_time) VALUES (" + userID + ", aes_encrypt('" + code + "', 'ethan'), convert( " + "'" + formatted_expiry_date + "', datetime));", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const getUserResetCode = async (userID) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT CAST(aes_decrypt(code, 'ethan') AS CHAR) AS decrypted_code FROM password_reset WHERE user_id = " +"'" + userID + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

export const updateUserPassword = async (userID, password) => {
    return new Promise((resolve, reject) =>  {
        db.query("UPDATE user_data SET password = aes_encrypt(" + "'" + password + "', 'ethan') WHERE user_id = " + userID, (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });
    });
}

>>>>>>> proposed-login-changes-db-edit

export default {
    all,
    getUserIDFromEmail,
<<<<<<< HEAD
    getPasswordFromID
=======
    getPasswordFromID,
    createResetRecord,
    getUserResetCode,
    updateUserPassword
>>>>>>> proposed-login-changes-db-edit
}