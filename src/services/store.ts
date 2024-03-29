
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import {TypedUseSelectorHook, useDispatch as useDispatchRedux, useSelector as useSelectorRedux} from "react-redux";
import { wsCloseFeed, wsConnectFeed, wsConnectingFeed, wsDisconnectFeed, wsErrorFeed, wsMessageFeed, wsOpenFeed} from "./feed/action";
import { wsCloseOrder, wsConnectOrder, wsConnectingOrder, wsDisconnectOrder, wsErrorOrder, wsMessageOrder, wsOpenOrder} from "./all-orders/action";
import { socketMiddleware } from "./mddleware/socket";
import api  from '../utils/api';


const wsActionsFeed = { wsConnect: wsConnectFeed,  wsDisconnect: wsDisconnectFeed, wsConnecting: wsConnectingFeed, wsOpen: wsOpenFeed, wsClose: wsCloseFeed, wsMessage: wsMessageFeed, wsError: wsErrorFeed};

const wsActionsOrder = { wsConnect: wsConnectOrder, wsDisconnect: wsDisconnectOrder, wsConnecting: wsConnectingOrder, wsOpen: wsOpenOrder, wsClose: wsCloseOrder, wsMessage: wsMessageOrder, wsError: wsErrorOrder};

const webSocketOrderMiddleware = socketMiddleware(wsActionsOrder);
const webSocketFeedMiddleware = socketMiddleware(wsActionsFeed);



export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(webSocketOrderMiddleware, webSocketFeedMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux;






