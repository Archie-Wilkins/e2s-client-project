class RoomObject {
    constructor() {
        this._id = null;
        this._name = null;
        this._type = null;
        this._position = null;
        this._rotation = null;
        this._scale = null;
        this._material = null;
        this._geometry = null;
        this._parent = null;
        this._children = [];
        this._isLoaded = false;
        this._isLoadedPromise = new Promise((resolve, reject) => {
            this._isLoadedResolve = resolve;
            this._isLoadedReject = reject;
        });
    }
}