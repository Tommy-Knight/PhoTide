export interface Forecast {
	cod: string;
	message: number;
	cnt: number;
	list: List[];
	city: City;
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
	feelsLike: number;
	tempMin: number;
	tempMax: number;
	pressure: number;
	seaLevel: number;
	grndLevel: number;
	humidity: number;
	tempKf: number;
}

interface Sys {
	pod: string;
}

interface Weather {
	id: number;
	main: string;
	description: string;
	icon: string;
}

interface Wind {
	speed: number;
	deg: number;
	gust: number;
}

export interface Props {
	background?: string;
	focus?: string;
	searchValue?: {};
}