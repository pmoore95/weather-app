import { NextApiRequest, NextApiResponse } from 'next';
import { getWeatherForecast } from '../../../../src/backend/services/weather/weather.service';
import { TemperatureUnit } from '@/types';
import { RestMethod } from '@/backend/types';
import { handleInvalidRestMethod } from '@/backend/utils';

const WeatherController = async (req: NextApiRequest, res: NextApiResponse) => {
    handleInvalidRestMethod(RestMethod.POST, req, res);

    const { query } = req;
    const { lat, lon, unit } = query;

    const location = await getWeatherForecast(+lat!, +lon!, unit as TemperatureUnit);
    res.status(200).json(location);
};

export default WeatherController;