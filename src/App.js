import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import Laptop from './pages/Laptop';
import Handphone from './pages/Handphone';
import Aksesoris from './pages/Aksesoris';
import Register from './pages/Register';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Route path="/register" component={Register} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/laptop" component={Laptop} />
          <Route path="/handphone" component={Handphone} />
          <Route path="/aksesoris" component={Aksesoris} />
          <Route path="/allproducts" component={Home} />
          <Route path="/" component={Login} exact/>
      </div>
    )
  }
}

export default App