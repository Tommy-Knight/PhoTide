import { UserInterface, WeatherInterface, Tide } from '../../types';

export const backgroundAction = (payload: string) => {
	return {
		type: 'BG_COLOR',
		payload,
	};
};

export const focusAction = (payload: string) => {
	return {
		type: 'SWITCH_FOCUS',
		payload,
	};
};

export const searchAction = (payload: any | null) => {
	return {
		type: 'SEARCH_VALUE',
		payload,
	};
};

export const userAction = (payload: UserInterface | null) => {
	return {
		type: 'USER',
		payload,
	};
};
export const weatherAction = (payload: WeatherInterface | null) => {
	return {
		type: 'WEATHER',
		payload,
	};
};
export const forecastAction = (payload: WeatherInterface | null) => {
	return {
		type: 'FORECAST',
		payload,
	};
};
export const tidalAction = (payload: Tide | null) => {
	return {
		type: 'TIDES',
		payload,
	};
};
export const addFavAction = (payload: any | null) => {
	return {
		type: 'ADD_FAV',
		payload,
	};
};
export const photoAction = (payload: any | null) => {
	return {
		type: 'PHOTO',
		payload,
	};
};
export const removePhotoAction = (payload: number) => {
	return {
		type: 'INDEX',
		payload,
	};
};
export const fetchForecastAction = (payload: any | null) => {
	return async (dispatch: any) => {
		const resp = await fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${payload.lat}&lon=${payload.lon}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
		);
		const data = await resp.json();
		dispatch({
			type: 'FORECAST',
			payload: data,
		});
	};
};
export const fetchWeatherAction = (payload: any | null) => {
	return async (dispatch: any) => {
		const resp = await fetch(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${payload.lat}&lon=${payload.lon}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
		);
		const data = await resp.json();
		dispatch({
			type: 'WEATHER',
			payload: data,
		});
	};
};
