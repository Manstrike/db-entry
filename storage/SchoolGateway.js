import fs from 'fs';
import path from 'path';
export class SchoolGateway {
    constructor() {
        this._db = null;
        this.__dirname = path.resolve();
        this._fileName = path.join(this.__dirname, '/storage/database.json');
    }

    create(school) {
        this._readFile()
            .then(() => console.log('read'));

        if (!this._db) {
            console.log('No data was read');
            return;
        };

        this._db.schools.push(school);
        this._writeFile();
    }

    read(id) {
        this._readFile();

        if (!this._db) {
            console.log('No data was read');
            return;
        };

        return this._db.schools.filter((item) => item.id === id);
    }

    async _readFile() {
        await fs.readFile(this._fileName, (err, data) => {
            if (err) console.log(err);
            console.log(data);
            this._db = JSON.parse(data);
        });
    }

    _writeFile() {
        const data = JSON.stringify(this._db, null, 2);
        fs.writeFile(this._fileName, data, (err) => {
            if (err) throw new 'Write errored!';
        });
    }
}