import { HttpStatusCode } from "axios";

export const INVALID_REST_METHOD = 'Invalid REST method';
export const INTERNAL_SERVER_ERROR = 'An internal server error occurred. Please try again.';
export const BAD_REQUEST = 'Invalid request'


export const ERROR_MESSAGES =
{
    INVALID_REST_METHOD
}

export const DEFAULT_ERROR_MESSAGES: Partial<Record<HttpStatusCode, string>> = {
    [HttpStatusCode.InternalServerError]: INTERNAL_SERVER_ERROR,
    [HttpStatusCode.BadRequest]: BAD_REQUEST
}