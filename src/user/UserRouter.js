import express from 'express';
const router = express.Router();

export class UserRouter {
    constructor({ app, userController }) {
        this._app = app;
        this._userController = userController;
    }

    init() {
        router.post('/create', async (req, res) => {
            if (!req.body) return res.sendStatus(400);

            try {
                await this._userController.createUser(req.body);
            } catch (e) {
                throw new Error('Something went wrong in UserRouter');
            }

            return res.sendStatus(200);
        });

        router.get('/:id', async (req, res) => {
            if (!req.params.id) return res.sendStatus(400);

            let data = null;
            try {
                data = await this._userController.getUser(req.params.id);
            } catch (e) {
                throw new Error('Something went wrong in UserRouter');
            }

            return res.json(data);
        });
        
        router.post('/time/start', async (req, res) => {
            const { userId, startTime } = req.body;
            if (!userId || !startTime) return res.sendStatus(400);
        
            try {
                await this._userController.setUserStartToWork(userId, startTime);
            } catch (error) {
                throw new Error('Something happened: ' + error);
            }
        });

        router.post('/time/finish', async (req, res) => {
            const { userId, finishTime } = req.body;
            if (!userId || !finishTime) return res.sendStatus(400);
        
            try {
                await this._userController.setUserFinishToWork(userId, finishTime);
            } catch (error) {
                throw new Error('Something happened: ' + error);
            }
        });

        return router;
    }
}
