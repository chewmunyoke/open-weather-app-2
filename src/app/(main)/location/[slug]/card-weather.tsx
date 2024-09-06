'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import Card from '@/components/card';
import Loading from '@/components/loading';
import Message from '@/components/message';
import { CSS_VAR_IMG_SIZE, apiURLCurrent } from '@/constants';
import type {
  CurrentWeatherResponse,
  ResponseError,
  WeatherData,
} from '@/types';
import { getFormattedDate, getLocationFromSlug } from '@/utils/helpers';

import HistoryCard from './card-history';

let intervalID: NodeJS.Timeout | undefined = undefined;

export default function WeatherCard({
  currentLocation,
}: Readonly<{ currentLocation: string }>) {
  const formattedLocation = getLocationFromSlug(currentLocation);

  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [dateTime, setDateTime] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchWeatherData = async () => {
    setWeatherData(undefined);
    setErrorMessage('');
    setIsLoading(true);
    const res = await fetch(apiURLCurrent(currentLocation));
    const data = await res.json();
    if (res.ok) {
      const successData = data as CurrentWeatherResponse;
      const weatherData: WeatherData = {
        timezone: successData.timezone * 1000,
        description: successData.weather[0].main,
        icon:
          successData.weather[0].main === 'Clear' ? '/sun.png' : '/cloud.png',
        temperature: {
          value: Math.round(successData.main.temp),
          max: Math.round(successData.main.temp_max),
          min: Math.round(successData.main.temp_min),
          unit: '°',
        },
        humidity: {
          value: successData.main.humidity,
          unit: '%',
        },
      };
      setWeatherData(weatherData);
      setDateTime(getFormattedDate(new Date(), weatherData.timezone));
    } else {
      const errorData = data as ResponseError;
      setErrorMessage(
        `Error ${errorData?.cod}: ${errorData?.message ?? 'An error occurred'}`
      );
    }
    setIsLoading(false);
  };

  useEffect(() => {
    clearInterval(intervalID);
    if (weatherData) {
      intervalID = setInterval(() => {
        setDateTime(getFormattedDate(new Date(), weatherData.timezone));
      }, 1000);
    }
  }, [weatherData]);

  useEffect(() => {
    fetchWeatherData();

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return isLoading ? (
    <div className='min-h-[50dvh]'>
      <Loading />
    </div>
  ) : (
    <Card
      className='animate-fade-slide-up-ease border border-translucent-white-50 bg-translucent-white-80 motion-reduce:animate-none dark:border-transparent dark:bg-translucent-black-70 md:p-8'
      style={{
        marginTop: weatherData
          ? `calc(var(${CSS_VAR_IMG_SIZE}) / 2 - 1rem)`
          : '1rem',
      }}
    >
      <div className='flex flex-col gap-y-4'>
        {errorMessage ? (
          <Message type='error' message={errorMessage} />
        ) : weatherData ? (
          <div className='relative flex flex-col'>
            <div
              className='absolute right-0 z-10 aspect-square transition-all motion-reduce:transition-none'
              style={{
                top: `calc(var(${CSS_VAR_IMG_SIZE}) / -2 - 1rem)`,
                width: `var(${CSS_VAR_IMG_SIZE})`,
              }}
            >
              <Image
                src={weatherData.icon}
                alt={`Weather icon for ${weatherData.description}`}
                fill
                priority
              />
            </div>
            <h2>Today&apos;s Weather</h2>
            <span className='text-7xl font-semibold text-primary dark:text-white sm:text-8xl'>
              {`${weatherData.temperature.value}${weatherData.temperature.unit}`}
            </span>
            <span>
              {`H: ${weatherData.temperature.max}${weatherData.temperature.unit} L: ${weatherData.temperature.min}${weatherData.temperature.unit}`}
            </span>
            <div className='relative flex text-zinc-500 dark:text-white sm:grid sm:grid-cols-[repeat(4,auto)]'>
              <span className='font-semibold'>{formattedLocation}</span>
              <div className='absolute right-0 flex grow flex-col-reverse justify-between gap-x-4 gap-y-1 self-end text-right sm:static sm:col-span-3 sm:grid sm:grid-cols-subgrid'>
                <span>{dateTime}</span>
                <span>{`Humidity: ${weatherData.humidity.value}${weatherData.humidity.unit}`}</span>
                <span>{weatherData.description}</span>
              </div>
            </div>
          </div>
        ) : null}

        <HistoryCard currentLocation={currentLocation} />
      </div>
    </Card>
  );
}
