import { connect } from "react-redux";
import { Props } from "../../types";
import { format, fromUnixTime } from "date-fns";

const WeatherForecast = (props: Props) => {

	return (
		<div style={{ overflow: "scroll" }}>
			{props.weather &&
				props.weather.daily.map((item,i) => {
					return (
						<div onClick={e => props.setDay!(i)!} style={{ width: "6rem", margin: "2% 5px 0 0" }} className='weatherResult'>
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
							<small>{item.temp.max}° </small> /<small>{item.temp.min}°</small>
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
