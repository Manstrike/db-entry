import { TeacherGateway } from '../../utils/TeacherGateway.js';
import { EmailGenerator } from '../../utils/EmailGenerator.js';
import { SchoolGateway } from '../../utils/SchoolGateway.js';
import { Teacher } from '../../entities/Teacher.js';
import shortId from 'shortid';

export class PersonController {
    constructor() {
        this._teacherGateway = new TeacherGateway();
        this._schoolGateway = new SchoolGateway();
    }

    async create(data) {
        console.log({data});
        try {
            const [school] = await this._schoolGateway.read(data.school);
            const teacherEmail = EmailGenerator.generate({
                firstName: data.firstName,
                secondName: data.secondName,
                email: school.email,
            });
            
            const id = shortId.generate();
            const teacher = new Teacher()
                .setId(id)
                .setFirstName(data.firstName)
                .setSecondName(data.secondName)
                .setGender(data.gender)
                .setPosition(data.position)
                .setSchool(data.school)
                .setSchoolBuilding(data.schoolBuilding)
                .setSubject(data.subject)
                .setEmail(teacherEmail);
    
            console.dir({teacherEmail, teacher});
    
            this._teacherGateway.create(teacher.getPlainObject());
        } catch(e) {
            console.warn(e);
        }
    }
}