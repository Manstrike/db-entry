import { AbstractGateway } from "./AbstractGateway.js";

export class TeacherGateway extends AbstractGateway {
    constructor() {
        super();
    }

    async create(teacher) {
        await this._readFile();

        this._db.teachers.push(teacher);

        return await this._writeFile();
    }

    async read(id) {
        let data = null;

        try {
            await this._readFile();
            
            data = this._db.teachers.filter((item) => item.id === id);
        } catch(e) {
            throw new Error('error while reading: ' + e);
        }

        return data;
    }
}