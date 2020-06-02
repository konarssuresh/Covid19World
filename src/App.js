import React from 'react';
import logo from './logo.svg';
import Navbar from "./Components/Navbar/Navbar";
import './App.css';
import Dashboard from './Containers/Dashboard/Dashboard';
import CountryStats from "./Containers/CountryStats/CountryStats"
import {Switch,Route,Redirect} from 'react-router-dom';
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/stats" component={CountryStats}/>
        <Redirect from="/" to="/dashboard"/>
        <Redirect to="/"/>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
