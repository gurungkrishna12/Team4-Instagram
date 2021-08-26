import { GET_ERRORS, SET_CURRENT_USER } from './types'
import axios from 'axios';
import setAuthtoken from '../utils/setAuthtoken';
import jwt_decode from 'jwt-decode';

//Register user
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

//Login user
export const loginUser = userData => dispatch =>{
  axios
  .post('/api/users/login', userData)
  .then(res => {
    //sae token to the localstorage
    const {token} =res.data;
    localStorage.setItem('jwtToken', token);

    //set token to the auth header
    setAuthtoken(token);

    //decode the token 
    const decoded =jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    })
  })
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    }));  
}
export const logoutUser = () => dispatch =>{
  //remove from localStorage
  localStorage.removeItem('jwtToken');

  //remove auth header
  setAuthtoken(false);

  //clear out the user data from the redux store 
  dispatch({
    type: SET_CURRENT_USER,
    payload:{}
  })
}