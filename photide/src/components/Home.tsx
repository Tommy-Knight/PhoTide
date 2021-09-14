import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Home = ({ history }: any) => {
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	};

	useEffect(() => {
		window.setTimeout(() => {
			console.log("Welcome! 🦩");
		}, 666);
	});

	return (
		<>
			<div className='app-grid'>
				<div className='app-box bounce-in-fwd'>box</div>
				<div className='left-box'>L</div>
				<div className='right-box'>R</div>
				<div className='footer'>F</div>
				<div className='nav'>N</div>
			</div>
			
		</>
	);
};

export default Home;
