import { History, LocationState } from 'history';

export interface Props {
	background?: string;
	focus?: string;
	searchValue?: {};
	user?: UserInterface | null;
	history?: History<LocationState>;
	weather?: WeatherInterface | null;
	forecast?: Forecast | null;
	photos?: any;
	favourites?: any;
	setDay?: (e: number) => void;
	tide?: Tide;
}

export interface Tide {
	disclaimer?: string;
	status?: number;
	latitude?: number;
	longitude?: number;
	origin?: Origin;
	datums?: Datums;
	timestamp?: number;
	datetime?: Date | null;
	unit?: string;
	timezone?: string;
	datum?: string;
	extremes?: Extreme[];
	heights?: Extreme[];
	copyright?: string;
}

interface Datums {
	LAT?: number;
	HAT?: number;
}

interface Extreme {
	timestamp?: number;
	datetime?: Date | null;
	height?: number;
	state?: string;
}

export interface Origin {
	latitude?: number;
	longitude?: number;
	distance?: number;
	unit?: string;
}

export interface UserInterface {
	_id?: string;
	username?: string;
	email?: string;
	password?: string;
	avatar?: string;
	favourites?: [];
	photos?: [];
}
export interface Forecast {
	cod: string;
	message: number;
	cnt: number;
	list: List[];
	city: City;
}

export interface WeatherInterface {
	lat?: number;
	lon?: number;
	timezone?: string;
	timezone_offset?: number;
	current: Current;
	minutely?: Minutely[];
	hourly?: Current[];
	daily: Daily[];
}

interface City {
	id: number;
	name: string;
	coord: Coord;
	country: string;
	population: number;
	timezone: number;
	sunrise: number;
	sunset: number;
}

interface Coord {
	lat: number;
	lon: number;
}

interface List {
	dt: number;
	main: Main;
	weather: Weather[];
	clouds: Clouds;
	wind: Wind;
	visibility: number;
	pop: number;
	sys: Sys;
	dtTxt: Date;
}

interface Clouds {
	all: number;
}

interface Main {
	temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	seaLevel: number;
	grndLevel: number;
	humidity: number;
	tempKf: number;
}

interface Sys {
	pod: string;
}

interface Wind {
	speed: number;
	deg: number;
	gust: number;
}

interface Current {
	dt?: number;
	sunrise?: number;
	sunset?: number;
	temp?: number;
	feels_like?: number;
	pressure?: number;
	humidity?: number;
	dew_point?: number;
	uvi?: number;
	clouds?: number;
	visibility?: number;
	wind_speed?: number;
	wind_deg?: number;
	wind_gust?: number;
	weather?: Weather[];
	pop?: number;
	rain?: Rain;
}

interface Rain {
	'1h'?: number;
}

interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface Daily {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: Temp;
	feels_like: FeelsLike;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: Weather[];
	clouds: number;
	pop: number;
	rain: number;
	uvi: number;
}

interface FeelsLike {
	day: number;
	night: number;
	eve: number;
	morn: number;
}

interface Temp {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
}

interface Minutely {
	dt?: number;
	precipitation?: number;
}

    interface Coord {
			lon: number;
			lat: number;
		}

		interface Weather {
			id: number;
			main: string;
			description: string;
			icon: string;
		}

		interface Main {
			temp: number;
			feels_like: number;
			temp_min: number;
			temp_max: number;
			pressure: number;
			humidity: number;
		}

		interface Wind {
			speed: number;
			deg: number;
			gust: number;
		}
		interface Rain {
			'1h'?: number;
		}

		interface Clouds {
			all: number;
		}

		interface Sys {
			type: number;
			id: number;
			country: string;
			sunrise: number;
			sunset: number;
		}

		export interface WeatherData {
			coord: Coord;
			weather: Weather[];
			base: string;
			main: Main;
			visibility: number;
			wind: Wind;
			rain?: Rain;
			clouds: Clouds;
			dt: number;
			sys: Sys;
			timezone: number;
			id: number;
			name: string;
			cod: number;
		}
		interface CityCoord {
			lat: number;
			lon: number;
		}
		interface City {
			id: number;
			name: string;
			coord: CityCoord;
			country: string;
			population: number;
			timezone: number;
			sunrise: number;
			sunset: number;
		}

		interface ListItemWeather {
			id: number;
			main: string;
			description: string;
			icon: string;
		}
		interface ListItemMain {
			temp: number;
			feels_like: number;
			temp_min: number;
			temp_max: number;
			pressure: number;
			sea_level: number;
			grnd_level: number;
			humidity: number;
			temp_kf: number;
		}

		interface ListItemWind {
			speed: number;
			deg: number;
			gust: number;
		}
		interface ListItemRain {
			'3h'?: number;
		}

		interface ListItemClouds {
			all: number;
		}
		interface ListItemSys {
			pod: string;
		}
		interface ListItem {
			dt: number;
			main: ListItemMain;
			weather: ListItemWeather[];
			clouds: ListItemClouds;
			wind: ListItemWind;
			visibility: number;
			pop: number;
			rain?: ListItemRain;
			sys: ListItemSys;
			dt_txt: string;
		}

		export interface Forecast {
			cod: string;
			message: number;
			cnt: number;
			listitem: ListItem[];
			city: City;
		}

		export interface Props {
			background?: string;
			forecast?: Forecast | null | undefined;
			weather?: WeatherInterface | null | undefined;
			tidal?: any;
			user?: UserInterface | null | undefined;
		}