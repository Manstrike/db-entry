import express from 'express';
const router = express.Router();

export class SchoolRouter {
    constructor({ app, schoolController }) {
        this._app = app;
        this._schoolController = schoolController;
    }

    init() {
        router.get('/all', async (req, res) => {
            const schools = await this._schoolController.getAll();  
            res.json(schools);
        });

        router.get('/communities', async (req, res) => {
            const communities = await this._schoolController.getCommunities();
            res.json(communities);
        });

        router.get('/:id', async (req, res) => {
            if (!req.params.id) {
                return res.sendStatus(400);
            }
        
            const school = await this._schoolController.get(req.params.id);
            return res.json(school);
        });

        router.get('/kanton/:id', async (req, res) => {
            if (!req.params.id) {
                return res.sendStatus(400);
            }
            //TODO add special method getByKanton(kantonId)
            //const school = await this._schoolController.get(req.params.id);
            return res.json(school);
        });

        router.post('/create', async (req, res) => {
            if (!req.body) return res.sendStatus(400);

            try {
                await this._schoolController.create(req.body);
                res.sendStatus(200);
            } catch (e) {
                res.status(500).json(e);
            }

            return;
        });

        return router;
    }
}
