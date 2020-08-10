export class SchoolController {
    constructor({ gateway, schoolBuildingsGateway, shortId, entityFactory }) {
        this._gateway = gateway;
        this._entityFactory = entityFactory;
        this._schoolBuildingsGateway = schoolBuildingsGateway;
        this._shortId = shortId;
    }

    async create(data) {
        console.log({data})
        //const buildings = this.createBuildingList(data.schoolBuildings);

        const school = this._entityFactory.createSchool()
            .setLevel(data.level)
            .setCommunity(data.community)
            .setStreet(data.street)
            .setPostalCode(data.postalCode)
            .setCity(data.city)
            .setWebsite(data.website)
            .setEmail(data.email)
            .setTelephone(data.telephone)
            //.setBuildingsList(buildings)
            .getPlainObject();
        console.log('school in ctrl', school)
        const schoolId = await this._gateway.create(school);

        console.log({schoolId}) //TODO Check what returns!

        if (schoolId && data.schoolBuildings) {
            //const buildingIds = [];

            for (const building of data.schoolBuildings.split(',')) {
                const buildingId = await this._schoolBuildingsGateway.setBuilding(schoolId, building);
                //buildingIds.push(buildingId);
            }

            //await this._gateway.setBuildings(schoolId, buildingIds);
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
