import React from 'react';
import logo from '../../logo-cyf.png';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
	<nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light fixed-top">
		<a className="navbar-brand">
			<img src={logo} alt="logo" width="170" />
		</a>
	</nav>
);

export default Navbar;