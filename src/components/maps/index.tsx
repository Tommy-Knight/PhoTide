import "./style.scss";
import Navbar from "../navbar";
import { connect } from "react-redux";
import Map from "./map";

const Maps = () => {
	return (
		<>
			<div className='background'>
				<div className='app-grid'>
					<span style={{ width: "100vw", height: "90vh", marginBottom:0 }}>
						<Map />
					</span>

					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Maps);
