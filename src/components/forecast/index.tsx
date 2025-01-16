import { add, format, fromUnixTime } from 'date-fns';

import { Props } from '../../types';
import React from 'react';
import { connect } from 'react-redux';

const WeatherForecast = (props: Props) => {
	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
			{props.forecast && props.forecast.list ? (
				props.forecast.list.map((item, i) => {
					const time = new Date(
						new Date(fromUnixTime(item.dt).toString()).toUTCString().substr(0, 25)
					);
					const seconds = props.forecast?.city.timezone || 0;
					const newTime = add(time, { seconds });
					if (
						format(newTime, `HH`) === '12' &&
						new Date(newTime).getDate() !== new Date().getDate() &&
						new Date(newTime) > new Date()
					) {
						return (
							<div key={i} className='weatherForecast'>
								<b className={'headline'}>{format(newTime, `EEEE do MMM`)}</b>
								<br />
								<img
									style={{ width: '40%' }}
									alt={`icon`}
									src={window.location.origin + `/` + item.weather[0].icon + `.png`}
								/>
								<br />
								{item.main.temp} °C
								<br />
								{item.weather[0].main}
							</div>
						);
					} else {
						return null;
					}
				})
			) : (
				<div className='headline'>No Forecast Data</div>
			)}
		</div>
	);
};
export default connect((s) => s)(WeatherForecast);
