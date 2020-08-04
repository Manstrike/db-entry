import { AbstractGateway } from '../utils/AbstractGateway.js';

export class UserGateway extends AbstractGateway {
    constructor() {
        super();
    }

    async create(data) {
        await this._readFile();

        this._db.users.push(data);

        return await this._writeFile();
    }

    async read({login, id}) {
        let data = null;

        try {
            await this._readFile();
            
            if (id) {
                data = this._db.users.filter((item) => item.id === id);
            } else {
                data = this._db.users.filter((item) => item.name === login);
            }
        } catch(e) {
            throw new Error('error while reading');
        }

        return data;
    }
}
