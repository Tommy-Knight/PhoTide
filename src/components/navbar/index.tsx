import React from "react";
import "./style.scss";
import Login from "../login";
import { connect, useDispatch } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { UserInterface, Props } from "../../types";
import { userAction } from "../../redux/actions";

// interface Props extends RouteComponentProps {
// 	background?: string;
// 	focus?: string;
// 	searchValue?: {};
// 	user?: UserInterface;
// }

const Navbar = (props: Props) => {
	const dispatch = useDispatch();
	const logOut = async () => {
		dispatch(userAction(null));
		try {
			const resp = await fetch(`http://localhost:3069/auth/logout`, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await resp.json();
			if (resp.ok) {
				console.log(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const goToProfile = () =>{
		if (props.history){props.history.push("/profile")}
		console.log("why")
	}

	return (
		<>
			<div className='header nav navBar'>
				<div className='dropdown' data-dropdown>
					<Link style={{ textDecoration: "none", letterSpacing: "-5px" }} to='/'>
						<h1>📸🌊</h1>
					</Link>
					<div className='dropdown-menu information-grid'>USER PROFILE</div>
				</div>
				{props.user && (
					<Link to='/photos' className='link'>
						PHOTOS
					</Link>
				)}
				{props.user && (
					<Link to='/favourites' className='link'>
						FAVOURITES
					</Link>
				)}
				<Link to='/maps' className='link'>
					MAPS
				</Link>
				<div style={{ right: "50px", position: "absolute", display: "flex", alignItems: "center" }}>
					{!props.user && (
						<div className='dropdown' data-dropdown>
							<button className='link' data-dropdown-button>
								LOGIN
							</button>
							<div className='dropdown-menu'>
								<Login />
							</div>
						</div>
					)}
					{!props.user && (
						<Link to='/register' style={{ padding: "20px" }} className='link'>
							REGISTER
						</Link>
					)}
					{props.user && (
						<Link to='/profile' style={{ padding: "20px" }} className='link'>
							{props.user.username}
						</Link>
					)}
					{props.user && (
						<button
							onClick={(e) => logOut()}
							title='Thanks for visiting! 🌞'
							style={{ padding: "20px" }}
							className='link'>
							LOGOUT
						</button>
					)}
				</div>
				<img
					onClick={(e) => goToProfile()}
					src={
						props.user
							? props.user.avatar
							: "https://image.flaticon.com/icons/png/512/5173/5173555.png"
					}
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
};
export default connect((s) => s)(Navbar);
