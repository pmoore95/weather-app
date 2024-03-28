import { NextApiRequest, NextApiResponse } from 'next';
import { getWeatherForecast } from './weather.service';

const WeatherController = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
    const { lat, lon } = query;

    const location = await getWeatherForecast(+lat!, +lon!);
    res.status(200).json(location);
};

export default WeatherController;