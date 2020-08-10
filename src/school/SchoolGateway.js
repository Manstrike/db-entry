export class SchoolGateway {
    constructor({ dbConnection }) {
        this._dbConnection = dbConnection;
    }

    async create(school) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            INSERT schools (level, community, street, postalCode, city, telephone, website, email)
            VALUES (
                '${school.level}', ${school.community}, '${school.street}',
                ${school.postalCode}, '${school.city}',' ${school.telephone}', 
                '${school.website}', '${school.email}'
            )
        `;
        const [ rows ] = await connection.execute(query);

        return rows;
    }

    async read(id) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM schools
            WHERE id = ${id}
        `;

        const [ rows ] = await connection.execute(query);
        return rows[0];
    }

    async readAll() {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM schools
        `;

        const [ rows ] = await connection.execute(query);
        return rows;
    }

    async readCommunities() {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM communities
        `;

        const [ rows ] = await connection.execute(query);
        return rows;
    }
}
