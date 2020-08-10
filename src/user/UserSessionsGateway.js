export class UserSessionsGateway {
    constructor({dbConnection}) {
        this._dbConnection = dbConnection;
    }
    async setStart(userId, time) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            UPDATE user_sessions
            SET started_at = '${time}'
            WHERE user_id = ${userId}
        `;

        return await connection.execute(query);
    }

    async setFinish(userId, time) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            UPDATE user_sessions
            SET finished_at = '${time}'
            WHERE user_id = ${userId}
        `;

        return await connection.execute(query);
    }

    async setSessionLength(userId, length) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            UPDATE user_sessions
            SET session_length = '${length}'
            WHERE user_id = ${userId}
        `;

        return await connection.execute(query);
    }

    async getAllSessionByUser(userId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT session_length
            FROM user_sessions
            WHERE user_id = ${userId}
        `;

        const [rows] = await connection.execute(query);

        return rows;
    }

    async getLastStartTime(userId) {
        const connection = await this._dbConnection.getConnection();

        const query = `
            SELECT MAX(started_at)
            FROM user_sessions
            WHERE user_id = ${userId} AND finished_at = null
        `;

        const [rows] = await connection.execute(query);

        return rows[0];
    }
}
