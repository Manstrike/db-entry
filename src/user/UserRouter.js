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
                await this._userController.create(req.body);
            } catch (e) {
                throw new Error('Something went wrong in UserRouter');
            }

            return res.sendStatus(200);
        });

        router.get('/:id', async (req, res) => {
            if (!req.params.id) return res.sendStatus(400);

            let data = null;
            try {
                data = await this._userController.get(req.params.id);
            } catch (e) {
                throw new Error('Something went wrong in UserRouter');
            }

            return res.json(data);
        });

        return router;
    }
}
