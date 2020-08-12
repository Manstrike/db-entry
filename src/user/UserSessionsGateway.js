export class UserSessionsGateway {
    constructor({dbConnection}) {
        this._dbConnection = dbConnection;
    }
    async setStart(userId, time) {
        const connection = await this._dbConnection.getConnection();
        

        const query = `
            INSERT user_sessions (user_id, started_at)
            VALUES (${userId}, '${time}')
        `;

        return await connection.execute(query);
    }

    async unfinishedUserSessions(userId) {
        const connection = await this._dbConnection.getConnection();

        const query = `
            SELECT * 
            FROM user_sessions
            WHERE user_id = ${userId} AND finished_at IS NULL
        `;

        return await connection.execute(query);
    }

    async setFinish(rowId, time) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            UPDATE user_sessions
            SET finished_at = '${time}'
            WHERE id = ${rowId}
        `

        return await connection.execute(query);
    }

    async setSessionLength(id, length) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            UPDATE user_sessions
            SET session_length = '${length}'
            WHERE id = ${id}
        `;

        return await connection.execute(query);
    }

    async getAllSessionByUser(userId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT SUM(session_length)
            FROM user_sessions
            WHERE user_id = ${userId}
        `;

        const [rows] = await connection.execute(query);

        return rows[0];
    }

    async getAllSessions() {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM user_sessions
        `;

        const [ rows ] = await connection.execute(query);

        return rows;
    }

    async getLastStartTime(userId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT id, started_at
            FROM user_sessions
            WHERE user_id = ${userId} AND finished_at IS NULL
        `;

        const [rows] = await connection.execute(query);
        return rows[0];
    }
}
