import './style.scss';
import { useHistory } from 'react-router-dom';
import React, { useState, ChangeEvent, useEffect } from 'react';
import { format, fromUnixTime, add, isWithinInterval } from 'date-fns';
import { connect, useDispatch } from 'react-redux';
import {
	backgroundAction,
	searchAction,
	weatherAction,
	forecastAction,
	addFavAction,
	tidalAction,
	// fetchForecastAction,
	// fetchWeatherAction,
} from '../../redux/actions';
import { Forecast, Props } from '../../types';
import WeatherForecast from '../forecast/index';

const Weather = (props: Props) => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [forecast, setForecast] = useState<Forecast | null>(null);
	const [utcOffset, setUtcOffset] = useState<number>(0);
	const [localTime, setLocalTime] = useState<string>();
	const [geolocated, setGeolocated] = useState<any | null>(null);
	const [viewDay, setViewDay] = useState<number>(0);
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
				`https://maps.googleapis.com/maps/api/timezone/json?location=${props.forecast.city.coord.lat}%2C${props.forecast.city.coord.lon}&timestamp=0&key=${process.env.REACT_APP_GOOGLE_API}`
			);
			const googleData = await resp.json();
			setUtcOffset(googleData.rawOffset);
			console.log(googleData);
			getLocalTime();
		}
	};

	const getLocalTime = () => {
		const UTC = new Date(new Date().toUTCString().substr(0, 25));
		const seconds = utcOffset;
		const newTime = add(UTC, { seconds });
		setLocalTime(format(newTime, `p`));
		if (forecast) {
			isWithinInterval(newTime, {
				start: new Date(fromUnixTime(forecast.city.sunrise).toString()),
				end: new Date(fromUnixTime(forecast.city.sunset).toString()),
			})
				? dispatch(backgroundAction('dawn'))
				: dispatch(backgroundAction('dusk'));
		}
	};

	const fetchSearchLocation = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('🚿');
		try {
			setIsLoading(true);
			dispatch(searchAction(e));
			const resp = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
			);
			if (resp.ok) {
				const forecastData = await resp.json();
				dispatch(forecastAction(forecastData));
				setForecast(forecastData);
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${forecastData.city.coord.lat}&lon=${forecastData.city.coord.lon}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
				);
				if (response.ok) {
					const weather = await response.json();
					dispatch(weatherAction(weather));
					setIsLoading(false);
					console.log('☀', weather);
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
			console.log(position);
			// dispatch(fetchForecastAction({ lat: position.coords.lat, lon: position.coords.lon }));
			// dispatch(fetchWeatherAction({ lat: position.coords.lat, lon: position.coords.lon }));
		});
	};

	const fetchGeolocated = async () => {
		try {
			if (geolocated) {
				console.log('🎈');
				// const tideResp = await fetch(
				// 	'https://tides.p.rapidapi.com/tides?longitude=-2.097&latitude=44.414&interval=60&duration=1440',
				// 	{
				// 		method: 'GET',
				// 		headers: {
				// 			'x-rapidapi-host': 'tides.p.rapidapi.com',
				// 			'x-rapidapi-key': '93c27b20f1msh447fc923a1275afp112802jsn56ee71713f05',
				// 		},
				// 	}
				// );
				// const tide = await tideResp.json();
				// if (tide) {
				// 	console.log('🤽‍♂️');
				// 	dispatch(tidalAction(tide));
				// }
				const resp = await fetch(
					`https://api.openweathermap.org/data/2.5/forecast?lat=${geolocated.coords.latitude}&lon=${geolocated.coords.longitude}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
				);
				if (resp.ok) {
					const forecastData = await resp.json();
					dispatch(forecastAction(forecastData));
					setForecast(forecastData);
					setIsLoading(false);
				}
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/onecall?lat=${geolocated.coords.latitude}&lon=${geolocated.coords.longitude}&units=metric&appid=${process.env.REACT_APP_OW_KEY}`
				);
				if (response.ok) {
					const weather = await response.json();
					dispatch(weatherAction(weather));
					setIsLoading(false);
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
			lat: props.weather?.lat,
			lon: props.weather?.lon,
			timezone: props.weather?.timezone,
		};
		dispatch(addFavAction(favs));
	};

	const setDay = (e: number) => {
		setViewDay(e!);
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
							onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
								fetchSearchLocation(e)
							}>
							<input
								className='searchInput'
								spellCheck='false'
								type='text'
								placeholder='🔎 Location ...'
								value={searchValue}
								onChange={(e: ChangeEvent<HTMLInputElement>) => {
									setSearchValue(e.target.value);
								}}
							/>
						</form>
					</div>
					<div
						title='Current Location! 🧭'
						onClick={(e) => geolocate()}
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
								onClick={(e) => addToFavs()}
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
							onClick={(e) => goToPhotos()}
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
				{props.forecast && props.weather && (
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
											props.weather?.daily[viewDay].weather[0].icon +
											`.png`
										}
									/>
									<br/>
									<big className='headline'>
										<b>{props.forecast.list[0].weather[0].main} </b>
										<small>
											<i> {props.weather?.daily[viewDay].weather[0].description}</i>
										</small>
									</big>
								</div>
							</div>
							<div className='weatherResult weatherData'>
								<br />
								<h2 style={{ fontSize: '3rem', margin: 0 }} className={'headline'}>
									{props.weather?.daily[viewDay].temp.day} °C
								</h2>
								<br />
								<b>Highs</b>
								<small>
									{' '}
									of <i>{props.weather?.daily[viewDay].temp.max} °C</i>
								</small>
								<br />
								<b>Lows</b>
								<small>
									{' '}
									of <i>{props.weather?.daily[viewDay].temp.min} °C</i>
								</small>
								<br />
								<h2 className={'headline'}>
									Cloud coverage
									<small>
										{' '}
										at <i>{props.weather?.daily[viewDay].clouds} %</i>
									</small>
								</h2>
								<b>Visibility</b>
								<small>
									{' '}
									at <i>{props.weather?.current.visibility}m</i>
								</small>
								<br />
								<b>Wind Speeds</b>
								<small>
									{' '}
									of <i>{props.weather?.daily[viewDay].wind_speed} m/s</i>
								</small>
								<br />
								<b>Gusts</b>
								<small>
									{' '}
									up to <i>{props.weather?.daily[viewDay].wind_gust} m/s</i>
								</small>
							</div>
							<div className='weatherResult weatherData'>
								<div key={props.forecast.city.id}>
									{props.weather && (
										<big className={'headline'}>
											<div
												style={{
													fontWeight: 'bold',
													fontSize: '28px',
													margin: '4px 0 12px 0',
												}}>
												{format(
													new Date(
														fromUnixTime(props.weather.daily[viewDay].dt!).toString()
													),
													`EEEE do MMM`
												)}
											</div>
											<b className={'headline'}>
												Local Time is{' '}
												<i>
													{localTime
														? localTime
														: props.weather &&
														  format(
																new Date(
																	fromUnixTime(props.weather!.current.dt!).toString()
																),
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
										{props.weather?.daily[viewDay].sunrise &&
											format(
												add(
													new Date(
														fromUnixTime(
															props.weather?.daily[viewDay].sunrise!
														).toString()
													),
													{
														seconds: utcOffset,
													}
												),
												`p`
											)}
									</small>
									<br />
									<b>Sunset</b>{' '}
									<small>
										{props.weather?.daily[viewDay].sunset &&
											format(
												add(
													new Date(
														fromUnixTime(
															props.weather?.daily[viewDay].sunset!
														).toString()
													),
													{
														seconds: utcOffset,
													}
												),
												`p`
											)}
									</small>
								</div>
								<h2 style={{ paddingTop: '2.5px' }} className={'headline'}>
									Chance of Rain
									<small>
										<i> {Math.round(props.weather?.daily[viewDay].pop! * 100)} %</i>
									</small>
								</h2>
								<b>Expected</b>
								<small>
									{' '}
									<i>{props.weather?.daily[viewDay].rain || 0} mm</i>
								</small>
								<br />
								<b>UV Index</b>
								<small title='Wear Sunscreen if 3+ 🧴'>
									{' '}
									at <i>{props.weather?.current.uvi}</i>
								</small>
								<br />
								<b>Humidity</b>
								<small>
									{' '}
									at <i>{props.weather?.current.humidity} %</i>
								</small>
							</div>
						</div>
						<WeatherForecast setDay={(e) => setDay(e)} />
					</>
				)}
			</div>
		</div>
	);
};

export default connect((s) => s)(Weather);
