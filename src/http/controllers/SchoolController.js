import shortId from 'shortid';
import { School } from '../../entities/School.js';
import { SchoolGateway } from '../../utils/SchoolGateway.js';

export class SchoolController {
    constructor() {
        this._gateway = new SchoolGateway();
    }

    create(data) {
        const id = shortId.generate();
        const school = new School()
            .setId(id)
            .setLevel(data.level)
            .setCommunity(data.community)
            .setStreet(data.street)
            .setPostalCode(data.postalCode)
            .setCity(data.city)
            .setWebsite(data.website)
            .setEmail(data.email)
            .setTelephone(data.telephone)
            .setBuildingsList(data.buildingsList);
        
        try {
            this._gateway.create(school.getPlainObject());
        } catch(error) {
            throw new Error(error);
        }
    }

    async get(id) {
        let data;
        console.log(this);

        try {
            data = await this._gateway.read(id);
        } catch (e) {
            throw new Error(e);
        }

        return data;
    }
}
