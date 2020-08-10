export class TeacherController {
    constructor({ shortId, teacherGateway, schoolGateway, entityFactory, emailGenerator }) {
        this._teacherGateway = teacherGateway;
        this._schoolGateway = schoolGateway;
        this._shortId = shortId;
        this._entityFactory = entityFactory;
        this._emailGenerator = emailGenerator;
    }

    async create(data) {
        if (!data.school && !data.building) throw new Error('Neither school of building was provided');
        
        const teacher = this._entityFactory.createTeacher()
            .setFirstName(data.firstName)
            .setSecondName(data.secondName)
            .setGender(data.gender)
            .setPosition(data.position)
            .setSchool(data.school)
            .setSchoolBuilding(data.school_building)
            .setSubject(data.subject)
            .setEmail(data.email)
            .getPlainObject();

        if (data.id) {
            const rowExists = await this.get(data.id);
            teacher.id = data.id;
            return await this._teacherGateway.update(teacher);
        }
        
        return await this._teacherGateway.create(teacher);
    }

    async get(id) {
        return await this._teacherGateway.read(id);
    }

    async findByEmail(email) {
        return await this._teacherGateway.readByEmail(email);
    }

    async getByBuilding(schoolId, building) {
        return await this._teacherGateway.readByBuilding(schoolId, building);
    }

    async getBySchool(schoolId) {
        return await this._teacherGateway.readBySchool(schoolId);
    }
}
