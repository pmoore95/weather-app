import { TemperatureUnit } from "@/types";
import Joi from "joi";

export const WEATHER_PARAMS_COMMON_SCHEMA = Joi.object({
  lat: Joi.number().required(),
  lon: Joi.number().required(),
  unit: Joi.string()
    .valid(...Object.values(TemperatureUnit))
    .required(),
});
