import React from "react";
import "./style.scss";
import Login from "../login";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
		<>
			<div className='header nav navBar'>
				<div className='dropdown' data-dropdown>
					<Link style={{textDecoration:"none", letterSpacing:"-5px"}} to="/">
						<h1>📸🌊</h1>
					</Link>
					<div className='dropdown-menu information-grid'>USER PROFILE</div>
				</div>
				<Link to='/photos' className='link' data-dropdown-button>
					PHOTOS
				</Link>

				<Link to='/maps' className='link'>
					MAPS
				</Link>
				<div style={{ right: "50px", position: "absolute", display: "flex", alignItems: "center" }}>
					<Link to="/register" style={{ padding: "20px" }} className='link'>
						REGISTER
					</Link>
					<span className='dropdown' data-dropdown>
						<button className='link' data-dropdown-button>
							LOGIN
						</button>
						<div className='dropdown-menu'>
							<Login />
						</div>
					</span>
					<button title='Thanks for visiting! 🌞' style={{ padding: "20px" }} className='link'>
						LOGOUT
					</button>
				</div>
				<img
					className={"puff-in-center"}
					src={window.location.origin + `/usericon.png`}
					style={{
						borderRadius: "100%",
						border: "px solid white",
						width: "45px",
						right: "10px",
						position: "absolute",
					}}
					alt={`📸`}
				/>
			</div>
		</>
	);
}
