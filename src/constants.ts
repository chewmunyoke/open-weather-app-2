// #region API endpoints

/**
 * API Reference: https://openweathermap.org/current
 *
 * `units` is `metric` by default
 */
export const apiURLCurrent = (query: string): string =>
  `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&units=metric&q=${query}`;

/**
 * API Reference: https://openweathermap.org/api/geocoding-api
 *
 * `limit` is `1` by default
 */
export const apiURLGeocoding = (query: string): string =>
  `https://api.openweathermap.org/geo/1.0/direct?appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY}&limit=1&q=${query}`;

// #endregion

export const LOCAL_STORAGE_KEY: string = 'OPEN_WEATHER_SEARCH_HISTORY';

export const DEFAULT_LOCATION: string = 'Singapore, SG';

export const CSS_VAR_IMG_SIZE = '--img-size';
