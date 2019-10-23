import { Request, Response, NextFunction } from "express";

function getTokenFromHeaders(req: Request) {
  const {
    headers: { authorization }
  } = req;

  if (authorization && authorization.split(" ")[0] === "Basic") {
    return authorization.split(" ")[1];
  }
  return null;
}

export function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authdata = getTokenFromHeaders(req);
    next();
  } catch (e) {
    //next(next(new Error("Though lucky buddy!!"));
    res.status(401).json({ message: "Missing Authorization Header" });
  }
}

/*
try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
  */
