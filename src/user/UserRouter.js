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
                return res.status(500).json(e);
            }

            return res.sendStatus(200);
        });

        router.get('/allSessions', async (req, res) => {
            let data = null;

            try {
                data = await this._userController.getAllSessions();
            } catch (error) {
                return res.status(500).json(error);
            }

            return res.json(data);
        });

        router.post('/login', async (req,res) => {
            const { name, password } = req.body;
            if (!name) return res.sendStatus(400);

            let data;

            try {
                data = await this._userController.login(name);
            } catch (error) {   
                return res.sendStatus(500).json(error);
            }

            res.json(data);
        });

        router.get('/all', async (req, res) => {
            let data;
            try {
                data = await this._userController.getAllUsers();
            } catch (error) {
                return res.sendStatus(500).json(error);
            }

            return res.json(data);
        })

        router.get('/:id', async (req, res) => {
            if (!req.params.id) return res.sendStatus(400);

            let data = null;
            try {
                data = await this._userController.getUser(req.params.id);
            } catch (e) {
                return res.status(500).json(e);
            }

            return res.json(data);
        });
        
        router.post('/time/start', async (req, res) => {
            const { userId, startTime } = req.body;
            console.log(req.body)
            if (!userId || !startTime) return res.sendStatus(400);
        
            try {
                await this._userController.userStartToWork(userId, startTime);
            } catch (error) {
                return res.status(500).json(error);
            }

            res.sendStatus(200);
        });

        router.post('/time/finish', async (req, res) => {
            const { userId, finishTime } = req.body;
            console.log(req.body)
            if (!userId || !finishTime) return res.sendStatus(400);
        
            try {
                await this._userController.userFinishToWork(userId, finishTime);
            } catch (error) {
                return res.status(500).json(error);
            }

            res.sendStatus(200);
        });

        return router;
    }
}
