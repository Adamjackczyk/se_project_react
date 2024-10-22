// src/utils/auth.js

import { request } from "./api";

/**
 * Registers a new user.
 *
 * @param {string} name - The name of the user.
 * @param {string} avatar - The URL of the user's avatar.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise} - Resolves with the server response or rejects with an error.
 */
export const signup = (name, avatar, email, password) => {
  return request("http://localhost:3001/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

/**
 * Authorizes an existing user.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise} - Resolves with the server response containing the JWT token or rejects with an error.
 */
export const signin = (email, password) => {
  return request("http://localhost:3001/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

/**
 * Fetches the current user's data using the JWT token.
 *
 * @param {string} token - The JWT token.
 * @returns {Promise} - Resolves with the current user data or rejects with an error.
 */
export const getCurrentUser = (token) => {
  return request("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
