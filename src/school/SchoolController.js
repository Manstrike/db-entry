export class SchoolController {
    constructor({ gateway, schoolBuildingsGateway, shortId, entityFactory }) {
        this._gateway = gateway;
        this._entityFactory = entityFactory;
        this._schoolBuildingsGateway = schoolBuildingsGateway;
        this._shortId = shortId;
    }

    async create(data) {
        const school = this._entityFactory.createSchool()
            .setLevel(data.level)
            .setCommunity(data.community)
            .setStreet(data.street)
            .setPostalCode(data.postalCode)
            .setCity(data.city)
            .setWebsite(data.website)
            .setEmail(data.email)
            .setTelephone(data.telephone)
            .getPlainObject();
        const {insertId} = await this._gateway.create(school);

        if (insertId && data.schoolBuildings) {
            for (const building of data.schoolBuildings) {
                await this._schoolBuildingsGateway.setBuilding(insertId, building);
            }
        }
    }

    async get(id) {
        return await this._gateway.read(id);
    }

    async getAll() {
        const result = [];
        const schools = await this._gateway.readAll();
        for (const school of schools) {
            const schoolWithBuildings = school;
            schoolWithBuildings.buildingsList = await this.getBuildings(school.id);
            result.push(schoolWithBuildings);
        }

        return result; 
    }

    async getCommunities() {
        return await this._gateway.readCommunities();
    }

    async getBuildings(schoolId) {
        return await this._schoolBuildingsGateway.getAllBuildings(schoolId);
    }
}
