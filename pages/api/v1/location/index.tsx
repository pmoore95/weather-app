import { NextApiRequest, NextApiResponse } from 'next';
import { getLocation } from './location.service';
import { LocationRequestPayload } from './models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req;
    const { q, lat, lon } = query;

    const location = await getLocation((q || { lat, lon }) as LocationRequestPayload);
    res.status(200).json(location);
}