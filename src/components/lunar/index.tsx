import './style.scss';

import React, { useEffect, useState } from 'react';
import { format, fromUnixTime } from 'date-fns';

import { Props } from '../../types';
import { connect } from 'react-redux';

const Lunar = (props: Props) => {
	const [moonPhase, setMoonPhase] = useState<string | undefined>('');
	const [brightness, setBrightness] = useState<number | null>(null);

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
		const bright = (t / 8) * 100;
		setBrightness(bright);

		const moonPhaseArr = [
			'New Moon',
			'Waxing Crescent Moon',
			'First Quarter Moon',
			'Waxing Gibbous Moon',
			'Waning Gibbous Moon',
			'Last Quarter Moon',
			'Waning Crescent Moon',
			'Full Moon',
		];
		return moonPhaseArr[t];
	};

	const mooning = (p: number) => {
		let m = Math.floor(p);
		p -= m;
		m = Math.floor(p * 8);
		const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌖', '🌗', '🌘', '🌕'];
		return moonPhases[m];
	};

	useEffect(() => {
		setMoonPhase(moon_phase(2021, 10, 20));
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
				{brightness && (
					<h2 className={'headline'}>
						Brightness
						<small>
							{' '}
							at{' '}
							<i>
								{brightness}
								<small>%</small>
							</i>
						</small>
					</h2>
				)}
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
				<br />
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
