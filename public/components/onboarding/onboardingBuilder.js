

class OnboardingBuilder {
    constructor() {
        this.onboardingResult = new OnboardingResult();
    }

    addUserObject(userObject) {
        this.onboardingResult.userObjects.push(userObject);
    }

    setOrganisationObject(orgObject) {
        this.onboardingResult.organisation = orgObject;
    }

    setThirdParty(state=false){
        this.onboardingResult.thirdParty = state;
    }

    setCSVDatasource(csvData) {
        this.onboardingResult.csvData = csvData;
    }

    setFeedback(feedback) {
        this.onboardingResult.feedback = feedback;
    }

    build() {
        return this.onboardingResult;
    }
}
