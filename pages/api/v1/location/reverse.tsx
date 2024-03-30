import { DEFAULT_ERROR_MESSAGES, ERROR_MESSAGES } from "@/backend/constants/error-messages";
import { getLocationByLatLon } from "@/backend/services/location/location.service";
import { RestMethod } from "@/backend/types";
import { controllerDefaultErrorHandler, handleInvalidRestMethod, sendInternalServerErrorResponse } from "@/backend/utils";
import { AxiosError, HttpStatusCode } from "axios";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const schema = Joi.object({
    lat: Joi.number().required(),
    lon: Joi.number().required(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    handleInvalidRestMethod(RestMethod.GET, req, res);
    const { query } = req;
    const { error, value } = schema.validate(query);

    if(error) res.status(HttpStatusCode.BadRequest).json({ error: error.message });

    const { lat, lon } = value;

    
    const location = await getLocationByLatLon(lat, lon).catch((error: AxiosError)=>controllerDefaultErrorHandler(error, res));
    
    if(!location) sendInternalServerErrorResponse(res);
    else if('error' in location.data) res.status(HttpStatusCode.BadRequest).json({message: DEFAULT_ERROR_MESSAGES[HttpStatusCode.BadRequest]})
    else res.status(location.status).json(location.data)
}