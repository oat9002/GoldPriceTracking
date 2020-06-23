const enums = require("./enums");
const logger = require("tracer").dailyfile({
    format:
        "{{timestamp}}|{{title}}|{{file}}:{{line}}:{{pos}}|{{method}}|{{message}}",
    root: "/var/log/app-logging",
    maxLogFiles: 5,
    allLogsFileName: "gold-price-tracking",
});

function log(msg, logLevel, err = null) {
    switch (logLevel) {
        case enums.LOG_LEVEL.TRACE:
            logger.trace(msg, err);
            break;
        case enums.LOG_LEVEL.DEBUG:
            logger.debug(msg, err);
            break;
        case enums.LOG_LEVEL.WARN:
            logger.warn(msg, err);
            break;
        case enums.LOG_LEVEL.ERROR:
            logger.error(msg, err);
            break;
        case enums.LOG_LEVEL.FATAL:
            logger.fatal(msg, err);
            break;
        case enums.LOG_LEVEL.INFO:
        default:
            logger.info(msg, err);
    }
}

module.exports = {
    log,
};
