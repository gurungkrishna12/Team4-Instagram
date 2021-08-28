import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';


import './App.css';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
import setAuthToken from './utils/setAuthtoken';
import { SET_USER } from './actions/types';
import { logoutUser } from './actions/authActions';

//Storing Token to the localStore or login out and redirecting to login
if (localStorage.jwtToken){
  //decode token 
  const decoded = jwt_decode(localStorage.jwtToken);
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Expired Logout User
    store.dispatch(logoutUser())
    //Redirect User to "/login"
    window.location.href='/login';
  } else {
    //set token to auth header 
    setAuthToken(localStorage.jwtToken);
    store.dispatch({
      type: SET_USER,
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