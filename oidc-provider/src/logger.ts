import Logger from "./logger";

const log = require("simple-node-logger"); // eslint-disable-line @typescript-eslint/no-var-requires

export interface Logger {
    info(...objs: any[]): any;
    warn(...objs: any[]): any;
    error(...objs: any[]): any;
}

const logger: Logger = log.createSimpleLogger();

export default logger;
