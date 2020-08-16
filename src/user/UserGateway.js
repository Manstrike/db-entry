export class UserGateway {
    constructor({dbConnection}) {
        this._dbConnection = dbConnection;
    }

    async create(data) {
        const connection = await this._dbConnection.getConnection();
        const {name, password} = data;

        const userExists = await this.readByName(name);
        if (userExists) {
            throw new Error('User already exists')
        }

        const role = data.role ? data.role : 'employee';
        const query = `
            INSERT users(name, password, role)
            VALUES('${name}', '${password}', '${role}')
        `;

        await connection.execute(query);
    }

    async read(id) {
        const connection = await this._dbConnection.getConnection();

        const query = `
            SELECT * \n
            FROM users \n
            WHERE id = '${id}'    
        `;

        const [rows] = await connection.execute(query);
        
        return rows[0];
    }

    async readByName(name) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM users
            WHERE name = '${name}'    
        `;

        const [rows] = await connection.execute(query);
        
        return rows[0];
    }

    async update({id}, userObject) {
        const connection = await this._dbConnection.getConnection();
        
        const query = `
            UPDATE users
            SET name = '${userObject.name}',
                password = '${userObject.password}',
                role = '${userObject.role}'
            WHERE id = ${id}
        `;

        return await connection.execute(query);
    }

    async getAllUsers() {
        const connection = await this._dbConnection.getConnection();
        
        const query = `
            SELECT users.*, SUM(DISTINCT session_length) as worked_total, COUNT(DISTINCT users_to_entries.id) as entered FROM users
            LEFT JOIN user_sessions ON users.id = user_sessions.user_id
            LEFT JOIN users_to_entries ON users.id = users_to_entries.user_id
            GROUP BY users.id
        `;

        const [rows] = await connection.execute(query);

        return rows;
    }
}
