import { Logger } from "./lb.js";

export function createLogger(name) {
    const logger = new Logger(name);
    return logger;

}