import { BaseError } from './BaseError';

class ErrorHandler {
    public async handleError(error: Error): Promise<void> {
        console.error(error);
        this.handleNonOperationalError(error);
    }

    public isTrustedError(error: Error) {
        if (error instanceof BaseError) return error.isOperational;
        return false;
    }

    private handleNonOperationalError(error: Error) {
        if (!this.isTrustedError(error)) process.exit(1);
    }
}

export const errorHandler = new ErrorHandler();
