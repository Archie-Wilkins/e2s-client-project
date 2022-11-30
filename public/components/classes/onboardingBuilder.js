class OnboardingBuilder {

  constructor() {
    this.onboarding = new Onboarding();
  }

  setOnboardingTitle(number) {
    this.onboarding.number = number;
  }

  setOnboardingDescription(description) {
    this.onboarding.description = description;
  }

  setOnboardingImage(image) {
    this.onboarding.image = image;
  }

  getOnboarding() {
    return this.onboarding;
  }
}