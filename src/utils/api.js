const baseUrl = "http://localhost:3001";
// const headers = { "Content-Type": "application/json" };

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .catch((error) => {
      console.log(error);
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
      throw new Error(response.statusText);
    })
    .catch((error) => {
      console.error("Error adding item:", error);
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
      throw new Error(response.statusText);
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
      throw error;
    });
}

export { getItems };
