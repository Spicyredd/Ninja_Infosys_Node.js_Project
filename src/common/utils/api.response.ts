// file: src/utils/api-response.ts

import { SuccessResponse, ErrorResponse, ErrorObject } from '../types/api.types';

/**
 * Creates a standardized success response object.
 * @param data The data payload to be sent.
 * @param meta Optional metadata.
 * @returns A SuccessResponse object.
 */
export function createSuccessResponse<T>(data: T, meta?: Record<string, any>): SuccessResponse<T> {
    const response: SuccessResponse<T> = {
        success: true,
        data,
    };

    if (meta) {
        response.meta = meta;
    }

    return response;
}

/**
 * Creates a standardized error response object.
 * @param code A unique error code (e.g., 'GNS-404-NOT-FOUND').
 * @param message A user-friendly error message.
 * @param details Optional structured details about the error.
 * @returns An ErrorResponse object.
 */
export function createErrorResponse(code: string, message: string, details?: Record<string, any>): ErrorResponse {
    const error: ErrorObject = { code, message };

    if (details) {
        error.details = details;
    }

    return {
        success: false,
        error,
    };
}