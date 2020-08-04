import express from 'express';
const router = express.Router();

export class TeacherRouter {
    constructor({ app, teacherController }) {
        this._app = app;
        this._teacherController = teacherController;
    }

    init() {
        router.get('/create', (req, res) => {
            res.render('./create-person/create-person-module');
        });

        router.post('/create', async (req, res) => {
            if (!req.body) return res.sendStatus(400);
        
            try {
                await this._teacherController.create(req.body);
            } catch (e) {
                return res.status(500).json('broken');
            }

            return res.sendStatus(200);
        });

        router.get('/:id', async (req, res) => {
            if (!req.params.id) return res.sendStatus(400);

            const data = await this._teacherController.get(req.params.id);

            return res.json(data);
        });

        router.get('/building/:school/:id', async (req, res) => {
            if (!req.params.id || !req.params.school) return res.sendStatus(400);

            const data = await this._teacherController.getByBuilding(req.params.school, req.params.id);
            return res.json(data);
        });

        router.get('/school/:id', async (req, res) => {
            if (!req.params.id) return res.sendStatus(400);

            const data = await this._teacherController.getBySchool(req.params.id);
            return res.json(data);
        });

        return router;
    }
}
