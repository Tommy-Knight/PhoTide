import Navbar from "../navbar";
import { connect } from "react-redux";
import { Props } from "../../types";

const Photos = (props: Props) => {
	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<div className='app-box'>
						<h1>PHOTOS</h1>
					</div>

					<div className='footer'></div>

					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Photos);
