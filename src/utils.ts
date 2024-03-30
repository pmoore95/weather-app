import Dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

export const dayjsUTC = Dayjs.extend(utc).utc;