import { LogLevel } from "./enums";
import tracer = require("tracer");

const logger = tracer.dailyfile({
    format: "{{timestamp}}|{{title}}|{{file}}:{{line}}:{{pos}}|{{method}}|{{message}}",
    root: "/var/log/app-logging",
    maxLogFiles: 5,
    allLogsFileName: "gold-price-tracking",
});

export function log(
    msg: string,
    logLevel: LogLevel = LogLevel.info,
    err: Error | null = null
): void {
    const execute = (log: any) => (err ? log(msg, err.message) : log(msg));

    switch (logLevel) {
        case LogLevel.trace:
            execute(logger.trace);
            break;
        case LogLevel.debug:
            execute(logger.debug);
            break;
        case LogLevel.warn:
            execute(logger.warn);
            break;
        case LogLevel.error:
            execute(logger.error);
            break;
        case LogLevel.fatal:
            execute(logger.fatal);
            break;
        case LogLevel.info:
        default:
            execute(logger.info);
    }
}
