import { applyMiddleware, compose, createStore } from "redux";

import rootReducer from "../reducers/index";
import thunk from "redux-thunk";

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
	background: "dawn"
};

const configureStore = () =>
	createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

export default configureStore;
