import { Request, Response, NextFunction } from "express";
import config from "config";
import axios from "axios";

function getTokenFromHeaders(req: Request) {
  const {
    headers: { authorization }
  } = req;

  if (
    authorization &&
    authorization.split(" ")[0] === config.get("authentication.type")
  ) {
    return authorization.split(" ")[1];
  }
  return null;
}

function isVerified(authdata: string) {
  return axios.get(
    config.get("authentication.server.host") +
      ":" +
      config.get("authentication.server.port"),
    {
      headers: {
        Authorization: config.get("authentication.type") + " " + authdata
      }
    }
  );
}

export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const authdata = getTokenFromHeaders(req);
    if (authdata) {
      const verifiedResp = await isVerified(authdata);
      if (verifiedResp.status === 200) next();
      else {
        console.error("Authorization data: ", authdata);
        throw new Error("Authorization not valid");
      }
    } else {
      throw new Error("Missing Authorization Header");
    }
  } catch (e) {
    console.error(e);
    //next(next(new Error("Though lucky buddy!!"));
    res.status(401).json({ message: e.message });
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
