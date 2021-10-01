import "./style.scss";
import Navbar from "../navbar";
import { connect } from "react-redux";
import { Props } from "../../types";
import { useHistory } from "react-router";

const Photos = (props: Props) => {
	const history = useHistory();
	const goToPhotos = () => {
		history.push("/upload");
	};

	return (
		<>
			<div className='background'>
				<div className='app-grid'>
					<div className='app-box'>
						<h1 style={{ display: "inline-block" }} className='headline'>
							Photos
						</h1>{" "}
						<div
							title='Upload a Photo! 📷'
							onClick={(e) => goToPhotos()}
							style={{ display: "inline-block" }}>
							<svg
								className='weatherButtons'
								style={{
									background: "rgba(255, 255, 255, 0.103)",
									borderRadius: "200%",
									border: "2px solid white",
									padding: "5px",
									marginLeft: "10px",
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
						<br />
						{props.photos && (
							<div className='weatherResult headline' style={{ width: "auto", padding: "3%" }}>
								<img
									style={{ display: "inline-block", height: "40vh" , border:"1px solid white", borderRadius:"5px"}}
									alt='nop'
									src={props.photos?.images[0].dataURL}
								/>
								<div style={{ display: "inline-block", paddingLeft: "30px", verticalAlign: "top" }}>
									<img
										className={"roll-in-blurred-left"}
										style={{ width: "20%" }}
										alt={`icon`}
										src={window.location.origin + `/` + props.photos?.weather[0].icon + `.png`}
									/>
									<h1 style={{ margin: 0 }} className='headline'>
										<u>{props.photos?.title}</u>
									</h1>
									<big>
										{props.photos?.city}, <i>{props.photos?.country}</i>
									</big>
									<br />
									<br/>
									<div style={{textAlign:"right"}}>
										<big>{props.photos?.weather[0].main}</big>,
										<i> {props.photos?.weather[0].description}</i>
										<br />
										<big>Temperature </big>
										<small> was </small>
										<i>{props.photos?.temp} °C</i>
										<br />
										<big>Highs </big>
										<small> of </small> <i>{props.photos?.tempMax} °C</i>
										<br />
										<big>Lows </big>
										<small> of </small>
										<i>{props.photos?.tempMin} °C</i>
										<br />
										<big>Clouds </big>
										<small> at </small> <i>{props.photos?.clouds} %</i>
									</div>
									<br />
								</div>
							</div>
						)}
					</div>
					<div className='footer'></div>
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Photos);
