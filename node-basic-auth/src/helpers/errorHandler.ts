import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error | string, req: Request, res: Response, next: NextFunction) {
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    // default to 500 server error
    return res.status(500).json({ message: err.message });
}