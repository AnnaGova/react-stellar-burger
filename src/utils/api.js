const mainUrl = "https://norma.nomoreparties.space/api";

function checkResponse(res) {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${mainUrl}${endpoint}`, options).then(checkResponse);
}

function getIngredients() {
  return request("/ingredients");
}

function createOrder(ingredients) {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredients),
  });
}

export { getIngredients, createOrder };


