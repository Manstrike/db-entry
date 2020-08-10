export class SchoolBuildingsGateway {
    constructor({ dbConnection }) {
        this._dbConnection = dbConnection;
    }

    async setBuilding(schoolId, building) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            INSERT school_buildings(school_id, building_name)
            VALUES (${schoolId}, '${building}')
        `;

        return await connection.execute(query);
    }

    async getBuilding(buildingId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM school_buildings
            WHERE id = ${buildingId}
        `;

        const [rows] = await connection.execute(query);
        return rows[0];
    }

    async getAllBuildings(schoolId) {
        const connection = await this._dbConnection.getConnection();
        const query = `
            SELECT *
            FROM school_buildings
            WHERE school_id = ${schoolId}
        `;

        const [ rows ] = await connection.execute(query);
        return rows;
    }
}
