import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import csurf from 'csurf';
import xss from 'xss-clean';

import { PORT } from './config/config.js';
import connectDB from './config/dbConnect.js';
import apiRoutes from './routes/index.js';
import { errorMiddleware } from './middlewares/error-middleware.js';
import { logger } from './utils/logger.js';

config({ path: './.env' });

const app = express();

// Custom morgan logger setup
const morganFormat = ':method :url :status :response-time ms';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const [method, url, status, responseTime] = message.trim().split(' ');
            const logObject = { method, url, status, responseTime };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

// Rate limiter (apply early to all requests)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP
    standardHeaders: true,
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(limiter);

// Essential middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());
app.use(helmet());

// CSRF protection
//app.use(csurf({ cookie: true }));

// CORS configuration
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Routes
app.use('/api', apiRoutes);

// CSRF Token endpoint for frontend access
// app.get('/api/csrf-token', (req, res) => {
//     res.json({ csrfToken: req.csrfToken() });
// });

// 404 handler for unknown routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Centralized error middleware
app.use(errorMiddleware);

// Server setup and DB connection
const setupAndStartServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server started on port: ${PORT}`);
        await connectDB();
        console.log('Database connected');
    });
};

setupAndStartServer();
