import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { SchoolController } from './src/http/controllers/SchoolController.js';

const app = express();
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/css'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/modules/'));

const schoolController = new SchoolController();

app.get('/', (req, res) => {
    res.render('./main/main-module');
});

app.get('/create/school', (req, res) => {
    res.render('./create-school/create-school-module');
});

app.get('/create/person', (req, res) => {
    res.render('./create-person/create-person-module');
});

app.post('/create/school', (req, res) => {
    if (!req.body) return res.status(400);

    schoolController.create(req.body);
    res.status(200);
});

app.get('/school/:id', (req, res) => {
    if (!req.param.id) return 400;

    const school = schoolController.get(req.param.id);
    res.status(200).json(school);
});

app.listen(3000, () => console.log('running'));
