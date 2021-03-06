import { BaseError } from './BaseError';
import { HttpStatusCodes } from '..';

export class Api404Error extends BaseError {
    constructor(
        description = 'Not found.',
        name = '404 Error',
        statusCode = HttpStatusCodes.NOT_FOUND,
        isOperational = true,
    ) {
        super(name, statusCode, description, isOperational);
    }
}
