import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { EntityFactory } from './src/utils/EntityFactory.js';
import { IdGenerator } from './src/utils/IdGenerator.js';
import { EmailGenerator } from './src/utils/EmailGenerator.js';

import { SchoolController } from './src/school/SchoolController.js';
import { TeacherController } from './src/teacher/TeacherController.js';
import { UserController } from './src/user/UserController.js';

import { SchoolRouter } from './src/school/SchoolRouter.js';
import { TeacherRouter } from './src/teacher/TeacherRouter.js';
import { UserRouter } from './src/user/UserRouter.js';

import { SchoolGateway } from './src/utils/SchoolGateway.js';
import { TeacherGateway } from './src/utils/TeacherGateway.js';
import { UserGateway } from './src/utils/UserGateway.js';

import { Application } from './src/Application.js';

const app = express();
const __dirname = path.resolve();

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/css'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/modules/'));

const entityFactory = new EntityFactory();
const schoolGateway = new SchoolGateway();
const teacherGateway = new TeacherGateway();
const userGateway = new UserGateway();
const idGenerator = new IdGenerator();
const emailGenerator = new EmailGenerator();

const schoolController = new SchoolController({
    gateway: schoolGateway,
    shortId: idGenerator,
    entityFactory
});
const teacherController = new TeacherController({
    shortId: idGenerator,
    teacherGateway,
    schoolGateway,
    entityFactory,
    emailGenerator
});
const userController = new UserController({
    shortId: idGenerator,
    userGateway,
    entityFactory
});

const schoolRouter = new SchoolRouter({
    app,
    schoolController
}).init();
const teacherRouter = new TeacherRouter({
    app,
    teacherController
}).init();
const userRouter = new UserRouter({
    app,
    userController
}).init();

new Application({
    app,
    schoolRouter,
    teacherRouter,
    userRouter
}).init();
