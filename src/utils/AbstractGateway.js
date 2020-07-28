import path from 'path';
import { promises as fs } from 'fs';

export class AbstractGateway {
    constructor() {
        this._db = null;
        this.__dirname = path.resolve();
        this._fileName = path.join(this.__dirname, '/storage/database.json');
    }

    async _readFile() {
        const data = await fs.readFile(this._fileName, 'utf-8');
        this._db = JSON.parse(data);
    }

    async _writeFile() {
        const data = JSON.stringify(this._db, null, 2);
        await fs.writeFile(this._fileName, data);
    }
}
