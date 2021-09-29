import "./style.scss";
import { connect, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Props } from "../../types";
import { focusAction, userAction } from "../../redux/actions";
import Navbar from "../navbar";
import Weather from "../weather";
import Tidal from "../tide";
import Lunar from "../lunar";

const Mega = (props: Props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		loginFetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.user?._id]);

	const loginFetch = async () => {
		if (props.user) {
			try {
				const resp = await fetch(`http://localhost:3069/users/me`, {
					credentials: "include",
				});
				if (resp.ok) {
					const data = await resp.json();
					dispatch(userAction(data));
				}
			} catch (error) {
				console.log("💀", error);
			}
		}
	};

	const selectFocus = (e: string) => {
		dispatch(focusAction(e));
	};
	
	const LunarButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("lunar")}>
				<span style={{ fontSize: "1.5vw" }}>LUNAR</span>
				<p style={{ fontSize: "10vw", marginTop: "0px" }}>🌑</p>
			</span>
		);
	};
	const TidalButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("tidal")}>
				<span style={{ fontSize: "1.5vw" }}>TIDAL</span>
				<p style={{ fontSize: "10vw", marginTop: "0px" }}>🌊</p>
			</span>
		);
	};
	const WeatherButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("weather")}>
				<span style={{ fontSize: "1.5vw" }}>WEATHER</span>
				<p style={{ fontSize: "10vw", marginTop: "0px" }}>⛅</p>
			</span>
		);
	};

	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					<div className='app-box'>
						{props.focus === "weather" && <Weather />}
						{props.focus === "lunar" && <Lunar />}
						{props.focus === "tidal" && <Tidal />}
					</div>

					<div className='left-box sideButton'>
						{props.focus === "weather" && <LunarButton />}
						{props.focus === "tidal" && <WeatherButton />}
						{props.focus === "lunar" && <TidalButton />}
					</div>

					<div className='right-box sideButton'>
						{props.focus === "tidal" && <LunarButton />}
						{props.focus === "lunar" && <WeatherButton />}
						{props.focus === "weather" && <TidalButton />}
					</div>
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Mega);
