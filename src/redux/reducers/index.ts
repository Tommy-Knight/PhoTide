import { initialState } from "../store";

const rootReducer = (
	state = initialState,
	action: { type: string; payload: string }
) => {
	switch (action.type) {
		case "BG_COLOR":
			return { ...state, background: action.payload };

		// case "SELECTED_MEMBERS":
		// 	const membersArray = [...state.selectedMembers];
		// 	const combineArrays = membersArray.concat(action.payload);
		// 	const newArray = combineArrays.filter((item, pos) => combineArrays.indexOf(item) === pos);
		// 	// console.log("🎃", membersArray, "🎪", newArray);
		// 	return { ...state, selectedMembers: newArray };
		// case "CLEAR_SELECTED_MEMBERS":
		// 	return { ...state, selectedMembers: [] };
		// case "REFRESH":
		// 	return {
		// 		...state,
		// 		refresher: Math.random(),
		// 	};
		default:
			return state;
	}
};

export default rootReducer;
