import { initialState } from "../store";

const rootReducer = (state = initialState, action: { type: string; payload: any }) => {
	switch (action.type) {
		case "USER":
			return { ...state, user: action.payload };
		case "BG_COLOR":
			return { ...state, background: action.payload };
		case "SWITCH_FOCUS":
			return { ...state, focus: action.payload };
		case "SEARCH_VALUE":
			return { ...state, searchValue: action.payload };
		case "WEATHER":
			return { ...state, weather: action.payload };
		case "FORECAST":
			return { ...state, forecast: action.payload };
		case "PHOTO":
			if (state.photos[0].images.length === 0) return { ...state, photos: [action.payload] };
			else return { ...state, photos: [...state.photos, action.payload] };
		case "INDEX":
			let newArray = state.photos;
			newArray.splice(action.payload, 1);
			return { ...state, photos: newArray };
		case "COORDS":
			return { ...state, forecast: action.payload.forecast, weather: action.payload.weather };

		default:
			return state;
	}
};

export default rootReducer;
