import React from "react";
import "./App.scss";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Mega from "./components/Mega";
import Register from "./components/register";
import Photos from "./components/photos";
import Favourites from "./favourites";
import Profile from "../src/components/profile";
import Maps from "./components/maps";

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path='/' render={(routeProps: any) => <Mega {...routeProps} />} exact />
					<Route path='/register' render={(routeProps: any) => <Register {...routeProps} />} />
					<Route path='/photos' render={(routeProps: any) => <Photos {...routeProps} />} />
					<Route path='/favourites' render={(routeProps: any) => <Favourites {...routeProps} />} />
					<Route path='/maps' render={(routeProps: any) => <Maps {...routeProps} />} />
					<Route path='/profile' render={(routeProps: any) => <Profile {...routeProps} />} />
				</Switch>
			</Router>
		);
	}
}

export default App;
