import { NextApiRequest, NextApiResponse } from "next";
import { getWeatherForecast } from "../../../../src/backend/services/weather/weather.service";
import { RestMethod } from "@/backend/types";
import {
  controllerDefaultErrorHandler,
  handleInvalidRestMethod,
  sendInternalServerErrorResponse,
} from "@/backend/utils";
import { AxiosError, HttpStatusCode } from "axios";
import { WEATHER_PARAMS_COMMON_SCHEMA } from "@/backend/services/weather/constants";

const WeatherController = async (req: NextApiRequest, res: NextApiResponse) => {
  handleInvalidRestMethod(RestMethod.GET, req, res);

  const { query } = req;
  const { error, value } = WEATHER_PARAMS_COMMON_SCHEMA.validate(query);

  if (error)
    res.status(HttpStatusCode.BadRequest).json({ error: error.message });

  const { lat, lon, unit } = value;

  const weatherResponse = await getWeatherForecast(lat, lon, unit).catch(
    (error: AxiosError) => controllerDefaultErrorHandler(error, res),
  );
  if (!weatherResponse) sendInternalServerErrorResponse(res);
  else res.status(weatherResponse.status).json(weatherResponse.data);
};

export default WeatherController;
