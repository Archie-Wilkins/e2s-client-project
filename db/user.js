import { Connection } from "./index";

export const all = async () => {
    return new Promise((resolve, reject) =>  {

        Connection.query('SELECT * from user_data', (err, results) => {
            if(err) {
                return reject(err);
            }
            console.log(results);
            resolve(results);
        });

    });
}

export const getUserIDFromEmail = async (userEmail) => {
    return new Promise((resolve, reject) =>  {

        Connection.query("SELECT user_id FROM user_data WHERE email = " + "'" + userEmail + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            console.log(results);
            resolve(results);
        });

    });
}


export const getPasswordFromID = async (userID) => {
    return new Promise((resolve, reject) =>  {

        Connection.query("SELECT CAST(aes_decrypt(password, 'ethan') AS CHAR) AS decrypted_password FROM user_data WHERE user_id = " +"'" + userID + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            console.log(results);
            resolve(results);
        });

    });
}


export default {
    all,
    getUserIDFromEmail,
    getPasswordFromID
}