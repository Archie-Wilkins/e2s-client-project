var db = require('./DatabaseCore.js');

export const getRoomsWithFloorId = async (floorId) => {
    return new Promise((resolve, reject) =>  {
        db.query("SELECT * FROM rooms WHERE floor_id = " + "'" + floorId + "'", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export const setRoom = async (roomName, floorId, roomSizeX, roomSizeY, roomPosX, roomPosY) => {
    return new Promise((resolve, reject) =>  {
        db.query("INSERT INTO rooms (room_name, floor_id, room_size_x, room_size_y, room_pos_x, room_pos_y) VALUES ('" + roomName + "', '" + floorId + "', '" + roomSizeX + "', '" + roomSizeY + "', '" + roomPosX + "', '" + roomPosY + "')", (err, results) => {
            if(err) {
                return reject(err);
            }
            resolve(results);
        });

    });
}

export default {
    getRoomsWithFloorId,
    setRoom
}