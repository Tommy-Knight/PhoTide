import Body from "./body";
import { Left, Right } from "./side-buttons";
import { connect } from "react-redux";

const Home = (props: any) => {
	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<Body />
					<Left />
					<Right />
					<div className='footer'></div>
					<div className='nav navBar p'>USER PROFILE // FAVOURITES // MAP // LOGOUT</div>
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Home);
