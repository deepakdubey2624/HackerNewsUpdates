import React, { Component } from 'react';
import { Route,Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';
import Home from './components/Home';

class App extends Component {
  render() {
    return (
      <div className="container">
          <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/home" exact={true} component={Home} />
        <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}

export default App;