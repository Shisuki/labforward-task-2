import { BaseError } from './BaseError';
import { HttpStatusCodes } from '..';

export class Api400Error extends BaseError {
    constructor(
        description = 'Bad Request',
        name = '400 Bad Request Error',
        statusCode = HttpStatusCodes.BAD_REQUEST,
        isOperational = true,
    ) {
        super(name, statusCode, description, isOperational);
    }
}
