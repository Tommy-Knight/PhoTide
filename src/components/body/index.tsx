import { useState, ChangeEvent, useEffect } from "react";
import { Forecast } from "../../types";
import { format, fromUnixTime, add } from "date-fns";
import "./style.scss";
export default function Body() {
	const [searchValue, setSearchValue] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [forecast, setForecast] = useState<Forecast | null>(null);
	const [utcOffset, setUtcOffset] = useState<number>(0);
	const [localTime, setLocalTime] = useState<string>();

	useEffect(() => {
		googleFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [forecast, utcOffset]);

	const googleFetch = async () => {
		if (forecast) {
			const resp = await fetch(
				`https://maps.googleapis.com/maps/api/timezone/json?location=${forecast.city.coord.lat}%2C${forecast.city.coord.lon}&timestamp=0&key=${process.env.REACT_APP_GOOGLE_API}`
			);
			if (resp.ok) {
				const googleData = await resp.json();
				setUtcOffset(googleData.rawOffset);
				getLocalTime();
			}
		}
	};

	const getLocalTime = () => {
		const UTC = new Date(new Date().toUTCString().substr(0, 25));
		let seconds = utcOffset;
		setLocalTime(format(add(UTC, { seconds }), `p`));
	};

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const forecastFetch = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=9d33c3e69026b25a6cab7f300ec5e461`
			);
			const forecastData = await forecastFetch.json();
			setForecast(forecastData);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className='app-box'>
				box
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
							type='text'
							placeholder='🔎 Location ...'
							value={searchValue}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setSearchValue(e.target.value);
							}}
						/>
						<br />
					</form>
					{isLoading && <div className='weatherResult'>we loading baby</div>}
					{forecast && (
						<div className='weatherResult '>
							{forecast && (
								<div>
									<div key={forecast.city.id}>
										<img
											className={"roll-in-blurred-left"}
											style={{ width: "auto" }}
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
											{format(new Date(fromUnixTime(forecast.city.sunrise).toString()), `p`)}
										</small>
										<br />
										<b>Sunset</b>{" "}
										<small>
											{format(new Date(fromUnixTime(forecast.city.sunset).toString()), `p`)}
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
			</div>
		</>
	);
}
