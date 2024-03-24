import { getCookie, setCookie } from "./cookie";
// import { GetOrderType } from "./prop-types";
const mainUrl = "https://norma.nomoreparties.space/api";

// import { getCookie, setCookie } from "./cookie";

function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

function request(endpoint: string, options: RequestInit = {}): Promise<any> {
  return fetch(`${mainUrl}${endpoint}`, options).then(checkResponse);
}

function getIngredients(): Promise<any> {
  return request("/ingredients");
}

function createOrder(ingredients: string): Promise<any> {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ingredients),
  });
}

async function refreshToken(): Promise<any> {
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

async function requestWithRefresh(endpoint: string, options: RequestInit = {}): Promise<any> {
  // Функция для выполнения запросов с обновлением токена
  try {
    const res = await request(endpoint, options); // Выполняем запрос к API
    return res; // Возвращаем результат запроса
  } catch (error) {
    // Обрабатываем ошибки
    console.log("requestWithRefresh");
    if (
      (error as any).statusCode === 401 ||
      (error as any).statusCode === 403
    ) {
      // Если получена ошибка авторизации или доступа
      try {
        const refreshData = await refreshToken(); // Обновляем токен
        if (!refreshData.success) {
          // Если обновление токена неуспешно
          return Promise.reject(refreshData);
        }
        setCookie("accessToken", refreshData.accessToken); // Устанавливаем новый accessToken в cookie
        setCookie("refreshToken", refreshData.refreshToken); // Устанавливаем новый refreshToken в cookie
        return await request(endpoint, {
          // Повторно выполняем исходный запрос с обновленным токеном
          ...options,
          headers: {
            ...options.headers,
            authorization: refreshData.accessToken, // Устанавливаем заголовок авторизации с новым accessToken
          },
        });
      } catch (error) {
        throw error;
      }
    }
    throw error;
  }
}

function getRegisterUser(data: {email: string; password: string; name: string;}): Promise<any> {
  return request("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getLoginUser(data: { email: string; password: string }): Promise<any> {
  return requestWithRefresh("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function getUser(): Promise<any> {
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

function forgotPassword(email: string): Promise<any> {
  return request("/password-reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

function resetPassword(data: {password: string; token: string;}): Promise<any> {
  return request("/password-reset/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function updateProfile(data: {email: string; name: string; password: string;}): Promise<any> {
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

function logoutUser(): Promise<any> {
  return request("/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: getCookie("refreshToken") }),
  });
}



export { getIngredients, createOrder, refreshToken, requestWithRefresh, getRegisterUser, getLoginUser, getUser, forgotPassword, resetPassword, updateProfile, logoutUser, };


