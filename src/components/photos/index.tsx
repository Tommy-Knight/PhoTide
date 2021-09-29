import Navbar from "../navbar";
import { connect } from "react-redux";
import { Props } from "../../types";
import "./style.scss";

const Photos = (props: Props) => {
	return (
		<>
			<div className='background'>
				<div className='app-grid'>
					<div className='app-box'>
						<h1 className="headline">Photos</h1>
						<div title='Take a Picture! 📸' style={{ display: "inline-block" }}>
							<svg
								className='weatherButtons'
								style={{
									background: "rgba(255, 255, 255, 0.103)",
									borderRadius: "200%",
									border: "2px solid white",
									padding: "5px",
									marginLeft: "10px",
									width: "50px",
									height: "50px",
								}}
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<line x1='12' y1='5' x2='12' y2='19'></line>
								<line x1='5' y1='12' x2='19' y2='12'></line>
							</svg>
						</div>
						<div title='Upload a Photo! 🏕' style={{ display: "inline-block" }}>
							<svg
								className='weatherButtons'
								style={{
									background: "rgba(255, 255, 255, 0.103)",
									borderRadius: "200%",
									border: "2px solid white",
									padding: "5px",
									marginLeft: "10px",
									width: "50px",
									height: "50px",
								}}
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'>
								<line x1='12' y1='5' x2='12' y2='19'></line>
								<line x1='5' y1='12' x2='19' y2='12'></line>
							</svg>
						</div>
					</div>
					<div className='footer'></div>
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Photos);
