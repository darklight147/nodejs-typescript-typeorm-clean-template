import cookieSession from 'cookie-session';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import { config } from './config/env.config';
import { securityMiddleware } from './config/security.config';
import { errorHandler } from './error/errorhandler.handler';
import { NotFoundException } from './error/NotFoundException.error';
import { decodeUser } from './middleware/decodeuser.middleware';
import healthRouter from './routes/health.router';

export class App {
    private _app: Application;

    constructor() {
        this._app = express();

        this._app.enable('trust proxy');

        /**
         * Map Middleware
         */

        this.mapMiddleware();

        /**
         * Map Routes
         */

        this.mapRoutes();

        /**
         * Not Found Handler
         */

        this._app.use(this.notFound);

        /**
         * Error Handler
         */

        this._app.use(errorHandler);
    }

    private mapMiddleware() {
        this._app.use(config.NODE_ENV !== "production" ? morgan('dev') : morgan('combined'));
        this._app.use(securityMiddleware);
        this._app.use(
            cors({
                origin: ["http://localhost:3000", "YOUR_DOMAINS_HERE"],
                credentials: true,
            })
        );
        this._app.use(
            cookieSession({
                name: 'access_token',
                domain: config.COOKIE_DOMAIN,
                signed: false,
                httpOnly: true,
                secure: config.NODE_ENV === 'production',
                sameSite: "none"
            })
        );
        this._app.use(
            decodeUser
        );
        this._app.use(
            express.json({
                limit: '10mb',
            })
        );

        /**
         * Add your middlewares here
         */
    }

    private mapRoutes() {
        this._app.use('/api/healthz', healthRouter.router);

        /**
         * Add your routes here
         */
    }

    private notFound(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        next(new NotFoundException());
    }

    public listen(callback: () => void) {
        return this._app.listen(config.port, callback);
    }
}
