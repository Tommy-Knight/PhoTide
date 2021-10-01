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
				<span className={"glow"} style={{ fontSize: "1.5vw" }}>
					LUNAR
				</span>
				<br />
				<img
					className={"focus-in-expand-fwd"}
					style={{ width: "100%" }}
					alt={`icon`}
					src={window.location.origin + `/lunar.png`}
				/>
			</span>
		);
	};
	const TidalButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("tidal")}>
				<span className={"glow"} style={{ fontSize: "1.5vw" }}>
					TIDAL
				</span>
				<br />
				<img
					className={"focus-in-expand-fwd"}
					style={{ width: "100%" }}
					alt={`icon`}
					src={window.location.origin + `/water.png`}
				/>
			</span>
		);
	};
	const WeatherButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("weather")}>
				<span className={"glow"}  style={{ fontSize: "1.5vw" }}>
					WEATHER
				</span>
				<br />
				<img
					className={"focus-in-expand-fwd"}
					style={{ width: "100%" }}
					alt={`icon`}
					src={window.location.origin + `/weather.png`}
				/>
			</span>
		);
	};

	return (
		<>
			<div className={props.background}>
				<div className='app-grid'>
					{props.focus && (
						<>
							<div className='app-box'>
								{props.focus === "weather" && <Weather />}
								{props.focus === "lunar" && <Lunar />}
								{props.focus === "tidal" && <Tidal />}
							</div>
							<div className='left-box sideButton fade-in-left'>
								{props.focus === "weather" && <TidalButton />}
								{props.focus === "tidal" && <LunarButton />}
								{props.focus === "lunar" && <WeatherButton />}
							</div>
							<div className='right-box fade-in-right sideButton'>
								{props.focus === "tidal" && <WeatherButton />}
								{props.focus === "lunar" && <TidalButton />}
								{props.focus === "weather" && <LunarButton />}
							</div>{" "}
						</>
					)}
					<Navbar />
				</div>
			</div>
		</>
	);
};

export default connect((s) => s)(Mega);
