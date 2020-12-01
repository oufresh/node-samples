import { Logger } from "./lb.mjs";

export function createLogger(name) {
    const logger = new Logger(name);
    return logger;

}