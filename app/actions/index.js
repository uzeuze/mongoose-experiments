import axios from 'axios';
import {
  FETCH_USERS,
  FETCH_USER,
  CLEAR_USER
} from './types';

const API_URL = "http://localhost:8080/api";

export function fetchUsers() {
  return function(dispatch) {
    axios.get(`${API_URL}/users`)
      .then(response => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      });
  }
}

export function fetchUser(userId) {
  return function(dispatch) {
    axios.get(`${API_URL}/users/${userId}/boards`)
      .then(response => {
        dispatch({
          type: FETCH_USER,
          payload: response.data
        });
      });
  }
}

export function clearUser() {
  return function(dispatch) {
    dispatch({
      type: CLEAR_USER
    });
  }
}
