import { HttpStatusCodes } from '..';

export class BaseError extends Error {
    constructor(
        public readonly name: string,
        public readonly statusCode: HttpStatusCodes,
        description: string,
        public readonly isOperational: boolean = false,
    ) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}
