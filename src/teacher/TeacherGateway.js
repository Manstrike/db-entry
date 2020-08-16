import { AbstractGateway } from "../utils/AbstractGateway.js";

export class TeacherGateway {
    constructor({ dbConnection }) {
        this._dbConnection = dbConnection;
    }

    async create(teacher, authorId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            INSERT teachers (firstName, secondName, gender, position, school, school_building, subject, email)
            VALUES (
                '${teacher.firstName}', '${teacher.secondName}', '${teacher.gender}',
                '${teacher.position}', ${teacher.school}, ${teacher.schoolBuilding}, 
                '${teacher.subject}', '${teacher.email}'
            )
        `;
        const [{ insertId }] =  await connection.execute(query);
        if (insertId) {
            const insertIntoStatsTable = `
                INSERT users_to_entries (user_id, entry_id)
                VALUES (
                    ${authorId}, ${insertId}
                )    
            `;
            
            return await connection.execute(insertIntoStatsTable);
        }
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

    async readByBuilding(schoolId, building, userId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM teachers
            LEFT JOIN users_to_entries 
                ON teachers.id = users_to_entries.entry_id
            WHERE school = ${schoolId} 
                AND school_building = ${building}
                AND users_to_entries.user_id = ${userId}
        `;

        const [ rows ] = await connection.execute(query);
        return rows;
    }

    async readBySchool(schoolId, userId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM teachers
            LEFT JOIN users_to_entries 
                    ON teachers.id = users_to_entries.entry_id
            WHERE school = ${schoolId} AND users_to_entries.user_id = ${userId}
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
