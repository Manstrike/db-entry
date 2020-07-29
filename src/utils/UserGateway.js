import { AbstractGateway } from './AbstractGateway.js';

export class UserGateway extends AbstractGateway {
    constructor() {
        super();
    }

    async create(data) {
        await this._readFile();

        this._db.users.push(data);

        return await this._writeFile();
    }

    async read(id) {
        let data = null;

        try {
            await this._readFile();

            data = this._db.users.filter((item) => item.id === id);
        } catch(e) {
            throw new Error('error while reading');
        }

        return data;
    }
} 