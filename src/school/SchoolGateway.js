export class SchoolGateway {
    constructor({ dbConnection }) {
        this._dbConnection = dbConnection;
    }

    async create(school) {
        console.log({school})
        const connection = await this._dbConnection.getConnection();
        const query = `
            INSERT schools (level, community, street, postalCode, city, telephone, website, email)
            VALUES (
                '${school.level}', ${school.community}, '${school.street}',
                ${school.postalCode}, '${school.city}',' ${school.telephone}', '${school.website}', '${school.email}'
                )
        `;

        return await connection.execute(query);
    }

    async read(id) {
        let data = null;

        try {
            await this._readFile();

            data = this._db.schools.filter((item) => item.id === id);
        } catch(e) {
            throw new Error('error while reading');
        }

        return data;
    }

    async readAll() {
        let data = null;

        try {
            await this._readFile();
            data = [...this._db.schools];
        } catch (e) {
            throw new Error('error while reading');
        }

        return data;
    }

    async readCommunities() {
        let data = null;

        try {
            await this._readFile();
            data = [...this._db.communities];
        } catch (e) {
            throw new Error('error while reading');
        }
        
        return data;
    }
}
