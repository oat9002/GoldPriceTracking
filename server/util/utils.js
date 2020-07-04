const enums = require("./enums");
const logger = require("tracer").dailyfile({
    format:
        "{{timestamp}}|{{title}}|{{file}}:{{line}}:{{pos}}|{{method}}|{{message}}",
    root: "/var/log/app-logging",
    maxLogFiles: 5,
    allLogsFileName: "gold-price-tracking",
});

function log(msg, logLevel, err = null) {
    const execute = (log) => (err ? log(msg, err) : log(msg));

    switch (logLevel) {
        case enums.LOG_LEVEL.TRACE:
            execute(logger.trace);
            break;
        case enums.LOG_LEVEL.DEBUG:
            execute(logger.debug);
            break;
        case enums.LOG_LEVEL.WARN:
            execute(logger.warn);
            break;
        case enums.LOG_LEVEL.ERROR:
            execute(logger.error);
            break;
        case enums.LOG_LEVEL.FATAL:
            execute(logger.fatal);
            break;
        case enums.LOG_LEVEL.INFO:
        default:
            execute(logger.info);
    }
}

module.exports = {
    log,
};
