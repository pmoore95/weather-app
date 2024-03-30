import { getLocationsBySearch } from '@/backend/services/location/location.service';
import { RestMethod } from '@/backend/types';
import { controllerDefaultErrorHandler, defaultErrorHandler, handleInvalidRestMethod } from '@/backend/utils';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { AxiosError, HttpStatusCode } from 'axios';
import { DEFAULT_ERROR_MESSAGES } from '@/backend/constants/error-messages';
import { rest } from 'lodash';

const schema = Joi.object({
    q: Joi.string().required(),
});

//TODO validation on BE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    handleInvalidRestMethod(RestMethod.GET, req, res);
    const { query } = req;
    const { error, value } = schema.validate(query);

    if(error) res.status(HttpStatusCode.BadRequest).json({ error: error.message });

    const locations = await getLocationsBySearch(value.q).catch((error: AxiosError)=>controllerDefaultErrorHandler(error, res))

    res.status(HttpStatusCode.Ok).json(locations);
}