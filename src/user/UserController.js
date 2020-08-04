export class UserController {
    constructor({ shortId, userGateway, entityFactory }) {
        this._userGateway = userGateway;
        this._shortId = shortId;
        this._entityFactory = entityFactory;
    }

    createUser(data) {
        const id = this._shortId.generate();
        const user = this._entityFactory.createUser()
            .setId(id)
            .setName(data.name)
            .setPassword(data.password)
            .setRole(data.role)
            .getPlainObject();

        try {
            this._userGateway.create(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async getUser(login) {
        return await this._userGateway.read({login});
    }
}
