import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { SchoolController } from './src/http/controllers/SchoolController.js';
import { PersonController } from './src/http/controllers/PersonController.js';


const app = express();
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/css'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/modules/'));

const schoolController = new SchoolController();
const personController = new PersonController();

app.get('/', (req, res) => {
    res.render('./main/main-module');
});

app.get('/school/:id', async (req, res) => {
    if (!req.params.id) {
        res.sendStatus(400);
        return;
    }

    const school = await schoolController.get(req.params.id);
    res.json(school);
});

app.get('/create/school', (req, res) => {
    res.render('./create-school/create-school-module');
});

app.get('/create/person', (req, res) => {
    res.render('./create-person/create-person-module');
});

app.post('/create/school', (req, res) => {
    if (!req.body) return res.sendStatus(400);

    try {
        schoolController.create(req.body);
        res.sendStatus(200);
        return;
    } catch (e) {
        res.json(e).sendStatus(500);
        return;
    }
});

app.post('/create/person', async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    try {
        await personController.create(req.body);
        return res.sendStatus(200);
    } catch (e) {
        return res.status(500).json('broken');
    }
});

app.listen(3000, () => console.log('running'));
