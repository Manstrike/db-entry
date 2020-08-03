export class TeacherController {
    constructor({ shortId, teacherGateway, schoolGateway, entityFactory, emailGenerator }) {
        this._teacherGateway = teacherGateway;
        this._schoolGateway = schoolGateway;
        this._shortId = shortId;
        this._entityFactory = entityFactory;
        this._emailGenerator = emailGenerator;
    }

    async create(data) {
        try {
            const [ school ] = await this._schoolGateway.read(data.school);
            const teacherEmail = this._emailGenerator.generate({
                firstName: data.firstName,
                secondName: data.secondName,
                email: school.email,
            });
            
            const id = this._shortId.generate();
            const teacher = this._entityFactory.createTeacher()
                .setId(id)
                .setFirstName(data.firstName)
                .setSecondName(data.secondName)
                .setGender(data.gender)
                .setPosition(data.position)
                .setSchool(data.school)
                .setSchoolBuilding(data.schoolBuilding)
                .setSubject(data.subject)
                .setEmail(teacherEmail)
                .getPlainObject();
    
            this._teacherGateway.create(teacher);
        } catch(e) {
            console.warn(e);
        }
    }

    async get(id) {
        return await this._teacherGateway.read(id);
    }
}
