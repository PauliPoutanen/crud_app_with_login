import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  if (props.isLogged) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand" style={{ marginLeft: 10 }}>
        </p>
        <ul className="navbar-nav">
          <li className="nav-item" style={{ marginLeft: 10 }}>
            <Link to="/list" className="nav-link">Tapahtumalista</Link>
          </li>
          <li className="nav-item" style={{ marginLeft: 10 }}>
            <Link to="/admin" className="nav-link">Admin</Link>
          </li>
          <li className="nav-item" style={{ marginLeft: 10 }}>
            <Link to="/form" className="nav-link">Ilmoita huutokauppa</Link>
          </li>
          <li className="nav-item" style={{ marginLeft: 10 }}>
            <p className="nav-link" style={{ color: "blue" }}>Kirjautunut: {props.user}</p>
					<Link to="/" className="nav-link" onClick={props.logout}>Kirjaudu ulos</Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="navbar navbar-dark bg-info">
        <p className="navbar-brand" style={{ marginLeft: 10 }}>
        </p>
        <ul className="navbar-nav"></ul>
      </nav>
    );
  }
}

export default Navbar;