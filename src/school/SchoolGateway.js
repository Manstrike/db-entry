import { AbstractGateway } from "../utils/AbstractGateway.js";

export class SchoolGateway extends AbstractGateway {
    constructor() {
        super();
    }

    async create(school) {
        await this._readFile();

        this._db.schools.push(school);

        return await this._writeFile();
    }

    async read(id) {
        let data = null;

        try {
            await this._readFile();

            data = this._db.schools.filter((item) => item.id === id);
        } catch(e) {
            throw new Error('error while reading');
        }

        return data;
    }

    async readAll() {
        let data = null;

        try {
            await this._readFile();
            data = [...this._db.schools];
        } catch (e) {
            throw new Error('error while reading');
        }

        return data;
    }

    async readCommunities() {
        let data = null;

        try {
            await this._readFile();
            data = [...this._db.communities];
        } catch (e) {
            throw new Error('error while reading');
        }
        
        return data;
    }
}
