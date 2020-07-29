import { School } from './School.js';
import { Teacher } from './Teacher.js';
import { User } from './User.js'; 

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
