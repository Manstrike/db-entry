import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

import { EntityFactory } from './src/utils/EntityFactory.js';
import { IdGenerator } from './src/utils/IdGenerator.js';
import { EmailGenerator } from './src/utils/EmailGenerator.js';

import { SchoolController } from './src/school/SchoolController.js';
import { TeacherController } from './src/teacher/TeacherController.js';
import { UserController } from './src/user/UserController.js';

import { SchoolRouter } from './src/school/SchoolRouter.js';
import { TeacherRouter } from './src/teacher/TeacherRouter.js';
import { UserRouter } from './src/user/UserRouter.js';

import { SchoolGateway } from './src/school/SchoolGateway.js';
import { TeacherGateway } from './src/teacher/TeacherGateway.js';
import { UserGateway } from './src/user/UserGateway.js';
import { UserSessionsGateway } from './src/user/UserSessionsGateway.js';

import { Application } from './src/Application.js';
import { DatabaseConnection } from './src/utils/DatabaseConnection.js';
import { SchoolBuildingsGateway } from './src/school/SchoolBuildingsGateway.js';

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/css'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/modules/'));

const dbConnection = new DatabaseConnection();

const entityFactory = new EntityFactory();

const schoolGateway = new SchoolGateway({dbConnection});
const schoolBuildingsGateway = new SchoolBuildingsGateway({dbConnection});
const teacherGateway = new TeacherGateway();
const userGateway = new UserGateway({dbConnection});
const userSessionsGateway = new UserSessionsGateway({dbConnection});
const idGenerator = new IdGenerator();
const emailGenerator = new EmailGenerator();

const schoolController = new SchoolController({
    gateway: schoolGateway,
    schoolBuildingsGateway,
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
    userSessionsGateway,
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
