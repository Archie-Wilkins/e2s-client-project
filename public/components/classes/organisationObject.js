class OrganisationObject extends Object {
    constructor() {
        super();
        this._organisation = null;
    }

    get organisation() {
        return this._organisation;
    }

    set organisation(organisation) {
        this._organisation = organisation;
    }

    // Remember payment details
}