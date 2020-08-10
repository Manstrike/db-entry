export class Teacher {
    setFirstName(value) {
        this._firstName = value;
        return this;
    }

    get firstName() {
        return this._firstName;
    }

    setSecondName(value) {
        this._secondName = value;
        return this;
    }

    get secondName() {
        return this._secondName;
    }

    setGender(value) {
        this._gender = value;
        return this;
    }

    get gender() {
        return this._gender;
    }

    setPosition(value = null) {
        this._position = value;
        return this;
    }

    get position() {
        return this._position;
    }

    setSchool(value) {
        this._school = value;
        return this;
    }

    get school() {
        return this._school;
    }

    setSchoolBuilding(value = null) {
        this._schoolBuilding = value;
        return this;
    }

    get schoolBuilding() {
        return this._schoolBuilding;
    }

    setSubject(value = null) {
        this._subject = value;
        return this;
    }

    get subject() {
        return this._subject;
    }

    setEmail(value) {
        this._email = value;
        return this;
    }

    get email() {
        return this._email;
    }

    getPlainObject() {
        return {
            firstName: this.firstName,
            secondName: this.secondName,
            gender: this.gender,
            position: this.position,
            school: this.school,
            schoolBuilding: this.schoolBuilding,
            subject: this.subject,
            email: this.email
        };
    }
}
