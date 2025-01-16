import './App.scss';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Favourites from './components/favourites';
import Maps from './components/maps';
import Mega from './components/mega';
import Photos from './components/photos';
import Profile from '../src/components/profile';
import React from 'react';
import Register from './components/register';
import Upload from './components/upload';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route
						path='/register'
						render={(routeProps: any) => <Register {...routeProps} />}
					/>
					<Route
						path='/'
						render={(routeProps: any) => <Mega {...routeProps} />}
						exact
					/>

					<Route
						path='/photos'
						render={(routeProps: any) => <Photos {...routeProps} />}
					/>
					<Route
						path='/favourites'
						render={(routeProps: any) => <Favourites {...routeProps} />}
					/>
					<Route
						path='/maps'
						render={(routeProps: any) => <Maps {...routeProps} />}
					/>
					<Route
						path='/profile'
						render={(routeProps: any) => <Profile {...routeProps} />}
					/>
					<Route
						path='/upload'
						render={(routeProps: any) => <Upload {...routeProps} />}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
