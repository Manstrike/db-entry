export class SchoolGateway {
    constructor({ dbConnection }) {
        this._dbConnection = dbConnection;
    }

    async create(school) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            INSERT schools (level, community, street, postalCode, city, telephone, website, email, municipality)
            VALUES (
                '${school.level}', ${school.community}, '${school.street}',
                ${school.postalCode}, '${school.city}',' ${school.telephone}', 
                '${school.website}', '${school.email}', '${school.municipality}'
            )
        `;
        const [ rows ] = await connection.execute(query);

        return rows;
    }

    async read(id) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT schools.*, GROUP_CONCAT(school_buildings.building_name) as schoolBuildings
            FROM schools
            LEFT JOIN school_buildings 
                ON school_buildings.school_id = schools.id 
            WHERE schools.id = ${id}
            GROUP BY schools.id
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

    async update(school) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            UPDATE schools
            SET
                level = '${school.level}',
                community = ${school.community},
                street = '${school.street}',
                postalCode = ${school.postalCode},
                telephone = '${school.telephone}',
                city = '${school.city}',
                email = '${school.email}',
                municipality = '${school.municipality}',
                website = '${school.website}'
            WHERE id = ${school.id}
        `;
        const deleteQuery = `
            DELETE FROM school_buildings
            WHERE school_id = ${school.id}
        `;

        await connection.execute(deleteQuery);
        const [rows] = await connection.execute(query);
        console.log({rows})
        return rows;
    }
}
