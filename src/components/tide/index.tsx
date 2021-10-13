import React, { useEffect } from 'react';
import Chart from './chart';

export default function Tide() {
	useEffect(() => {
		fetchTides();
	}, []);

	const fetchTides = async () => {
		// const resp = await fetch(
		// 	'https://tides.p.rapidapi.com/tides?longitude=-2.097&latitude=44.414&interval=60&duration=1440',
		// 	{
		// 		method: 'GET',
		// 		headers: {
		// 			'x-rapidapi-host': 'tides.p.rapidapi.com',
		// 			'x-rapidapi-key':
		// 				'93c27b20f1msh447fc923a1275afp112802jsn56ee71713f05',
		// 		},
		// 	}
		// );
		// console.log(await resp.json());
	};

	return (
		<div>
			<h2 className="headline">Tidal</h2>
			<div style={{height:"180px", width:"20px", backgroundColor:"blue"}}></div>
			<Chart />
		</div>
	);
}
