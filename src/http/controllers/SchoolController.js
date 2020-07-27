import shortId from 'shortid';
import { School } from '../../entities/School.js';
import { SchoolGateway } from '../../../storage/SchoolGateway.js';

export class SchoolController {
    constructor() {
        this._gateway = new SchoolGateway();
    }

    create(data) {
        console.log({data});

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
        
        this._gateway.create(school);
    }

    get(id) {
        return this._gateway.read(id);
    }
}
