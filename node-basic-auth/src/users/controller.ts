import * as Express from "express";
import * as userService from "./userService";
import { getCredentials } from "../helpers/basicAuth";

export const router = Express.Router();

// routes
router.post("/authenticate", authenticate);
router.get("/verify", verify);
router.get("/", getAll);
router.get("/hello", hello);

// hello
function hello(req: Express.Request, res: Express.Response, next) {
  res.status(200).json({ message: "Hello!" });
}

async function authenticate(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  userService
    .authenticate(req.body)
    .then(user => {
      user
        ? res.json(user)
        : res
            .status(400)
            .json({ message: "Username or password is incorrect" });
    })
    .catch(err => next(err));
}

function getAll(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function verify(req: Express.Request, res: Express.Response) {
  const credentials = getCredentials(req);
  if (!credentials) {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }
  const user = userService.verify({
    username: credentials.username,
    password: credentials.password
  });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid Authentication Credentials" });
  }

  res.status(200).send();
}
