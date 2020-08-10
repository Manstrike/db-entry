import mysql from 'mysql2/promise.js';

export class DatabaseConnection {
    async createConnection() {
        this._connection = await mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            queueLimit: 0
        });

        return this;
    }

    async getConnection() {
        if (!this._connection) {
            await this.createConnection();
        }

        return this._connection;
    }
}
