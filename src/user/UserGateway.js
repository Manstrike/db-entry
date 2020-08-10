export class UserGateway {
    constructor({dbConnection}) {
        this._dbConnection = dbConnection;
    }

    async create(data) {
        const connection = await this._dbConnection.getConnection();
        const {name, password} = data;
        const role = data.role ? data.role : 'employee';
        const query = `
            INSERT users(password, name, role)\n
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
        
        return rows;
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
}
