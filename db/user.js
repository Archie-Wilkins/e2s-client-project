import { Connection } from "./index";

export const all = async () => {
    return new Promise((resolve, reject) =>  {

        Connection.query('SELECT * from users', (err, results) => {
            if(err) {
                return reject(err);
            }
            console.log(results);
            resolve(results);
        });

    });
}

export const getUserIDFromEmail = async (userEmail, userPassword) => {
    return new Promise((resolve, reject) =>  {

        Connection.query("SELECT User_Id FROM users WHERE User_Email = " + "'" + userEmail + "'", (err, results) => {
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

        Connection.query("SELECT CAST(aes_decrypt(User_Password, 'ethan') AS CHAR) AS decrypted_password FROM users WHERE User_Id = " +"'" + userID + "'", (err, results) => {
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