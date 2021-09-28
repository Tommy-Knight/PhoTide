import React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import { Props, Forecast } from "../../types";
import { format, fromUnixTime, add, isWithinInterval } from "date-fns";
import "./style.scss";
import { connect, useDispatch } from "react-redux";
import { backgroundAction, searchAction } from "../../redux/actions";

const Weather = (props: Props) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [forecast, setForecast] = useState<Forecast | null>(null);
	const [utcOffset, setUtcOffset] = useState<number>(0);
	const [localTime, setLocalTime] = useState<string>();
	const [geolocated, setGeolocated] = useState<any | null>(null);

	const dispatch = useDispatch();

	useEffect(() => {
		fetchGeolocated();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [geolocated]);

	useEffect(() => {
		googleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [forecast, utcOffset]);

	const googleFetch = async () => {
		if (forecast) {
			const resp = await fetch(
				`https://maps.googleapis.com/maps/api/timezone/json?location=${forecast.city.coord.lat}%2C${forecast.city.coord.lon}&timestamp=0&key=${process.env.REACT_APP_GOOGLE_API}`
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
		if (forecast) {
			isWithinInterval(newTime, {
				start: new Date(fromUnixTime(forecast.city.sunrise).toString()),
				end: new Date(fromUnixTime(forecast.city.sunset).toString()),
			})
				? dispatch(backgroundAction("dawn"))
				: dispatch(backgroundAction("dusk"));
		}
	};

	const fetchSearchLocation = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			dispatch(searchAction(e));
			const resp = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=9d33c3e69026b25a6cab7f300ec5e461`
			);
			if (resp.ok) {
				const forecastData = await resp.json();
				setForecast(forecastData);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const geolocate = () => {
		let geolocation = require("geolocation");
		geolocation.getCurrentPosition(function (err: any, position: any) {
			if (err) throw err;
			setGeolocated(position);
		});
	};

	const fetchGeolocated = async () => {
		if (geolocated) {
			const resp = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${geolocated.coords.latitude}&lon=${geolocated.coords.longitude}&units=metric&appid=9d33c3e69026b25a6cab7f300ec5e461`
			);
			console.log(resp);
			if (resp.ok) {
				const forecastData = await resp.json();
				setForecast(forecastData);
				setIsLoading(false);
				console.log("☀", forecast);
			}
		}
	};

	return (
		<div style={{overflow:"auto"}}>
			<h2>Weather</h2>
			<div>
				<div style={{ display: "flex", justifyContent: "center" }}>
					<div style={{ display: "inline-block" }}>
						<form
							style={{ zIndex: 5 }}
							className='App'
							onSubmit={(e: React.FormEvent<HTMLFormElement>) => fetchSearchLocation(e)}>
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
						onClick={(e) => geolocate()}
						title='Current Location! 🧭'
						style={{ display: "inline-block" }}>
						<svg
							className='weatherButtons'
							style={{
								background: "rgba(255, 255, 255, 0.103)",
								borderRadius: "200%",
								border: "2px solid lightgrey",
								padding: "5px",
								marginLeft: "10px",
							}}
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
					<div
						title='Add to favourites! ❤'
						style={{ display: "inline-block" }}>
						<svg
							className='weatherButtons'
							style={{
								background: "rgba(255, 255, 255, 0.103)",
								borderRadius: "200%",
								border: "2px solid lightgrey",
								padding: "5px",
								marginLeft: "10px",
							}}
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
						</svg>
					</div>
					<div
						title='Upload a Photo! 📷'
						style={{ display: "inline-block" }}>
						<svg
							className='weatherButtons'
							style={{
								background: "rgba(255, 255, 255, 0.103)",
								borderRadius: "200%",
								border: "2px solid lightgrey",
								padding: "5px",
								marginLeft: "10px",
							}}
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'>
							<line x1='12' y1='5' x2='12' y2='19'></line>
							<line x1='5' y1='12' x2='19' y2='12'></line>
						</svg>
					</div>
					<br />
					{isLoading && <div className='focus-in-expand'> Oh Mama! We're searching ...</div>}
				</div>

				{!forecast && <h2>SEARCH OR CLICK THE LOCATOR!</h2>}
				{forecast && (
					<>
						<div className='weatherResult '>
							<div>
								<h2>
									{forecast.city.name}<br/>{" "}
									<small>
										{" "}
										in <i>{forecast.city.country}</i>
									</small>{" "}
								</h2>
								<img
									className={"roll-in-blurred-left"}
									style={{ width: "60%" }}
									alt={`icon`}
									src={window.location.origin + `/` + forecast.list[0].weather[0].icon + `.png`}
								/>
								<br />
								<b>{forecast.list[0].weather[0].main} </b>
								<small>
									{" "}
									currently <i>{forecast.list[0].weather[0].description}</i>
								</small>
							</div>
						</div>
						<div className='weatherResult '>
							<div key={forecast.city.id}>
								<h2>
									Local Time{" "}
									<small>
										{" "}
										is <i>{localTime && localTime}</i>
									</small>
								</h2>
								<b>Sunrise</b>{" "}
								<small>
									{format(
										add(new Date(fromUnixTime(forecast.city.sunrise).toString()), {
											seconds: utcOffset,
										}),
										`p`
									)}
								</small>
								<br />
								<b>Sunset</b>{" "}
								<small>
									{format(
										add(new Date(fromUnixTime(forecast.city.sunset).toString()), {
											seconds: utcOffset,
										}),
										`p`
									)}
								</small>
							</div>
							<br />
							<b>Temperature</b>
							<small>
								{" "}
								is <i>{forecast.list[0].main.temp} °C</i>
							</small>
							<br />
							<b>Highs</b>
							<small>
								{" "}
								of <i>{forecast.list[0].main.temp_max} °C</i>
							</small>
							<br />
							<b>Lows</b>
							<small>
								{" "}
								of <i>{forecast.list[0].main.temp_min} °C</i>
							</small>
						</div>
						<div className='weatherResult '>
							<h2>
								Cloud coverage
								<small>
									{" "}
									at <i>{forecast.list[0].clouds.all} %</i>
								</small>
							</h2>
							<b>Wind Speed</b>
							<small>
								{" "}
								is <i>{forecast.list[0].wind.speed} m/s</i>
							</small>
							<br />
							<b>Gusts</b>
							<small>
								{" "}
								of <i>{forecast.list[0].wind.gust} m/s</i>
							</small>
							<br />
							<b>Humidity</b>
							<small>
								{" "}
								at <i>{forecast.list[0].main.humidity} %</i>
							</small>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default connect((s) => s)(Weather);
