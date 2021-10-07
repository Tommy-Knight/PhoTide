import Navbar from "../navbar";
import { connect } from "react-redux";
import { Props } from "../../types";
import "./style.scss"

const Favourites = (props: Props) => {
	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<div className='app-box favs'>
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
