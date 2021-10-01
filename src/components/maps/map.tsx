import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, LayersControl } from "react-leaflet";
import { connect } from "react-redux";
import { Props } from "../../types";

const Map = (props: Props) => {
	const mapTilerUrl = `https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=pyUqDY2O06Vi3Qg4qTB5`;
	const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	const owmLink = '<a href="https://openweathermap.org/">OpenWeatherMap</a>';
	const owmUrl = {
		a: "https://tile.openweathermap.org/map/",
		b: `/{z}/{x}/{y}.png?appid=9d33c3e69026b25a6cab7f300ec5e461`,
	};
	const layers = {
		clouds: "clouds_new",
		precip: "precipitation_new",
		pressure: "pressure_new",
		wind: "wind_new",
		temp: "temp_new",
	};
	const DisplayMap = () => {
		const map = useMap();
		console.log("map", map.getCenter());
		return null;
	};

	return (
		<MapContainer
			className='map'
			center={[props.weather?.lat! || 51.22, props.weather?.lon! || 0.22]}
			zoom={10}>
			<LayersControl position='topright'>
				<LayersControl.BaseLayer name='Satellite'>
					<TileLayer attribution={owmLink} url={mapTilerUrl} />
				</LayersControl.BaseLayer>
				<LayersControl.BaseLayer checked name='Street Maps'>
					<TileLayer attribution={owmLink} url={osmUrl} />
				</LayersControl.BaseLayer>
				<LayersControl.Overlay name='Wind'>
					<TileLayer attribution={owmLink} url={owmUrl.a + layers.wind + owmUrl.b} />
				</LayersControl.Overlay>
				<LayersControl.Overlay name='Clouds'>
					<TileLayer attribution={owmLink} url={owmUrl.a + layers.clouds + owmUrl.b} />
				</LayersControl.Overlay>
				<LayersControl.Overlay name='Rainfall'>
					<TileLayer attribution={owmLink} url={owmUrl.a + layers.precip + owmUrl.b} />
				</LayersControl.Overlay>
				<LayersControl.Overlay name='Pressure'>
					<TileLayer attribution={owmLink} url={owmUrl.a + layers.pressure + owmUrl.b} />
				</LayersControl.Overlay>
				<LayersControl.Overlay name='Temperature'>
					<TileLayer attribution={owmLink} url={owmUrl.a + layers.temp + owmUrl.b} />
				</LayersControl.Overlay>
				<DisplayMap />
			</LayersControl>
		</MapContainer>
	);
};

export default connect((s) => s)(Map);
