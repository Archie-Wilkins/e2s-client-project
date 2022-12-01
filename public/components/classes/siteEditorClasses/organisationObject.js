class OrganisationObject {
    constructor(organisationName, sectorId, companiesHouseNumber, goalIds=[]) {
        this.organisationName = organisationName;
        this.sectorId = sectorId;
        this.companiesHouseNumber = companiesHouseNumber;
        this.goalIds = goalIds;
        this.sites = [];
    }

    addSite(site) {
        this.sites.push(site);
    }

    addGoalId(goalId) {
        this.goalIds.push(goalId);
    }
    // Getters and setters
    getOrganisationName() {
        return this.organisationName;
    }

    getSectorId() {
        return this.sectorId;
    }

    getCompaniesHouseNumber() {
        return this.companiesHouseNumber;
    }

    getGoalIds() {
        return this.goalIds;
    }

    getSites(){
        return this.sites;
    }

    setOrganisationName(organisationName) {
        this.organisationName = organisationName;
    }

    setSectorId(sectorId) {
        this.sectorId = sectorId;
    }

    setCompaniesHouseNumber(companiesHouseNumber) {
        this.companiesHouseNumber = companiesHouseNumber;
    }



}
