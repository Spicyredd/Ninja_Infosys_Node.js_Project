import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor(
        public readonly code: string,
        public readonly message: string,
        public readonly details?: Record<string, any>,
        status: HttpStatus = HttpStatus.BAD_REQUEST, // default 400
    ) {
        super({ code, message, details }, status);
    }
}
