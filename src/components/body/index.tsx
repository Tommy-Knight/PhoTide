import Weather from "../weather";
import Tidal from "../tide";
import Lunar from "../lunar";
import {Props} from "../../types"
import { connect, useDispatch } from "react-redux";
import { focusAction } from "../../redux/actions";
import "./style.scss";

const Body = (props: Props) => {
	const dispatch = useDispatch();

	const selectFocus = (e: string) => {
		dispatch(focusAction(e));
	};
	const LunarButton = () => {
		return (
			<span onClick={(e: React.MouseEvent) => selectFocus("lunar")}><span style={{fontSize:"1.5vw"}}>LUNAR</span>
				<p style={{ fontSize: "10vw", marginTop:"0px" }}>🌑</p>
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
