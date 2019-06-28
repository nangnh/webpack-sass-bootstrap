import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css'
import Menu from "./../Menu/Menu";
import {routes} from './../../routes'

class App extends Component {
	render() {
		return (
			<Router>
				<Menu/>
				<div className={"container"}>
					<div className="row">
						<Switch>
							{this.showContentRoutes(routes)}
						</Switch>
					</div>
				</div>
			</Router>
		)
	}

	showContentRoutes = (routes) => {
		let result = null

		if (routes.length > 0) {
			result = routes.map((route, index) => {
				return (
					<Route
						key={index}
						path={route.path}
						exact={route.exact}
						component={route.main}
					/>
				)
			})
		}
		return result
	}
}

export default App;
