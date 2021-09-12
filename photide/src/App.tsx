import "./style/App.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./components/App";
import React from "react";
import {Splash} from "./components/Splash";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					
					<Route path='/home' render={(routeProps: any) => <Home {...routeProps} />} />

					<Route path='/' render={(routeProps: any) => <Splash {...routeProps} />} />
				</Switch>
			</Router>
		);
	}
}

export default App;
