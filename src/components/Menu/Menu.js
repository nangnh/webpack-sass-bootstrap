import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";

const menus = [
	{
		label: 'Trang Chủ',
		to: '/',
		exact: true
	},
	{
		label: 'Quản Lý Sản Phẩm',
		to: '/products',
		exact: false
	}
]

const MenuLink = ({label, to, activeOnlyWhenExact}) => {
	return (
		<Route
			path={to}
			exact={activeOnlyWhenExact}
			children={({ match }) => {
				const active = match ? 'active' : ''
				return (
					<li className={active}>
						<Link to={to}>
							{label}
						</Link>
					</li>
				)
			}}
		/>
	)
}

class Menu extends Component {
	render() {
		return (
			<nav className="navbar navbar-default">
				<a className="navbar-brand" href="#/">CALL API</a>
				<ul className="nav navbar-nav">
					{this.showMenu(menus)}
				</ul>
			</nav>
		)
	}

	showMenu = (menus) => {
		let result = null
		if (menus.length > 0) {
			result = menus.map((menu, index) => {
				return (
					<MenuLink
						key={index}
						label={menu.label}
						to={menu.to}
						activeOnlyWhenExact={menu.exact}
					/>
				)
			})
		}
		return result
	}
}

export default Menu;
