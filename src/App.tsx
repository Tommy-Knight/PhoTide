import "./App.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Home from "./components/Home";
import React from "react";
import {Splash} from "./components/splash";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					
					<Route path='/splash' render={(routeProps: any) => <Splash {...routeProps} />} />

					<Route path='/' render={(routeProps: any) => <Home {...routeProps} />} />
				</Switch>
			</Router>
		);
	}
}

export default App;