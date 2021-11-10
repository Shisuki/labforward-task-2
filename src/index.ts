import { errorHandler } from './app/lib/ErrorHandler';
import dotenv from 'dotenv';
import { startServer } from './server';

dotenv.config();
startServer();

process.on('unhandledRejection', (reason: Error) => {
    throw reason;
});
process.on('uncaughtException', (error: Error) => errorHandler.handleError(error));
