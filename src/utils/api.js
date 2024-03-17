import { getCookie, setCookie } from "./cookie";
const mainUrl = "https://norma.nomoreparties.space/api";

// import { getCookie, setCookie } from "./cookie";

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

async function refreshToken() {
  // Функция для обновления токена
  try {
    const refreshToken = getCookie("refreshToken"); // Получаем refreshToken из cookie
    const res = await request("auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: refreshToken }), // Передаем refreshToken в теле запроса
    });
    return res;
  } catch (error) {
    throw error;
  }
}

async function requestWithRefresh(endpoint, options = {}) {
  // Функция для выполнения запросов с обновлением токена
  try {
    const res = await request(endpoint, options);
    return res;
  } catch (error) {
    // Обрабатываем ошибки
    console.log("requestWithRefresh");
    if (error.statusCode === 401 || error.statusCode === 403) {
      try {
        const refreshData = await this.refreshToken();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        setCookie("accessToken", refreshData.accessToken);
        setCookie("refreshToken", refreshData.refreshToken);
        return await request(endpoint, {

          ...options,
          headers: {
            ...options.headers,
            authorization: refreshData.accessToken,
          },
        });
      } catch (error) {
        throw error;
      }
    }
    throw error;
  }
}

function getRegisterUser(data) {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getLoginUser(data) {
  return requestWithRefresh("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getUser() {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    throw new Error("Токен не найден");
  }
  return requestWithRefresh("/auth/user", {
    method: "GET",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
  });
}

function forgotPassword(email) {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

function resetPassword(data) {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function updateProfile(data) {
  const accessToken = getCookie("accessToken");
  if (!accessToken) {
    throw new Error("Токен не найден");
  }
  return requestWithRefresh("/auth/user", {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(data),
  });
}

function logoutUser() {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
}



export { getIngredients, createOrder, refreshToken, requestWithRefresh, getRegisterUser, getLoginUser, getUser, forgotPassword, resetPassword, updateProfile, logoutUser };


