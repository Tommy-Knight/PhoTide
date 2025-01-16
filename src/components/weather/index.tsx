import './style.scss';

import { Forecast, Props, WeatherData } from '../../types';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { add, format, fromUnixTime, isWithinInterval } from 'date-fns';
import {
	addFavAction,
	backgroundAction,
	forecastAction,
	searchAction,
	tidalAction,
	weatherAction,
} from '../../redux/actions';
import { connect, useDispatch } from 'react-redux';

import WeatherForecast from '../forecast/index';
import { useHistory } from 'react-router-dom';

const Weather = (props: Props) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [forecast, setForecast] = useState<Forecast | null>(null);
	const [weather, setWeather] = useState<WeatherData | null>(null);
	const [utcOffset, setUtcOffset] = useState<number>(0);
	const [localTime, setLocalTime] = useState<string>();
	const [geolocated, setGeolocated] = useState<any | null>(null);
	const [hoverUpload, setHoverUpload] = useState<boolean>(false);
	const [hoverHeart, setHoverHeart] = useState<boolean>(false);
	const [fav, setFav] = useState<boolean>(false);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		fetchGeolocated();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocated]);

	useEffect(() => {
		googleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.forecast, utcOffset]);

	const goToPhotos = () => {
		if (props.user) {
			history.push('/photos');
		} else {
			history.push('/register');
		}
	};

	const googleFetch = async () => {
		if (props.forecast) {
			const resp = await fetch(
				`https://maps.googleapis.com/maps/api/timezone/json?location=${props.forecast.city.coord.lat}%2C${props.forecast.city.coord.lon}×tamp=0&key=${process.env.REACT_APP_GOOGLE_API}`
			);
			const googleData = await resp.json();
			setUtcOffset(googleData.rawOffset);
			getLocalTime();
		}
	};

	const getLocalTime = () => {
		const UTC = new Date(new Date().toUTCString().substr(0, 25));
		const seconds = utcOffset;
		const newTime = add(UTC, { seconds });
		setLocalTime(format(newTime, `p`));
		if (forecast && weather) {
			isWithinInterval(newTime, {
				start: new Date(fromUnixTime(weather.sys.sunrise).toString()),
				end: new Date(fromUnixTime(weather.sys.sunset).toString()),
			})
				? dispatch(backgroundAction('dawn'))
				: dispatch(backgroundAction('dusk'));
		}
	};

	const fetchSearchLocation = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			dispatch(searchAction(e));
			const forecastResp = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
			);
			if (forecastResp.ok) {
				const forecastData = await forecastResp.json();
				dispatch(forecastAction(forecastData));
				setForecast(forecastData);

				const weatherResp = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?lat=${forecastData.city.coord.lat}&lon=${forecastData.city.coord.lon}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
				);
				if (weatherResp.ok) {
					const weatherData = await weatherResp.json();
					dispatch(weatherAction(weatherData));
					setWeather(weatherData);
					setIsLoading(false);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const geolocate = () => {
		let geolocation = require('geolocation');
		geolocation.getCurrentPosition(function (err: Error, position: any) {
			if (err) throw err;
			setGeolocated(position);
		});
	};

	const fetchGeolocated = async () => {
		try {
			if (geolocated) {
				const tideResp = await fetch(
					`https://tides.p.rapidapi.com/tides?longitude=${geolocated.coords.longitude}&latitude=${geolocated.coords.latitude}&interval=60&duration=1440`,
					{
						method: 'GET',
						headers: {
							'x-rapidapi-host': 'tides.p.rapidapi.com',
							'x-rapidapi-key': `${process.env.REACT_APP_RAPID}`,
						},
					}
				);
				const tide = await tideResp.json();
				if (tide) {
					dispatch(tidalAction(tide));
				}
				const forecastResp = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${geolocated.coords.latitude}&lon=${geolocated.coords.longitude}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
				);
				if (forecastResp.ok) {
					const forecastData = await forecastResp.json();
					dispatch(forecastAction(forecastData));
					setForecast(forecastData);

					const weatherResp = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${geolocated.coords.latitude}&lon=${geolocated.coords.longitude}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
					);
					if (weatherResp.ok) {
						const weatherData = await weatherResp.json();
						dispatch(weatherAction(weatherData));
						setWeather(weatherData);
						setIsLoading(false);
					}
				}
			}
		} catch (error) {
			console.log('💀', error);
		}
	};

	const addToFavs = () => {
		setFav(!fav);
		const favs = {
			name: props.forecast?.city.name,
			country: props.forecast?.city.country,
			pop: props.forecast?.city.population,
			lat: weather?.coord.lat,
			lon: weather?.coord.lon,
			timezone: weather?.timezone,
		};
		dispatch(addFavAction(favs));
	};

	return (
		<div style={{ overflow: 'auto', color: '' }}>
			<h2 className='headline'>
				{isLoading ? (
					<div className='focus-in-expand'>Searching ...</div>
				) : (
					'Weather'
				)}
			</h2>
			<div>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div style={{ display: 'inline-block' }}>
						<form
							style={{ zIndex: 5 }}
							className='App'
							onSubmit={(e) => fetchSearchLocation(e)}>
							<input
								className='searchInput'
								spellCheck='false'
								type='text'
								placeholder='🔎 Location ...'
								value={searchValue}
								onChange={(e) => {
									setSearchValue(e.target.value);
								}}
							/>
						</form>
					</div>
					<div
						title='Current Location! 🧭'
						onClick={() => geolocate()}
						style={{ display: 'inline-block' }}>
						<svg
							className='weatherButtons'
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<circle cx='12' cy='10' r='3' />
							<path d='M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z' />
						</svg>
					</div>
					{props.forecast && props.user && (
						<div title='Add to favourites! ❤' style={{ display: 'inline-block' }}>
							<svg
								onMouseOver={(e) => {
									setHoverHeart(true);
								}}
								onMouseLeave={(e) => {
									setHoverHeart(false);
								}}
								onClick={() => addToFavs()}
								className='weatherButtons'
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke={hoverHeart || fav ? 'red' : 'currentColor'}
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
							</svg>
						</div>
					)}
					{props.forecast && props.user && (
						<div
							title='Upload a Photo! 📷'
							onClick={() => goToPhotos()}
							style={{ display: 'inline-block' }}>
							<svg
								className='weatherButtons'
								onMouseOver={(e) => {
									setHoverUpload(true);
								}}
								onMouseLeave={(e) => {
									setHoverUpload(false);
								}}
								stroke={hoverUpload ? 'green' : 'currentColor'}
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<line x1='12' y1='5' x2='12' y2='19'></line>
								<line x1='5' y1='12' x2='19' y2='12'></line>
							</svg>
						</div>
					)}
					<br />
				</div>

				{!props.forecast && (
					<div
						style={{
							fontSize: '3rem',
							marginTop: '10%',
							paddingBottom: '30%',
							width: '100%',
						}}
						className='focus-in-expand-fwd headline'>
						SEARCH OR CLICK!
					</div>
				)}
				{props.forecast && weather && (
					<>
						<div>
							<div className='weatherResult weatherData'>
								<div>
									<b style={{ fontSize: '2rem', margin: 0 }} className={'headline'}>
										{props.forecast.city.name}
									</b>
									<br />{' '}
									<small>
										{' '}
										in <i>{props.forecast.city.country}</i>
									</small>{' '}
									<br />
									<img
										className={'roll-in-blurred-left'}
										style={{ width: '60%' }}
										alt={`icon`}
										src={
											window.location.origin +
											`/` +
											weather?.weather[0].icon +
											`.png`
										}
									/>
									<br />
									<big className='headline'>
										<b>{weather?.weather[0].main} </b>
										<small>
											<i> {weather?.weather[0].description}</i>
										</small>
									</big>
								</div>
							</div>
							<div className='weatherResult weatherData'>
								<br />
								<h2 style={{ fontSize: '3rem', margin: 0 }} className={'headline'}>
									{weather?.main.temp} °C
								</h2>
								<br />
								<b>Highs</b>
								<small>
									{' '}
									of <i>{weather?.main.temp_max} °C</i>
								</small>
								<br />
								<b>Lows</b>
								<small>
									{' '}
									of <i>{weather?.main.temp_min} °C</i>
								</small>
								<br />
								<h2 className={'headline'}>
									Cloud coverage
									<small>
										{' '}
										at <i>{weather?.clouds.all} %</i>
									</small>
								</h2>
								<b>Visibility</b>
								<small>
									{' '}
									at <i>{weather?.visibility}m</i>
								</small>
								<br />
								<b>Wind Speeds</b>
								<small>
									{' '}
									of <i>{weather?.wind.speed} m/s</i>
								</small>
								<br />
								<b>Gusts</b>
								<small>
									{' '}
									up to <i>{weather?.wind.gust || 'N/A'} m/s</i>
								</small>
							</div>
							<div className='weatherResult weatherData'>
								<div key={props.forecast.city.id}>
									{weather && (
										<big className={'headline'}>
											<div
												style={{
													fontWeight: 'bold',
													fontSize: '28px',
													margin: '4px 0 12px 0',
												}}>
												{format(
													new Date(fromUnixTime(weather.dt).toString()),
													`EEEE do MMM`
												)}
											</div>
											<b className={'headline'}>
												Local Time is{' '}
												<i>
													{localTime
														? localTime
														: weather &&
														  format(
																new Date(fromUnixTime(weather.dt).toString()),
																`p`
														  )}
												</i>
											</b>
											<br />
										</big>
									)}
									<br />
									<b>Sunrise</b>{' '}
									<small>
										{weather?.sys.sunrise &&
											format(
												add(new Date(fromUnixTime(weather.sys.sunrise).toString()), {
													seconds: utcOffset,
												}),
												`p`
											)}
									</small>
									<br />
									<b>Sunset</b>{' '}
									<small>
										{weather?.sys.sunset &&
											format(
												add(new Date(fromUnixTime(weather.sys.sunset).toString()), {
													seconds: utcOffset,
												}),
												`p`
											)}
									</small>
								</div>
								<h2 style={{ paddingTop: '2.5px' }} className={'headline'}>
									Chance of Rain
									<small>
										<i> {Math.round(weather?.rain?.['1h'] || 0 * 100)} %</i>
									</small>
								</h2>
								<b>Expected</b>
								<small>
									<i> {weather?.rain?.['1h'] || 0} mm</i>
								</small>
								<br />
								<b>UV Index</b>
								<small title='Wear Sunscreen if 3+ 🧴'>
									{' '}
									at <i>N/A</i>
								</small>
								<br />
								<b>Humidity</b>
								<small>
									{' '}
									at <i>{weather?.main.humidity} %</i>
								</small>
							</div>
						</div>
						<WeatherForecast />
					</>
				)}
			</div>
		</div>
	);
};

export default connect((s) => s)(Weather);
