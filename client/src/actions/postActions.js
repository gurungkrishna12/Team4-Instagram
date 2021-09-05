import axios from 'axios';

import {
  ADD_POST,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  ADD_IMAGE
} from './types';

///Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios.post('/api/posts', postData)
  .then(res => dispatch({
    type: ADD_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
};

///////////////////////////////////////////////////
/// Add images 
export const postImage = (image, history) => dispatch => {
  dispatch(setPostLoading())
  axios.post('/api/post', image)
  .then(res => history.push('/dashboard'))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

//Get Posts
export const getPosts = (id) => dispatch => {
  dispatch(setPostLoading());
  axios.get(`/api/posts${id}`)
  .then(res => dispatch({
      type: GET_POSTS,
      payload: null
    }));
};

//Delete Posts
export const deletePosts = (id) => dispatch => {
  axios.delete(`/api/posts${id}`)
  .then(res => dispatch({
    type: DELETE_POST,
    payload: id
  })
  )
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

//Add Like
export const addLike = (id) => dispatch => {
  axios.post(`/api/posts/like${id}`)
  .then(res => dispatch(getPosts()))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

//Unlike
export const removeLike = (id) => dispatch => {
  axios.post(`/api/posts/unlike${id}`)
  .then(res => dispatch(getPosts()))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};


// set Loading State
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
};

//Add Comment
export const addComment = (postId, commentData) => dispatch => {
  axios.post(`/api/posts/comment/${postId}`)
  .then(res => dispatch({
    type: GET_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};

//Delete Comment
export const delteComment = (postId, commentId) => dispatch => {
  axios.delete(`/api/posts/comment/${postId}/${commentId}`)
  .then(res => dispatch({
    type: GET_POST,
    payload: res.data
  }))
  .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
};


// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};