import { ActionCreatorWithOptionalPayload, ActionCreatorWithPayload, ActionCreatorWithoutPayload, Middleware } from "@reduxjs/toolkit";
import { setCookie } from "../../utils/cookie";
import { OrderListType, RefreshResponseWithTokenType, WsConnect } from "../../utils/prop-types";
import api from "../../utils/api";

type TWsActions = {
  wsConnect: ActionCreatorWithPayload<WsConnect>;
  wsDisconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithOptionalPayload<string | undefined>;
  wsMessage: ActionCreatorWithPayload<OrderListType>;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: number = 0;
    let isConnected: boolean = false;
    let wsUrl: string = "";
    let withTokenRefresh: boolean = false;
    return (next) => (action) => {
      const { dispatch } = store;
      const {
        wsConnect,
        wsDisconnect,
        wsConnecting,
        wsOpen,
        wsClose,
        wsError,
        wsMessage,
      } = wsActions;

      if (wsConnect.match(action)) {
        wsUrl = action.payload.wsUrl;
        withTokenRefresh = action.payload.withTokenRefresh;
        // Открыть соединение с WebSocket
        socket = new WebSocket(wsUrl);
        isConnected = true;
        dispatch(wsConnecting());

        // Обновить токен при необходимости
        if (withTokenRefresh) {
          api.refreshToken()
            .then((refreshData) => {
              const typedRefreshData = refreshData as RefreshResponseWithTokenType;
              console.log("refreshData", typedRefreshData);
              setCookie("refreshToken", typedRefreshData.refreshToken);
              setCookie("accessToken", typedRefreshData.accessToken);
              const newWsUrl = new URL(wsUrl);
              newWsUrl.searchParams.set(
                "token",
                typedRefreshData.accessToken.replace("Bearer ", "")
              );
              dispatch(
                wsConnect({
                  wsUrl: newWsUrl.href.toString(),
                  withTokenRefresh,
                })
              );
            })
            .catch((err) => {
              dispatch(wsError(err.message.toString()));
            });
        }
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsOpen());
        };
        socket.onerror = (event) => {
          console.log("socket.onerror", event);
        };
        socket.onclose = (event) => {
          if (event.code !== 1000) {
            console.log("socket.onclose error", event);
            dispatch(wsError(event.code.toString()));
          }
          if (isConnected && event.code !== 1000) {
            reconnectTimeout = window.setTimeout(() => {
              dispatch(wsConnect({ wsUrl, withTokenRefresh }));
            }, 3000);
          }
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch(wsMessage(parsedData));
        };
      }

      if (wsDisconnect.match(action) && socket) {
        clearTimeout(reconnectTimeout);
        isConnected = false;
        reconnectTimeout = 0;
        socket.close(1000, "Работа закончена");
        dispatch(wsClose());
      }
      next(action);
    };
  };
};
