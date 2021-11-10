import * as http from 'http';
import cors from 'cors';
import express, { Express } from 'express';
import { Api404Error } from './app/lib/ErrorHandler';
import { ErrorHandlerMiddleware } from './app/http/Middlewares/ErrorHandlerMiddleware';

export default class App {
    constructor(private readonly app: Express = express()) {
        //Simplistic health check
        this.app.get('/', (req, res) => res.send('ok'));

        // Enable Cross Origin Resource Sharing to all origins by default
        app.use(cors());

        //Only parse json requests
        this.app.use(express.json());

        // Catch 404 and forward to error handler
        app.use((req, res, next) => next(new Api404Error()));

        app.use(ErrorHandlerMiddleware);
    }

    public listen = (port: number, hostname: string): void => {
        const httpServer = http.createServer(this.app);
        httpServer.listen(port, hostname, () => console.log(`Server listening on http://${hostname}:${port}`));
    };

    public getInstance(): Express {
        return this.app;
    }
}
