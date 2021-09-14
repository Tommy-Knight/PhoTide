// import { UserInterface } from "../../types";

export const backgroundAction = (payload:any) => {
	return {
		type: "BG_COLOR",
		payload,
	};
};

// export const allUsersAction = (allUsers: UserInterface[]) => {
// 	return {
// 		type: "ALL_USERS",
// 		payload: allUsers,
// 	};
// };

// export const myRoomsAction = (myRooms: any) => {
// 	return {
// 		type: "MY_ROOMS",
// 		payload: myRooms,
// 	};
// };
// export const selectedMembersAction = (selectedMembers: any) => {
// 	return {
// 		type: "SELECTED_MEMBERS",
// 		payload: selectedMembers,
// 	};
// };

// export const clearSelectedMembersAction = () => {
// 	return {
// 		type: "CLEAR_SELECTED_MEMBERS",
// 	};
// };

// export const selectedRoomAction = (selectedRoom: any) => {
// 	return {
// 		type: "SELECTED_ROOM",
// 		payload: selectedRoom,
// 	};
// };
// export const refresh = () => ({
// 	type: "REFRESH",
// });