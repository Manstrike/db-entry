import express from 'express';
const router = express.Router();

export class TeacherRouter {
    constructor({ app, teacherController }) {
        this._app = app;
        this._teacherController = teacherController;
    }

    init() {
        router.post('/create', async (req, res) => {
            if (!req.body) return res.sendStatus(400);
        
            try {
                await this._teacherController.create(req.body);
            } catch (e) {
                return res.status(500).json(e);
            }

            return res.sendStatus(200);
        });

        router.get('/:id', async (req, res) => {
            if (!req.params.id) return res.sendStatus(400);

            const data = await this._teacherController.get(req.params.id);

            return res.json(data);
        });

        router.get('/building/:school/:id/:userId', async (req, res) => {
            if (!req.params.id || !req.params.school || !req.params.userId) return res.sendStatus(400);

            const data = await this._teacherController.getByBuilding(req.params.school, req.params.id, req.params.userId);
            return res.json(data);
        });

        router.get('/school/:id/:userId', async (req, res) => {
            if (!req.params.id || !req.params.userId) return res.sendStatus(400);

            const data = await this._teacherController.getBySchool(req.params.id, req.params.userId);
            return res.json(data);
        });

        return router;
    }
}
