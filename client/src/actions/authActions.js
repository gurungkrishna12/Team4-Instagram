import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from '../utils/setAuthtoken';
import jwt_decode from 'jwt-decode';

//After rigistering history.push will send us to '/login'
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
}

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      //save the token to localstorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token
      const decoded = jwt_decode(token);
      //Write user info to redux
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}

export const logoutUser = () => dispatch => {
  //Remove token from ls
  localStorage.removeItem('jwtToken');
  //Remove token from axios header
  setAuthToken(false);
  //Reset user in the redux store
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
}