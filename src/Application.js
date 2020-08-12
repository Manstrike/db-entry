const PORT = process.env.PORT || 5000;

export class Application {
    constructor({ app, schoolRouter, teacherRouter, userRouter }) {
        this._app = app;
        this._schoolRouter = schoolRouter;
        this._teacherRouter = teacherRouter;
        this._userRouter = userRouter;
    }

    init() {
        this._app.get('/', (req, res) => res.send('Hello world'));
        this._app.use('/school', this._schoolRouter);
        this._app.use('/teacher', this._teacherRouter);
        this._app.use('/user', this._userRouter);
        
        this._app.listen(PORT, () => console.log('running on ', PORT));
    }
}
