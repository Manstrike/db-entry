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

    async getUser(id) {
        return await this._userGateway.read(id);
    }

    async userStartToWork(userId, startTime) {
        return await this._userSessionsGateway.setStart(userId, startTime);
    }

    async userFinishToWork(userId, finishedTime) {
        const startedAt = await this._userSessionsGateway.getLastStartTime(userId);
        await this._userSessionsGateway.setFinish(userId, finishedTime);

        const sessionLength = await this._calculateWorkingTime(startedAt, finishedAt);
        await this._userSessionsGateway.setSessionLength(userId, sessionLength);
    }

    async _calculateWorkingTime(userStartedAt, userFinishedAt) {
        const startAt = moment(userStartedAt);
        const finishAt = moment(userFinishedAt);
        return finishAt.subtract(startAt);
    }
}

