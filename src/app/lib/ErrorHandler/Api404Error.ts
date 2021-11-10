import { BaseError } from './BaseError';
import { HttpStatusCodes } from '..';

export class Api404Error extends BaseError {
    constructor(
        name = '404 Error',
        statusCode = HttpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true,
    ) {
        super(name, statusCode, description, isOperational);
    }
}
