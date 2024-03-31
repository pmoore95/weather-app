import { NextApiRequest, NextApiResponse } from "next";
import { getHistoricWeatherData } from "../../../../src/backend/services/weather/weather.service";
import {
  handleInvalidRestMethod,
  sendInternalServerErrorResponse,
} from "@/backend/utils";
import { RestMethod } from "@/backend/types";
import { WEATHER_PARAMS_COMMON_SCHEMA } from "@/backend/services/weather/constants";
import { HttpStatusCode } from "axios";

const WeatherHistoryController = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  handleInvalidRestMethod(RestMethod.GET, req, res);

  const { query } = req;
  const { error, value } = WEATHER_PARAMS_COMMON_SCHEMA.validate(query);
  const { lat, lon, unit } = value;

  if (error)
    res.status(HttpStatusCode.BadRequest).json({ error: error.message });

  const weatherResponse = await getHistoricWeatherData(lat, lon, unit);
  if (!weatherResponse) sendInternalServerErrorResponse(res);
  else res.status(weatherResponse.status).json(weatherResponse.data);
};

export default WeatherHistoryController;
