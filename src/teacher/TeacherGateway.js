import { AbstractGateway } from "../utils/AbstractGateway.js";

export class TeacherGateway {
    constructor({ dbConnection }) {
        this._dbConnection = dbConnection;
    }

    async create(teacher) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            INSERT teachers (firstName, secondName, gender, position, school, school_building, subject, email)
            VALUES (
                '${teacher.firstName}', '${teacher.secondName}', '${teacher.gender}',
                '${teacher.position}', ${teacher.school}, ${teacher.schoolBuilding}, 
                '${teacher.subject}', '${teacher.email}'
            )
        `;

        return await connection.execute(query);
    }

    async update(teacher) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            UPDATE teachers 
            SET
                firstName = '${teacher.firstName}',
                secondName = '${teacher.secondName}',
                gender = '${teacher.gender}',
                position = '${teacher.position}',
                school = ${teacher.school},
                school_building = ${teacher.schoolBuilding},
                subject = '${teacher.subject}',
                email = '${teacher.email}'
            WHERE id = ${teacher.id}
        `;

        return await connection.execute(query);
    }

    async read(id) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM teachers
            WHERE id = ${id}
        `;

        const [ rows ] = await connection.execute(query);
        return rows[0];
    }

    async readByBuilding(schoolId, building) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM teachers
            WHERE   school = ${schoolId} 
                AND school_building = ${building}
        `;

        const [ rows ] = await connection.execute(query);
        return rows;
    }

    async readBySchool(schoolId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM teachers
            WHERE   school = ${schoolId} 
        `;

        const [ rows ] = await connection.execute(query);
        return rows;
    }

    async readByEmail(email) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM teachers
            WHERE email = ${email} 
        `;

        const [ rows ] = await connection.execute(query);
        return rows[0];
    }
}
