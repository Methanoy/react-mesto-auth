import { BASE_URL, handleResponse } from './utils';

export const register = (email, password) => fetch(`${BASE_URL}/signup`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
  }),
}).then(handleResponse);

export const login = (email, password) => fetch(`${BASE_URL}/signin`, {
  method: 'POST',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email,
    password,
  }),
}).then(handleResponse);

export const logout = () => fetch(`${BASE_URL}/signout`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(handleResponse);

export const checkToken = () => fetch(`${BASE_URL}/users/me`, {
  method: 'GET',
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
}).then(handleResponse);
