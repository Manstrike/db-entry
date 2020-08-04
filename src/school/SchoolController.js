export class SchoolController {
    constructor({ gateway, shortId, entityFactory }) {
        this._gateway = gateway;
        this._entityFactory = entityFactory;
        this._shortId = shortId;
    }

    async create(data) {
        console.log({data});

        const id = this._shortId.generate();
        console.log({id})
        const buildings = this.createBuildingList(data.schoolBuildings);
        
        const website = data.website === ''
            ? []
            : data.website

        console.log({buildings, website})

        const school = this._entityFactory.createSchool()
            .setId(id)
            .setLevel(data.level)
            .setCommunity(data.community)
            .setStreet(data.street)
            .setPostalCode(data.postalCode)
            .setCity(data.city)
            .setWebsite(website)
            .setEmail(data.email)
            .setTelephone(data.telephone)
            .setBuildingsList(buildings)
            .getPlainObject();
        
        try {
            await this._gateway.create(school);
        } catch(error) {
            throw new Error(error);
        }
    }

    createBuildingList(buildingsString) {
        if (buildingsString === '') return [];
        return buildingsString
            .split(',')
            .map(item => {
                return {id: this._shortId.generate(), name: item};
            });
    }

    async get(id) {
        return await this._gateway.read(id);
    }

    async getAll(){
        return await this._gateway.readAll();
    }

    async getCommunities() {
        return await this._gateway.readCommunities();
    }
}
