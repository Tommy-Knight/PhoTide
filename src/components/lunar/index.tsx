import './style.scss';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { format, fromUnixTime } from 'date-fns';
import { Props } from '../../types';

const Lunar = (props: Props) => {
	const [moonPhase, setMoonPhase] = useState<string | undefined>('');
	const moon_phase = (year: number, month: number, day: number) => {
		let x,
			y,
			z,
			t = 0;
		if (month < 3) {
			year--;
			month += 12;
		}
		++month;
		x = 365.25 * year;
		y = 30.6 * month;
		z = x + y + day - 694039.09; //z is total days elapsed
		z /= 29.5305882; //divide by the moon cycle
		t = Math.floor(z); //take integer of z
		z -= t; //subtract integer part to leave fractional part of original z
		t = Math.round(z * 8); //scale fraction from 0-8 and round
		if (t === 0) return 'New Moon';
		if (t === 1) return 'Waxing Crescent Moon';
		if (t === 2) return 'First Quarter Moon';
		if (t === 3) return 'Waxing Gibbous Moon';
		if (t === 4) return 'Waning Gibbous Moon';
		if (t === 5) return 'Last Quarter Moon';
		if (t === 6) return 'Waning Crescent Moon';
		if (t === 7) return 'Full Moon';
	};

	const mooning = (p: number) => {
		let m = Math.floor(p);
		p -= m;
		m = Math.floor(p * 8);
		if (m === 0) return '🌑';
		if (m === 1) return '🌒';
		if (m === 2) return '🌓';
		if (m === 3) return '🌔';
		if (m === 4) return '🌖';
		if (m === 5) return '🌗';
		if (m === 6) return '🌘';
		if (m === 7) return '🌕';
	};

	useEffect(() => {
		setMoonPhase(moon_phase(2021, 9, 30));
	}, []);

	return (
		<div>
			<h2 className='headline'>Lunar</h2>
			<div className='slide-in-elliptic-bottom-fwd'>
				<span style={{ fontSize: '69px' }}>
					{mooning(props.weather?.daily[0].moon_phase!)}
				</span>
			</div>
			<br />
			<b style={{ fontSize: '2rem' }}>{moonPhase}</b>
			<br />
			<div className='lunarInfo'>
		
				<h2 className={'headline'}>
					Cloudiness
					<small>
						{' '}
						at{' '}
						<i>
							{props.forecast?.list[0].clouds.all}
							<small>%</small>
						</i>
					</small>
				</h2>
				<b>Moonrise</b>{' '}
				<small>
					{props.weather &&
						format(
							new Date(fromUnixTime(props.weather?.daily[0].moonrise!).toString()),
							`p`
						)}
				</small>
				<br />
				<b>Moonset</b>{' '}
				<small>
					{props.weather &&
						format(
							new Date(fromUnixTime(props.weather?.daily[0].moonset!).toString()),
							`p`
						)}
					<br />
					<br />
				</small>
				<div
					className='headline aurora'
					style={{
						border: '2px solid black',
						height: '45px',
						marginTop: '10px',
					}}>
					<iframe
						title='aurora'
						scrolling='no'
						frameBorder=''
						width='100%'
						height='100%'
						src='//aurorawatch.lancs.ac.uk/external/status_text'></iframe>
				</div>
			</div>
			<span
				className='headline lunarInfo'
				style={{ textAlign: 'left', marginLeft: '15px' }}>
				🌑 - <small>New Moon</small>
				<br />
				🌒 - <small>Waxing Crescent</small>
				<br />
				🌓 - <small>First Quarter</small>
				<br />
				🌔 - <small>Waxing Gibbous</small>
				<br />
				🌖 - <small>Waning Gibbous</small>
				<br />
				🌗 - <small>Last Quarter</small>
				<br />
				🌘 - <small>Waning Crescent</small>
				<br />
				🌕 - <small>Full Moon</small>
				<br />
			</span>

			<div
				style={{
					verticalAlign: 'bottom',
					overflow: 'scroll',
					whiteSpace: 'nowrap',
				}}>
				{props.weather &&
					props.weather.daily.map((item, i) => {
						return (
							<div
								key={i}
								style={{
									width: '10%',
									padding: '5px',
								}}
								className='weatherResult'>
								<br />
								<big className='headline'>
									{format(new Date(fromUnixTime(item.dt).toString()), `iii`)}
								</big>
								<h1 className='bounce-in-fwd'>{mooning(item.moon_phase)}</h1>
							</div>
						);
					})}
			</div>
		</div>
	);
};
export default connect((s) => s)(Lunar);
