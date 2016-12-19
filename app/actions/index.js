import axios from 'axios';
import {
  FETCH_USERS
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
