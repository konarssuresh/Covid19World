import React from 'react';
import {NavLink,withRouter} from 'react-router-dom';


const navbar = props =>(
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

  <NavLink to="/" className="navbar-brand"  href="#">
      <img src={require("../../assets/images/covid-icon.ico")} style={{width:'30px',height:'30px'}} alt=""/> Covid19World</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/stats">Country Stats</NavLink>
      </li>
    </ul>
  </div>
</nav>
);


export default withRouter(navbar);