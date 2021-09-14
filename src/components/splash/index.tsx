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
						<h1>SPLASH! </h1>
						<h1>WELCOME!</h1>
					</div>
				</div>
				<div className='left-box'>L</div>
				<div className='right-box'>R</div>
				<div className='footer'>F</div>
				<div className='nav navBar p'>
					{" "}
					USER PROFILE // FAVOURITES // MAP // LOGOUT
					<label className='switch'>
						<input
							type='checkbox'
							onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChange()}
						/>
						<span className='slider'></span>
					</label>
				</div>
			</div>
		</>
	);
};
