import React from 'react';
import './index.css';
import App from './App';
import { Provider } from "react-redux";

import ReactDOM from "react-dom";
import configureStore from "./redux/store";

ReactDOM.render(
	<Provider store={configureStore()}>
		<App />
	</Provider>,
	document.getElementById("root")
);
