import React from 'react';
import { DailyMeasurement } from '../../../../../pages/api/v1/weather/models';
import { Card } from 'antd';
import { LoadingCardPlaceholder } from './LoadingCardPlaceholder';
import { TEMPERATURE_SYMBOLS } from '@/constants';
import { TemperatureUnit } from '@/types';
import dayjs from 'dayjs';
import { DataUnavailableCard } from './DataUnavailableCard';

interface WeatherCardsProps {
    measurements: DailyMeasurement[];
    unit: TemperatureUnit;
    isLoading?: boolean
    className?: string
}

const WeatherCards: React.FC<WeatherCardsProps> = ({measurements, isLoading, className, unit = TemperatureUnit.Celsius}: WeatherCardsProps) => {
    return (
        <div className={`flex gap-2 ${className}`}>
            {isLoading && (<>
                <LoadingCardPlaceholder/>
                <LoadingCardPlaceholder/>
                <LoadingCardPlaceholder/>
                <LoadingCardPlaceholder/>
                <LoadingCardPlaceholder/>
            </>)}
            {measurements.map(measurement => {
                const cardTitle = dayjs(measurement.date).format('D MMMM, YYYY');

                if(measurement.max === null || measurement.min === null) return <DataUnavailableCard key={measurement.date} title={cardTitle}/>

                return (
                    <Card key={measurement.date} title={cardTitle}>
                        <div><span className='font-semibold'>Max:</span> {measurement.max} {TEMPERATURE_SYMBOLS[unit]}</div>
                        <div><span className='font-semibold'>Min:</span> {measurement.min} {TEMPERATURE_SYMBOLS[unit]}</div>
                    </Card>
                )
            })}
        </div>
    );
};

export default WeatherCards;