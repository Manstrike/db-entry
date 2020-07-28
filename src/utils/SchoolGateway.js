import { AbstractGateway } from "./AbstractGateway.js";

export class SchoolGateway extends AbstractGateway {
    constructor() {
        super();
    }

    async create(school) {
        await this._readFile();

        if (!this._db) {
            throw new Error('no data was read!');
        };

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
}