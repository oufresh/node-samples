import * as Express from 'express';
import * as Bp from 'body-parser';
import { basicAuth }from './helpers/basicAuth';
import { errorHandler } from './helpers/errorHandler';
import { cors } from 'cors';
const app = Express();

app.use(Bp.urlencoded({ extended: false }));
app.use(Bp.json());
app.use(cors());

// use basic HTTP auth to secure the api
app.use(basicAuth);

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});