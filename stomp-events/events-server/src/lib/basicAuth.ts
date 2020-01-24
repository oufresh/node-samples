import { Request } from "express";

export function getCredentials(req: Request): { username: string, password: string } | null {
    // make authenticate path public
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return null;
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    return { username, password};
}