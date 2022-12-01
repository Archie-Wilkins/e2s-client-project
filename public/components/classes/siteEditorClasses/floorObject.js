class FloorObject{
    constructor(tempId, name, floorNumber, floorSizeX, floorSizeY){
        this.tempId = tempId;
        this.name = name;
        this.floorNumber = floorNumber;
        this.floorSizeX= floorSizeX;
        this.floorSizeY = floorSizeY;
        this.rooms = []
    }

    getJsonFormat() {
        return {
            name: this.name,
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

    getName() {
        return this.name;
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