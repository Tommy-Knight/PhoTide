import { useState } from "react";

export const Splash = (history: History) => {
	const [time, setTime] = useState<string>("dawn");
	const [checked, setChecked] = useState<boolean>(false);

	const handleChange = () => {
		if (checked === false) {
			setChecked(true);
			setTime("dusk");
		} else {
			setChecked(false);
			setTime("dawn");
		}
	};

	return (
		<>
			<div className={time}>
				<div className='app-grid'>
					<div className='app-box'>
						<br />
						<br />
						<br />
						<h1>SPLASH! </h1>
						<h1>WELCOME!</h1>
					</div>
				</div>
			</div>
		</>
	);
};
