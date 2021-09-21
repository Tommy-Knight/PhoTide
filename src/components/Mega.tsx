import Body from "./body";
import Navbar from "./navbar";
import { connect } from "react-redux";
import { Props } from "../types";

const Mega = (props: Props) => {
	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<Body />

					<div className='footer'></div>

					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Mega);
