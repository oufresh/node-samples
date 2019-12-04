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
function hello(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  res.status(200).json({ message: "Hello from basic auth server!" });
}

async function authenticate(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    const user = await userService.authenticate(req.body);
    if (user) res.json(user);
    else res.status(400).json({ message: "Username or password is incorrect" });
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function getAll(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const credentials = getCredentials(req);
  if (!credentials) {
    return res.status(401).json({ message: "Missing Authorization Header" });
  }

  const user = await userService.verify({
    username: credentials.username,
    password: credentials.password
  });
  if (!user) {
    return res
      .status(401)
      .json({ message: "Invalid Authentication Credentials" });
  }

  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

async function verify(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  try {
    const credentials = getCredentials(req);
    if (!credentials) {
      return res.status(401).json({ message: "Missing Authorization Header" });
    }
    const user = await userService.verify({
      username: credentials.username,
      password: credentials.password
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid Authentication Credentials" });
    }
    console.log("Verified user: ", user);
    res.status(200).json({ auth: true });
  } catch (err) {
    console.error(err);
    next(err);
  }
}
