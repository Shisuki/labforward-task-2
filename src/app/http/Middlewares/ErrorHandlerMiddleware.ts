import { NextFunction, Request, Response } from 'express';
import { BaseError, errorHandler } from '../../lib/ErrorHandler';

export const ErrorHandlerMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    errorHandler.handleError(error);

    const errorMessage = error.message || 'Internal Server Error';

    if (error instanceof BaseError) {
        res.status(error.statusCode || 500).send({ status: error.statusCode || 500, errors: [{ msg: errorMessage }] });
    } else {
        res.status(500).send({ status: 500, errors: [{ msg: errorMessage }] });
    }

    next();
};
