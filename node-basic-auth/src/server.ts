import * as Express from 'express';
import * as Bp from 'body-parser';
import * as cors from 'cors';

import { basicAuth }from './helpers/basicAuth';
import { errorHandler } from './helpers/errorHandler';
import * as userController from './users/controller';

const app = Express();

app.use(Bp.urlencoded({ extended: false }));
app.use(Bp.json());
app.use(cors());

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use('/users', userController.router);

// global error handler
app.use(errorHandler);

// hello
function hello(req: Express.Request, res: Express.Response, next) {
    res.status(200).json({ message: 'Hello!' });
}
app.get('/hello', hello);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});