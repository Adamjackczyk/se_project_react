import { baseUrl } from "./constants";

// const baseUrl = "http://localhost:3001";

/**
 * Checks the response from a fetch request.
 *
 * @param {Response} res - The response object from fetch.
 * @returns {Promise} - Resolves with the JSON data if the response is ok, otherwise rejects with an error message.
 */
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}: ${res.statusText}`);
}

/**
 * Makes a fetch request to the specified URL with the given options.
 *
 * @param {string} url - The endpoint URL.
 * @param {object} options - The fetch options (method, headers, body, etc.).
 * @returns {Promise} - Resolves with the JSON data or rejects with an error.
 */
export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

/**
 * Retrieves all clothing items.
 * This request does not require authentication.
 *
 * @returns {Promise} - Resolves with the list of clothing items.
 */
export function getItems() {
  return request(`${baseUrl}/items`);
}

/**
 * Adds a new clothing item.
 * This request requires authentication.
 *
 * @param {object} newItem - The clothing item data to add.
 * @param {string} token - The JWT token for authorization.
 * @returns {Promise} - Resolves with the created clothing item.
 */
export function addItem(newItem, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include JWT token in headers
    },
    body: JSON.stringify(newItem),
  });
}

/**
 * Deletes a clothing item by ID.
 * This request requires authentication.
 *
 * @param {string} id - The ID of the clothing item to delete.
 * @param {string} token - The JWT token for authorization.
 * @returns {Promise} - Resolves with the server response.
 */
export function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Include JWT token in headers
    },
  });
}

/**
 * Adds a like to a clothing item.
 * This request requires authentication.
 *
 * @param {string} id - The ID of the clothing item to like.
 * @param {string} token - The JWT token for authorization.
 * @returns {Promise} - Resolves with the updated clothing item.
 */
export function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include JWT token in headers
    },
  });
}

/**
 * Removes a like from a clothing item.
 * This request requires authentication.
 *
 * @param {string} id - The ID of the clothing item to unlike.
 * @param {string} token - The JWT token for authorization.
 * @returns {Promise} - Resolves with the updated clothing item.
 */
export function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // Include JWT token in headers
    },
  });
}

/**
 * Updates the current user's profile.
 *
 * @param {object} data - The updated user data (name and avatar).
 * @returns {Promise} - Resolves with the updated user data.
 */
export function updateUserProfile({ name, avatar }) {
  const token = localStorage.getItem("jwt"); // Retrieve JWT token from localStorage

  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include JWT token in headers
    },
    body: JSON.stringify({ name, avatar }),
  });
}
