import { useEffect, useState } from "react";
import Body from "../components/body";
import { connect } from "react-redux";

export const Splash = (props: any) => {
	const [time, setTime] = useState<string>("dawn");
	const [checked, setChecked] = useState<boolean>(false);
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};

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
					<Body />
					<div className='left-box'>L</div>
					<div className='right-box'>R</div>
					<div className='footer'>F</div>
					<div className='nav navBar p'>
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
			</div>
		</>
	);
};

export default connect((s) => s)(Splash);
