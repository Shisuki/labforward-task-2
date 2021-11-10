import * as http from 'http';
import cors from 'cors';
import express, { Express } from 'express';

export default class App {
    constructor(private readonly app: Express = express()) {
        //Simplistic health check
        this.app.get('/', (req, res) => res.send('ok'));

        // Enable Cross Origin Resource Sharing to all origins by default
        app.use(cors());

        //Only parse json requests
        this.app.use(express.json());
    }

    public listen = (port: number, hostname: string): void => {
        const httpServer = http.createServer(this.app);
        httpServer.listen(port, hostname, () => console.log(`Server listening on http://${hostname}:${port}`));
    };

    public getInstance(): Express {
        return this.app;
    }
}
