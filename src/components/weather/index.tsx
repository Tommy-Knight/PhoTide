import React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import { Forecast } from "../../types";
import { format, fromUnixTime, add, isWithinInterval } from "date-fns";
import "./style.scss";
import { useDispatch } from "react-redux";
import { backgroundAction } from "../../redux/actions";

export default function Weather() {
	const [searchValue, setSearchValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [forecast, setForecast] = useState<Forecast | null>(null);
	const [utcOffset, setUtcOffset] = useState<number>(0);
	const [localTime, setLocalTime] = useState<string>();
	const [dayTime, setDayTime] = useState<string>("dusk");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(backgroundAction(dayTime));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dayTime]);

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
				? setDayTime("dawn")
				: setDayTime("dusk");
		}
	};

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
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

	return (
		<>
			<h2>Weather</h2>
			<div
				style={{
					zIndex: 5,
				}}>
				<form
					style={{ zIndex: 5 }}
					className='App'
					onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSearch(e)}>
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
					<br />
				</form>
				{isLoading && <div className='weatherResult'>Oh Mama! We're searching ...</div>}
				{forecast && (
					<div className='weatherResult '>
						{forecast && (
							<div>
								<div key={forecast.city.id}>
									<img
										className={"roll-in-blurred-left"}
										style={{ width: "9em" }}
										alt={`icon`}
										src={window.location.origin + `/` + forecast.list[0].weather[0].icon + `.png`}
									/>
									<br />
									<b>{forecast.city.name} </b>
									<small>
										{" "}
										in <i>{forecast.city.country}</i>
									</small>
									<br />
									<b>Time</b> <small>{localTime && localTime}</small>
									<br />
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
									<br />
									<b>Temperature</b>
									<small>
										{" "}
										is <i>{forecast.list[0].main.temp} °C</i>
									</small>
									<br />
									<b>{forecast.list[0].weather[0].main} </b>
									<small>
										{" "}
										currently <i>{forecast.list[0].weather[0].description}</i>
									</small>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
		</>
	);
}
