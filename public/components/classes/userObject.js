class UserObject {
  constructor(email, firstName, lastName, phoneNumber, roleId=4, password="") {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.roleId = roleId;
    this.password = password;
  }

  getJsonFormat() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
    };
  }
  getEmail() {
        return this.email;
  }

  getFirstName() {
    return this.firstName;
  }

  getLastName() {
    return this.lastName;
  }

  getPhoneNumber() {
    return this.phoneNumber;
  }

  setEmail(email) {
    this.email = email;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }


}