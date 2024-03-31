import { RestMethod } from "./types";
import { NextApiRequest, NextApiResponse } from "next";
import {
  DEFAULT_ERROR_MESSAGES,
  ERROR_MESSAGES,
} from "./constants/error-messages";
import { AxiosError, HttpStatusCode } from "axios";

export const handleInvalidRestMethod = (
  allowedMethod: RestMethod,
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  if (req.method !== allowedMethod)
    res
      .status(HttpStatusCode.MethodNotAllowed)
      .json({ message: ERROR_MESSAGES.INVALID_REST_METHOD });
};

export const defaultErrorHandler = (error: AxiosError) => {
  const statusCode: HttpStatusCode =
    (error.status as HttpStatusCode | undefined) ||
    HttpStatusCode.InternalServerError;
  const message = DEFAULT_ERROR_MESSAGES[statusCode] || error.message;
  throw new AxiosError(message, statusCode.toString());
};

export const controllerDefaultErrorHandler = (
  error: AxiosError,
  res: NextApiResponse,
) => {
  if (error.status === undefined) {
    sendInternalServerErrorResponse(res);
  } else {
    res.status(error.status).json({ error: error.message });
  }
};

export const sendInternalServerErrorResponse = (res: NextApiResponse) =>
  res.status(HttpStatusCode.InternalServerError).json({
    error: DEFAULT_ERROR_MESSAGES[HttpStatusCode.InternalServerError],
  });
