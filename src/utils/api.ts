import { getCookie, setCookie } from "./cookie";
import { GetOrderType } from "./prop-types";

export class Api {
  public readonly baseUrl = "https://norma.nomoreparties.space/api";

  private checkResponse<T>(res: Response): Promise<T> {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((errorData) => {
      throw new Error(`Ошибка ${res.status}: ${errorData.message}`);
    });
  }

  public async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(this.baseUrl + endpoint, options);
    return this.checkResponse(response);
  }

  public async refreshToken(): Promise<any> {
    // Функция для обновления токена
    try {
      const refreshToken = getCookie("refreshToken"); // Получаем refreshToken из cookie
      const res = await this.request(`${this.baseUrl}auth/token`, {
        // Выполняем запрос к API для обновления токена
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

  public async requestWithRefresh(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<any> {
    // Функция для выполнения запросов с обновлением токена
    try {
      const res = await this.request(endpoint, options); // Выполняем запрос к API
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
          const refreshData = await this.refreshToken(); // Обновляем токен
          if (!refreshData.success) {
            // Если обновление токена неуспешно
            return Promise.reject(refreshData);
          }
          setCookie("accessToken", refreshData.accessToken); // Устанавливаем новый accessToken в cookie
          setCookie("refreshToken", refreshData.refreshToken); // Устанавливаем новый refreshToken в cookie
          return await this.request(endpoint, {
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

  public async getIngredients(): Promise<any> {
    return this.request("/ingredients");
  }

  public async createOrder(ingredients: string): Promise<any> {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("Токен не найден");
    }
    return this.request("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      } as HeadersInit,
      body: JSON.stringify(ingredients),
    });
  }

  public async getOrder(orderNumber: string) {
    return this.request<GetOrderType>(`/orders/${orderNumber}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      } as HeadersInit,
    });
  }

  public async getRegisterUser(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<any> {
    return this.request("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async getLoginUser(data: {
    email: string;
    password: string;
  }): Promise<any> {
    return this.requestWithRefresh("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async getUser(): Promise<any> {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("Токен не найден");
    }
    return this.requestWithRefresh("/auth/user", {
      method: "GET",
      credentials: "omit",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
    });
  }

  public async forgotPassword(email: string): Promise<any> {
    return this.request("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }

  public async resetPassword(data: {
    password: string;
    token: string;
  }): Promise<any> {
    return this.request("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  public async updateProfile(data: {
    email: string;
    name: string;
    password: string;
  }): Promise<any> {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      throw new Error("Токен не найден");
    }
    return this.requestWithRefresh("/auth/user", {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        authorization: accessToken,
      },
      body: JSON.stringify(data),
    });
  }

  public async logoutUser(): Promise<any> {
    return this.request("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: getCookie("refreshToken") }),
    });
  }
}


// export { getIngredients, createOrder, refreshToken, requestWithRefresh, getRegisterUser, getLoginUser, getUser, forgotPassword, resetPassword, updateProfile, logoutUser, getOrder};


// export const api = { getIngredients, createOrder, refreshToken, requestWithRefresh, getRegisterUser, getLoginUser, getUser, forgotPassword, resetPassword, updateProfile, logoutUser, getOrder};

const api = new Api();
export default api;
