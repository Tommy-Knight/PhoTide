import "./App.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Mega from "./components/Mega";
import React from "react";
import {Splash} from "./components/splash";
import Photos from "./components/photos"
// import Register from "./components/register"
import Maps from "./components/maps"

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/photos' render={(routeProps: any) => <Photos {...routeProps} />} />
					{/* <Route path='/register' render={(routeProps: any) => <Register {...routeProps} />} /> */}
					<Route path='/maps' render={(routeProps: any) => <Maps {...routeProps} />} />

					<Route path='/splash' render={(routeProps: any) => <Splash {...routeProps} />} />

					<Route path='/' render={(routeProps: any) => <Mega {...routeProps} />} />
				</Switch>
			</Router>
		);
	}
}

export default App;
