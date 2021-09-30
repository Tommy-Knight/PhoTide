import "./style.scss";
import Navbar from "../navbar";
import { connect } from "react-redux";
import Map from "./map";
const Maps = () => {
	return (
		<>
			<div className='background'>
				<div className='app-grid'>
					<div className='app-box'>
						<h1 className="headline">Select a filter to view live data</h1>
						<Map />
					</div>
					<div className='footer'></div>
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Maps);
