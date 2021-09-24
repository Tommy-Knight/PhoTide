import Navbar from "../navbar";
import { connect } from "react-redux";
import { Props } from "../../types";

const Maps = (props: Props) => {
	return (
		<>
			<div className="background">
				<div className='app-grid'>
					<div className='app-box'>
						<h1>Maps</h1>
					</div>

					<div className='footer'></div>

					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Maps);
