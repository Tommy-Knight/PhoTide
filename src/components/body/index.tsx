import { useState, ChangeEvent } from "react";
import { ResponseInterface } from "../../types";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";

export default function Body() {
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchResult, setSearchResult] = useState<ResponseInterface | null>(null);
	// const [error, setError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [forecast, setForecast] = useState<any>({});

	// api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=9d33c3e69026b25a6cab7f300ec5e461

	const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setIsLoading(true);
			const result = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9d33c3e69026b25a6cab7f300ec5e461`
			);
			const data = await result.json();
			console.log("response", data);
			setSearchResult(data);
			setIsLoading(false);
			const forecastResult = await fetch(
				`api.openweathermap.org/data/2.5/forecast?q=${searchValue}&appid=9d33c3e69026b25a6cab7f300ec5e461`
			);
			const forecastData = await forecastResult.json();
			setForecast(forecastData);
			console.log("🚿", forecast);
			setIsLoading(false);
		} catch (error) {
			console.error(error);
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
					{searchResult && (
						<div className='weatherResult '>
							{searchResult && (
								<div>
									<div key={searchResult.id}>
										<img
											style={{ width: "auto" }}
											alt={`icon`}
											src={window.location.origin + `/` + searchResult.weather[0].icon + `.png`}
										/>
										<br />
										<b>{searchResult.name} </b>
										<small>
											{" "}
											in <i>{searchResult.sys.country}</i>
										</small>
										<br />
										<b>Sunrise</b>{" "}
										<small>
											{format(new Date(fromUnixTime(searchResult.sys.sunrise).toString()), `p`)}
										</small>
										<br />
										<b>Sunset</b>{" "}
										<small>
											{format(new Date(fromUnixTime(searchResult.sys.sunset).toString()), `p`)}
										</small>
										<br />
										<b>Temperature</b>
										<small>
											{" "}
											is <i>{searchResult.main.temp} °C</i>
										</small>
										<br />
										<b>{searchResult.weather[0].main} </b>
										<small>
											{" "}
											currently <i>{searchResult.weather[0].description}</i>
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
