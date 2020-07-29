export class User {
    setId(value) {
        this._id = value;
        return this;
    }

    get id() {
        return this._id;
    }

    setName(value) {
        this._name = value;
        return this;
    }

    get name() {
        return this._name;
    }

    setPassword(value) {
        this._password = value;
        return this;
    }

    get password() {
        return this._password;
    }

    setRole(value) {
        this._role = value;
        return this;
    }

    get role() {
        return this._role;
    }

    getPlainObject() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            role: this.role
        };
    }
}
