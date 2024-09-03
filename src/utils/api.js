const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error fetching items: ${response.statusText}`);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function addItem(newItem) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error adding item: ${response.statusText}`);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error deleting item: ${response.statusText}`);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
