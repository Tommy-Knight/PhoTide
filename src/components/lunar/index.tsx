import React, { useEffect, useState } from "react";

export default function Lunar() {
	const [moonPhase, setMoonPhase] = useState<string | undefined>("");

	useEffect(() => {
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
			if (t === 0) return "🌑 New Moon";
			if (t === 1) return "🌒 Waxing Crescent Moon";
			if (t === 2) return "🌓 First-Quarter Moon";
			if (t === 3) return "🌔 Waxing Gibbous Moon";
			if (t === 4) return "🌖 Waning Gibbous Moon";
			if (t === 5) return "🌗 Last Quarter Moon";
			if (t === 6) return "🌘 Waning Crescent Moon";
			if (t === 7) return "🌕 Full Moon";
		};
		setMoonPhase(moon_phase(2022, 1, 5));
		console.log(moon_phase(2022, 1, 5));
	}, []);

	return (
		<div>
			<h2>Lunar</h2>

			<h1>Current Phase: {moonPhase}</h1>
			<p>
				🌑 New Moon
				<br />
				🌒 Waxing Crescent Moon
				<br />
				🌓 First-Quarter Moon
				<br />
				🌔 Waxing Gibbous Moon
				<br />
				🌖 Waning Gibbous Moon
				<br />
				🌗 Last Quarter Moon
				<br />
				🌘 Waning Crescent Moon
				<br />
				🌕 Full Moon
				<br />
			</p>
		</div>
	);
}
