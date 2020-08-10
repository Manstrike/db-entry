import moment from 'moment';

export class UserController {
    constructor({ shortId, userGateway, userSessionsGateway, entityFactory }) {
        this._userGateway = userGateway;
        this._userSessionsGateway = userSessionsGateway;
        this._shortId = shortId;
        this._entityFactory = entityFactory;
    }

    async createUser(data) {
        const user = this._entityFactory.createUser()
            .setName(data.name)
            .setPassword(data.password)
            .setRole(data.role)
            .getPlainObject();

        try {
            this._userGateway.create(user);
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(name) {
        return await this._userGateway.readByName(name);
    }

    async getUser(id) {
        return await this._userGateway.read(id);
    }

    async userStartToWork(userId, startTime) {
        return await this._userSessionsGateway.setStart(userId, startTime);
    }

    async userFinishToWork(userId, finishedTime) {
        const { id, started_at } = await this._userSessionsGateway.getLastStartTime(userId);
        await this._userSessionsGateway.setFinish(id, finishedTime);

        const sessionLength = await this._calculateWorkingTime(started_at, finishedTime);
        return await this._userSessionsGateway.setSessionLength(id, sessionLength);
    }

    async getAllSessions() {
        return await this._userSessionsGateway.getAllSessions();
    }

    async _calculateWorkingTime(userStartedAt, userFinishedAt) {
        const startAt = moment(userStartedAt);
        const finishAt = moment(userFinishedAt);

        const duration = moment.duration(finishAt.diff(startAt));
        return duration.asHours();
    }
}

