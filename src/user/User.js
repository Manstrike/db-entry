export class User {
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

    setRole(value = 'employee') {
        this._role = value;
        return this;
    }

    get role() {
        return this._role;
    }

    getPlainObject() {
        return {
            name: this.name,
            password: this.password,
            role: this.role
        };
    }
}
