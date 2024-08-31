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

export { getItems };
