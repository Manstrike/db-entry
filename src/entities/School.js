export class School {
    setId(value) {
        this._id = value;
        return this;
    }
    
    get id() {
        return this._id;
    }

    setLevel(value) {
        this._level = value;
        return this;
    }

    get level() {
        return this._level;
    }

    setCommunity(value) {
        this._community = value;
        return this;
    }

    get community() {
        return this._community;
    }

    setStreet(value) {
        this._street = value;
        return this;
    }

    get street() {
        return this._street;
    }

    setPostalCode(value) {
        this._postalCode = value;
        return this;
    }

    get postalCode() {
        return this._postalCode;
    }

    setCity(value) {
        this._city = value;
        return this;
    }

    get city() {
        return this._city;
    }

    setWebsite(value) {
        this._website = value;
        return this;
    }

    get website() {
        return this._website;
    }

    setEmail(value) {
        this._email = value;
        return this;
    }

    get email() {
        return this._email;
    }

    setTelephone(value) {
        this._telephone = value;
        return this;
    }

    get telephone() {
        return this._telephone;
    }

    setBuildingsList(value) {
        this._buildingsList = value;
        return this;
    }

    get buildingsList() {
        return this._buildingsList;
    }

    getPlainObject() {
        return {
            id: this.id,
            level: this.level,
            community: this.community,
            street: this.street,
            postalCode: this.postalCode,
            city: this.city,
            website: this.website,
            email: this.email,
            telephone: this.telephone,
            buildingsList: this.buildingsList
        }
    }
}