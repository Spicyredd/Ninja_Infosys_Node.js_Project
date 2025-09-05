import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createErrorResponse } from '../utils/api.response';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let body;
        if (exception instanceof HttpException) {
            const res = exception.getResponse() as any;
            body = createErrorResponse(res.code || 'GEN-500', res.message || 'Internal server error', res.details);
        } else {
            body = createErrorResponse('GEN-500', 'Internal server error');
        }

        response.status(status).json(body);
    }
}
