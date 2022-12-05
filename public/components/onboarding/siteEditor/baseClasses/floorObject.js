class FloorObject{
    constructor(tempId, floorNumber, floorSizeX, floorSizeY){
        this.tempId = tempId;
        this.floorNumber = floorNumber;
        this.floorSizeX= floorSizeX;
        this.floorSizeY = floorSizeY;
        this.rooms = []
    }

    getJsonFormat() {
        return {
            floorNumber: this.floorNumber,
            floorSizeX: this.floorSizeX,
            floorSizeY: this.floorSizeY,
        }
    }

    addRoomObject(roomObject) {
        this.rooms.push(roomObject);
    }

    // Getters and Setters

    getRooms() {
        return this.rooms;
    }

    getFloorNumber() {
        return this.floorNumber;
    }

    getFloorSizeX() {
        return this.floorSizeX;
    }

    getFloorSizeY() {
        return this.floorSizeY;
    }

    setName(name) {
        this.name = name;
    }

    setFloorNumber(floorNumber) {
        this.floorNumber = floorNumber;
    }

    setFloorSizeX(floorSizeX) {
        this.floorSizeX = floorSizeX;
    }

    setFloorSizeY(floorSizeY) {
        this.floorSizeY = floorSizeY;
    }
}
