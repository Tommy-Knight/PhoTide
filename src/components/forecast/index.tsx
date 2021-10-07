import { connect } from "react-redux";
import { Props } from "../../types";
import { format, fromUnixTime } from "date-fns";

const WeatherForecast = (props: Props) => {
	return (
		<div style={{ overflow: "scroll", whiteSpace: "nowrap" }}>
			{props.weather &&
				props.weather.daily.map((item, i) => {
					return (
						<div
							title={item.weather[0].description}
							key={i}
							onClick={(e) => props.setDay!(i)!}
							style={{ width: "6rem", height: "10rem" }}
							className='weatherResult weatherForecast'>
							<br />
							<big className='headline'>
								{format(new Date(fromUnixTime(item.dt).toString()), `iii`)}
							</big>
							<br />
							<img
								className={"bounce-in-fwd"}
								style={{ width: "3rem" }}
								alt={`icon`}
								src={window.location.origin + `/` + item.weather[0].icon + `.png`}
							/>
							<br />
							<small>{Math.round(item.temp.max)}° </small>/
							<small> {Math.floor(item.temp.min)}°</small>
							<br />
							<big className='headline'>{item.weather[0].main}</big>
							<br />
						</div>
					);
				})}
		</div>
	);
};

export default connect((s) => s)(WeatherForecast);
