import Navbar from "../components/navbar";
import { connect } from "react-redux";
import { Props } from "../types";

const Favourites = (props: Props) => {
	return (
		<>
			<div className='background'>
				<div className='app-grid'>
					<div className='app-box'>
						<h1>Favourites</h1>
					</div>

					<div className='footer'></div>

					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Favourites);
