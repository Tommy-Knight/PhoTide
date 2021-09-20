export const backgroundAction = (payload: string) => {
	return {
		type: "BG_COLOR",
		payload,
	};
};

export const focusAction = (payload: string) => {
	return {
		type: "SWITCH_FOCUS",
		payload,
	};
};

export const searchAction = (payload: any) => {
	return {
		type: "SEARCH_VALUE",
		payload,
	};
};
