export class SchoolController {
    constructor({ gateway, shortId, entityFactory }) {
        this._gateway = gateway;
        this._entityFactory = entityFactory;
        this._shortId = shortId;
    }

    create(data) {
        const id = thi._shortId.generate();
        const school = this._entityFactory.createSchool()
            .setId(id)
            .setLevel(data.level)
            .setCommunity(data.community)
            .setStreet(data.street)
            .setPostalCode(data.postalCode)
            .setCity(data.city)
            .setWebsite(data.website)
            .setEmail(data.email)
            .setTelephone(data.telephone)
            .setBuildingsList(data.buildingsList)
            .getPlainObject();
        
        try {
            this._gateway.create(school);
        } catch(error) {
            throw new Error(error);
        }
    }

    async get(id) {
        return await this._gateway.read(id);
    }
}
