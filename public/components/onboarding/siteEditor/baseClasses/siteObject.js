class SiteObject {
    constructor(tempId, siteName, sitePostcode, siteAddress1, siteAddress2, county, sizeX, sizeY)
    {
        this.tempId = tempId
        this.siteName = siteName;
        this.sitePostcode = sitePostcode;
        this.siteAddress1 = siteAddress1;
        this.siteAddress2 = siteAddress2;
        this.county = county;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.floors = []
    }

    getJsonFormat() {
        return {
            name: this.siteName,
            postcode: this.sitePostcode,
            address1: this.siteAddress1,
            address2: this.siteAddress2,
            county: this.county,
            sizeX: this.sizeX,
            sizeY: this.sizeY,
        }
    }

    addFloorObject(floorObject) {
        this.floors.push(floorObject);
    }

    // Getters and Setters

    getFloors() {
        return this.floors;
    }

    getSiteName() {
        return this.siteName;
    }

    getSitePostcode() {
        return this.sitePostcode;
    }

    getSiteAddress1() {
        return this.siteAddress1;
    }

    getSiteAddress2() {
        return this.siteAddress2;
    }

    getCounty() {
        return this.county;
    }

    getSizeX() {
        return this.sizeX;
    }

    getSizeY() {
        return this.sizeY;
    }

    setSiteName(siteName) {
        this.siteName = siteName;
    }

    setSitePostcode(sitePostcode) {
        this.sitePostcode = sitePostcode;
    }

    setSiteAddress1(siteAddress1) {
        this.siteAddress1 = siteAddress1;
    }

    setSiteAddress2(siteAddress2) {
        this.siteAddress2 = siteAddress2;
    }

    setCounty(county) {
        this.county = county;
    }

    setSizeX(sizeX) {
        this.sizeX = sizeX;
    }

    setSizeY(sizeY) {
        this.sizeY = sizeY;
    }
}