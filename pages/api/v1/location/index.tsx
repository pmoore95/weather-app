import { getLocationsBySearch } from "@/backend/services/location/location.service";
import { RestMethod } from "@/backend/types";
import {
  controllerDefaultErrorHandler,
  handleInvalidRestMethod,
  sendInternalServerErrorResponse,
} from "@/backend/utils";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { AxiosError, HttpStatusCode } from "axios";

const schema = Joi.object({
  q: Joi.string().required(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  handleInvalidRestMethod(RestMethod.GET, req, res);
  const { query } = req;
  const { error, value } = schema.validate(query);

  if (error)
    res.status(HttpStatusCode.BadRequest).json({ error: error.message });

  const locations = await getLocationsBySearch(value.q).catch(
    (error: AxiosError) => controllerDefaultErrorHandler(error, res),
  );

  if (!locations) sendInternalServerErrorResponse(res);
  else res.status(locations.status).json(locations.data);
}
