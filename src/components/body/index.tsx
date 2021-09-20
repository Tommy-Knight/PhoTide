import Weather from "../weather";
import Tidal from "../tide";
import Lunar from "../lunar";
import { connect, useDispatch } from "react-redux";
import { focusAction } from "../../redux/actions";

const Body = (props: any) => {
	const dispatch = useDispatch();

	const selectFocus = (e: string) => {
		dispatch(focusAction(e));
	};
	const LunarButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("lunar")}>
				LUNAR
				<img
					className={"puff-in-center"}
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
				TIDAL
				<img
					className={"puff-in-center"}
					style={{ width: "100%" }}
					alt={`icon`}
					src={window.location.origin + `/tide.png`}
				/>
			</span>
		);
	};
	const WeatherButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("weather")}>
				WEATHER
				<img
					className={"puff-in-center"}
					style={{ width: "100%" }}
					alt={`icon`}
					src={window.location.origin + `/sun.png`}
				/>
			</span>
		);
	};
	return (
		<>
			<div className='app-box'>
				{props.focus === "weather" && <Weather />}
				{props.focus === "lunar" && <Lunar />}
				{props.focus === "tidal" && <Tidal />}
			</div>

			<div className='left-box'>
				{props.focus === "weather" && <LunarButton />}
				{props.focus === "tidal" && <WeatherButton />}
				{props.focus === "lunar" && <TidalButton />}
			</div>

			<div className='right-box'>
				{props.focus === "tidal" && <LunarButton />}
				{props.focus === "lunar" && <WeatherButton />}
				{props.focus === "weather" && <TidalButton />}
			</div>
		</>
	);
};
export default connect((s) => s)(Body);
