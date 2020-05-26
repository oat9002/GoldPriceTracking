const bunyan = require("bunyan");
const enums = require("./enums");
const logger = bunyan.createLogger({
    name: "GoldPriceTracking",
    serializers: {
        err: bunyan.stdSerializers.err,
    },
    streams: [
        {
            type: "rotating-file",
            path: "logs/gold-price-tracking.log",
            period: "1d", // daily rotation
            count: 3, // keep 3 back copies
        },
    ],
});

function log(msg, logLevel, err = null) {
    const errObj = {
        err,
    };

    switch (logLevel) {
        case enums.LOG_LEVEL.TRACE:
            logger.trace(errObj, msg);
            break;
        case enums.LOG_LEVEL.DEBUG:
            logger.debug(errObj, msg);
            break;
        case enums.LOG_LEVEL.WARN:
            logger.warn(errObj, msg);
            break;
        case enums.LOG_LEVEL.ERROR:
            logger.error(errObj, msg);
            break;
        case enums.LOG_LEVEL.FATAL:
            logger.error(errObj, msg);
            break;
        case enums.LOG_LEVEL.INFO:
        default:
            logger.info(errObj, msg);
    }
}

module.exports = {
    log,
};
