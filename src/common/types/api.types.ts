/**
 * Corresponds to the ErrorObject schema.
 */
export interface ErrorObject {
  code: string;
  message: string;
  details?: Record<string, any>; // Represents a generic object
}

/**
 * A generic base Envelope type.
 * We use a generic <T> for the `data` property to make it flexible.
 */
interface Envelope<T> {
  success: boolean;
  data?: T;
  meta?: Record<string, any>;
  error?: ErrorObject;
}

/**
 * A specialized type for a successful response.
 * It enforces `success: true` and makes `data` required (usually).
 * It omits the `error` property, as it shouldn't exist on success.
 */
export type SuccessResponse<T> = Omit<Envelope<T>, 'error' | 'success'> & {
  success: true;
  data: T; // Make data non-optional for success responses
};


/**
 * A specialized type for an error response.
 * It enforces `success: false` and makes `error` required.
 * It omits `data` and `meta`, as they shouldn't exist on an error.
 */
export type ErrorResponse = Omit<Envelope<never>, 'data' | 'meta' | 'success'> & {
  success: false;
  error: ErrorObject;
};

// A union type that can represent any valid API response.
// This is useful for function return types that could be either success or error.
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;