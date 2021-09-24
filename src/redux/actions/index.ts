import { UserInterface } from "../../types";
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

export const userAction = (user: UserInterface | null) => {
	return {
		type: "USER",
		payload: user,
	};
};