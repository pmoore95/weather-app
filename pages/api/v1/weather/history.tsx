import { NextApiRequest, NextApiResponse } from "next";
import { getHistoricWeatherData } from "../../../../src/backend/services/weather/weather.service";
import { TemperatureUnit } from "@/types";
import { handleInvalidRestMethod } from "@/backend/utils";
import { RestMethod } from "@/backend/types";

const WeatherHistoryController = async (req: NextApiRequest, res: NextApiResponse) => {
    handleInvalidRestMethod(RestMethod.POST, req, res);

    const { query } = req;
    const { lat, lon, unit } = query;

    const location = await getHistoricWeatherData(+lat!, +lon!, unit as TemperatureUnit);
    res.status(200).json(location);
};

export default WeatherHistoryController;