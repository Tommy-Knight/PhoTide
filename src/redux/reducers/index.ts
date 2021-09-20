import { initialState } from "../store";

const rootReducer = (
	state = initialState,
	action: { type: string; payload: any }
) => {
	switch (action.type) {
		case "BG_COLOR":
			return { ...state, background: action.payload };
		case "SWITCH_FOCUS":
			return { ...state, focus: action.payload}
			case "SEARCH_VALUE":
				return{...state, searchValue: action.payload}
		default:
			return state;
	}
};

export default rootReducer;
