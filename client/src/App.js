import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthtoken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from './actions/types';
import { logoutUser } from './actions/authActions';


if (localStorage.jwtToken){
  //decode token 
  const decoded = jwt_decode(localStorage.jwtToken);
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href='/login';
  } else {
    //set token to auth header 
    setAuthToken(localStorage.jwtToken);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  }
}
class App extends Component {

  render() {
    return(
      <Provider store={store} >
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Footer />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;