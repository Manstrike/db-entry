import { School } from '../school/School.js';
import { Teacher } from '../teacher/Teacher.js';
import { User } from '../user/User.js'; 

export class EntityFactory {
    createUser() {
        return new User();
    }

    createTeacher() {
        return new Teacher();
    }

    createSchool() {
        return new School();
    }
}
