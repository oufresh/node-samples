import { Request, Response, NextFunction } from "express";
import config from "config";
import { basePath } from "../../api";
/**
 * Filter request from browser or other incorrect requests without referer http header.
 * TODO
 * 1. filter different method
 * 2. configuration option to enable/disable
 * 3. can use referer
 * @param req Resuest
 * @param res Response
 * @param next NextFunction
 */
export const filter = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.method === "GET" &&
    (req.path.indexOf(config.get("authentication.server.base-path")) >= 0 ||
      req.path.indexOf(basePath) >= 0) &&
    (!req.headers.referer || req.header("Sec-Fetch-Mode") === "navigate")
  ) {
    console.info("--- Blocked request ---");
    console.log(req.url);
    console.log(req.headers);
    console.info("-----------------------");
    res.status(500).send("Can call internal api from browser... :D");
  } else next();
};
