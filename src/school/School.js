export class School {
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

    setMunicipality(value) {
        this._municipality = value;
        return this;
    }

    get municipality() {
        return this._municipality;
    }

    setStreet(value) {
        this._street = value;
        return this;
    }

    get street() {
        return this._street;
    }

    setPostalCode(value = null) {
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

    setWebsite(value = null) {
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

    setTelephone(value = null) {
        this._telephone = value;
        return this;
    }

    get telephone() {
        return this._telephone;
    }

    getPlainObject() {
        return {
            level: this.level,
            community: this.community,
            municipality: this.municipality,
            street: this.street,
            postalCode: this.postalCode,
            city: this.city,
            website: this.website,
            email: this.email,
            telephone: this.telephone,
        }
    }
}
