import { connect } from "react-redux";
import { Props } from "../../types";
import { format, fromUnixTime } from "date-fns";

const WeatherForecast = (props: Props) => {
	return (
		<div>
			{props.weather &&
				props.weather.daily.map((item) => {
					return (
						<div style={{ width: "10%" }} className='weatherResult'>
							<br />
							<big className='headline'>
								{format(new Date(fromUnixTime(item.dt).toString()), `iii`)}
							</big>
							<br />
							<img
								className={"bounce-in-fwd"}
								style={{ width: "50%" }}
								alt={`icon`}
								src={window.location.origin + `/` + item.weather[0].icon + `.png`}
							/>
							<br />
							<span>{item.temp.max}°</span>/<span>{item.temp.min}°</span>
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
