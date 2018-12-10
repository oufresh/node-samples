import * as Express from 'express';
import * as userService from './userService';

export const router = Express.Router();

// routes
router.post('/authenticate', authenticate);
router.get('/', getAll);

function authenticate(req: Express.Request, res: any, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req: Express.Request, res: any, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}
