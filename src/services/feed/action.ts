import { createAction } from "@reduxjs/toolkit";
import { OrderListType, WsConnect } from "../../utils/prop-types";

export const wsConnectFeed = createAction<WsConnect>("WS_CONNECT_FEED");
export const wsDisconnectFeed = createAction("WS_DISCONNECT_FEED");
export const wsConnectingFeed = createAction("WS_CONNECTING_FEED");
export const wsOpenFeed = createAction("WS_OPEN_FEED");
export const wsCloseFeed = createAction("WS_CLOSE_FEED");
export const wsMessageFeed = createAction<OrderListType>("WS_MESSAGE_FEED");
export const wsErrorFeed = createAction<string | undefined>("WS_ERROR_FEED");
