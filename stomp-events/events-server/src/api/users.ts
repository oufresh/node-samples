import Express, { Request, Response, NextFunction } from "express";
import logger from "../lib/logger";

const router = Express.Router();

export class User {
  name: string;
  surname: string;
  id: number;

  public constructor(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
  }
}

class UserFactory {
  public static build(body: any): User | undefined {
    if (body.name && body.name !== "" && body.surname && body.surname !== "") {
      return new User(body.name, body.surname);
    } else {
      logger.error("Missing fields in body", body);
      return undefined;
    }
  }
}

class Users {
  private static _users: Map<number, User> = new Map();
  private static _progressiveId: number = 1;

  private static getNextId() {
    Users._progressiveId++;
    return Users._progressiveId;
  }

  public static create(user: User): User {
    user.id = Users.getNextId();
    Users._users.set(user.id, user);
    return user;
  }

  public static update(user: User): User | typeof undefined {
    const found = Users._users.get(user.id);
    if (found) {
      Users._users.set(user.id, user);
    } else {
      return undefined;
    }
  }

  public static delete(id: number): boolean {
    return Users._users.delete(id);
  }

  public static get(id: number): User {
    return Users._users.get(id);
  }

  public static getAll(): Array<User> {
      const r: Array<User> = [];
      Users._users.forEach((v, k) => r.push(v));
      return r;
  }
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const user = UserFactory.build(req.body);
  if (user) {
    const created = Users.create(user);
    res.send(created);
  } else {
    logger.error("User creation failed");
    res.status(500).send();
  }
};

const updateUser = function(req: Request, res: Response, next: NextFunction) {
  const user = UserFactory.build(req.body);
  const updated = Users.update(user);
  if (updated) res.send(updated);
  else {
    logger.error("Cannot update user", user);
    res.status(500).send();
  }
};

const deleteUser = function(req: Request, res: Response, next: NextFunction) {
  if (req.body.id) {
    const deleted = Users.delete(req.body.id);
    if (!deleted) logger.error("Cannor delete user with id", req.body.id);
    res.status(deleted === true ? 200 : 500).send();
  } else {
    logger.error("Request malformed", req.body);
    res.status(400).send();
  }
};

const getAllUsers = function(req: Request, res: Response, next: NextFunction) {
  res.send(Users.getAll());
};

const getOneUser = function(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number.parseInt(req.params.userId);
    const found = Users.get(id);
    if (found) res.send(found);
    else {
      logger.error("Cannot find user id ", id);
      res.status(404).send();
    }
  } catch (e) {
    logger.error(e);
    res.status(400).send();
  }
};

router
  .route("/users")
  .post(createUser)
  .get(getAllUsers);

router
  .route("/users/:userId")
  .get(getOneUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;
