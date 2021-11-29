export enum StatusCode {
    badRequest = 400,
    okay = 200,
    InternalServerError = 500,
    NotSupport = 501,
}

export enum LogLevel {
    trace = "trace",
    debug = "debug",
    info = "info",
    warn = "warn",
    error = "error",
    fatal = "fatal",
}

export enum Mode {
    development = "development",
    production = "production",
}
