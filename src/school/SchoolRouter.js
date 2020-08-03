import express from 'express';
const router = express.Router();

export class SchoolRouter {
    constructor({ app, schoolController }) {
        this._app = app;
        this._schoolController = schoolController;
    }

    init() {
        router.get('/:id', async (req, res) => {
            if (!req.params.id) {
                return res.sendStatus(400);
            }
        
            const school = await this._schoolController.get(req.params.id);
            res.json(school);
        });

        router.get('/create', (req, res) => {
            res.render('./create-school/create-school-module');
        });

        router.post('/create', (req, res) => {
            if (!req.body) return res.sendStatus(400);
        
            try {
                this._schoolController.create(req.body);
                res.sendStatus(200);
            } catch (e) {
                res.json(e).sendStatus(500);
            }

            return;
        });

        return router;
    }
}
