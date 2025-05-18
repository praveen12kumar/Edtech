import { createLogger, format, transports } from "winston";
const {combine, timestamp} = format;

const customFormat = format.combine(
    format.colorize(),
    format.printf(({ level, message}) => {
        return `${level}: ${message}`
    })
)

// create a winston logger

const logger = createLogger({
    level:'info',
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        customFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'combined.log' })
    ]
});

export {logger}