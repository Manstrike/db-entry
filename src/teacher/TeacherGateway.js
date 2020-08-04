import { AbstractGateway } from "../utils/AbstractGateway.js";

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

    async readByBuilding(schoolId, building) {
        let data = null;

        try {
            await this._readFile();
            
            data = this._db.teachers.filter((item) => item.school === schoolId && item.schoolBuilding == building);
        } catch(e) {
            throw new Error('error while reading: ' + e);
        }
        console.log({schoolId, building});
        console.log({data});
        return data;
    }

    async readBySchool(id) {
        let data = null;

        try {
            await this._readFile();
            
            data = this._db.teachers.filter((item) => item.school === id);
        } catch(e) {
            throw new Error('error while reading: ' + e);
        }

        return data;
    }
}
