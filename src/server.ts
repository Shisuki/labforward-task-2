import App from './App';

export const startServer = (): void => {
    const port = parseInt(process.env.APP_PORT || '3000');
    const hostname = process.env.APP_HOST || '127.0.0.1';

    const app = new App();
    app.listen(port, hostname);
};
