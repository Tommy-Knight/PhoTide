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
			return { ...state, photos: [action.payload] };
		default:
			return state;
	}
};

export default rootReducer;
