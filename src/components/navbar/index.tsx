import React from "react";
import "./style.scss";
import Login from "../login"

export default function Navbar() {
	return (
		<>
			<div className='header nav navBar p'>
				<div className='dropdown' data-dropdown>
					<button className='link' data-dropdown-button>
						USER PROFILE
					</button>
					<div className='dropdown-menu information-grid'>USER PROFILE</div>
				</div>
				<div className='dropdown' data-dropdown>
					<button className='link' data-dropdown-button>
						LOCATIONS
					</button>
					<div className='dropdown-menu information-grid'>YOUR FAVOURITE LOCATIONS</div>
				</div>
				<span className='link'>MAPS</span>
				<span className='link'>INFO</span>
				<div className='dropdown' data-dropdown>
					<button className='link' data-dropdown-button>
						LOGIN
					</button>
					<div className='dropdown-menu'>
				<Login/>
					</div>
				</div>
				<img
					className={"puff-in-center"}
					style={{ width: "80px", right: "30px", position: "absolute", top: "25px" }}
					alt={`📸🌊`}
				/>
			</div>
		</>
	);
}
