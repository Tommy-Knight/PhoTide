import Body from "./body";
import { connect, useDispatch } from "react-redux";
import { focusAction } from "../redux/actions";

const Home = (props: any) => {

	  const dispatch = useDispatch();

	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<Body/>

					<div className='footer'></div>

					<div className='nav navBar p'>USER PROFILE // FAVOURITES // MAP // LOGOUT</div>
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Home);
