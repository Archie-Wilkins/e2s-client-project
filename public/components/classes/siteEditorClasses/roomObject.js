class RoomObject {
    constructor(tempId, roomName, roomSizeX, roomSizeY, roomPosX, roomPosY) {
        this.tempId = tempId;
        this.roomName = roomName;
        this.roomSizeX = roomSizeX;
        this.roomSizeY = roomSizeY;
        this.roomPosX = roomPosX;
        this.roomPosY = roomPosY;
        this.roomAssets = [];
        };

    addAssetObject(assetObject) {
        this.roomAssets.push(assetObject);
    }

    getJsonFormat() {
        return {
            name: this.roomName,
            sizeX: this.roomSizeX,
            sizeY: this.roomSizeY,
            posX: this.roomPosX,
            posY: this.roomPosY,
        }
    }

    // Getters and Setters

    getAssets() {
        return this.roomAssets;
    }

    getRoomName() {
        return this.roomName;
    }

    getRoomSizeX() {
        return this.roomSizeX;
    }

    getRoomSizeY() {
        return this.roomSizeY;
    }

    getRoomPosX() {
        return this.roomPosX;
    }

    getRoomPosY() {
        return this.roomPosY;
    }

    setRoomName(roomName) {
        this.roomName = roomName;
    }

    setRoomSizeX(roomSizeX) {
        this.roomSizeX = roomSizeX;
    }

    setRoomSizeY(roomSizeY) {
        this.roomSizeY = roomSizeY;
    }

    setRoomPosX(roomPosX) {
        this.roomPosX = roomPosX;
    }

    setRoomPosY(roomPosY) {
        this.roomPosY = roomPosY;
    }
}

