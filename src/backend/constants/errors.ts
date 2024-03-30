import { AxiosError, HttpStatusCode } from "axios";
import { DEFAULT_ERROR_MESSAGES } from "./error-messages";

export class InternalServerError extends AxiosError {
    public constructor(){
        super(DEFAULT_ERROR_MESSAGES[HttpStatusCode.InternalServerError], HttpStatusCode.InternalServerError.toString())
    }
}