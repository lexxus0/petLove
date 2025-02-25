import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import newsReducer from "./news/slice";
import friendsReducer from "./friends/slice";
import noticesReducer from "./notices/slice";
import { authReducer } from "./auth/slice";
import { filterReducer } from "./filter/slice";

const newsPersistConfig = {
  key: "news",
  storage,
};
const friendsPersisterConfig = {
  key: "friends",
  storage,
};
const noticesPersisterConfig = {
  key: "notices",
  storage,
};
const authPersisterConfig = {
  key: "auth",
  storage,
};
const filterPersisterConfig = {
  key: "filter",
  storage,
};

export const store = configureStore({
  reducer: {
    news: persistReducer(newsPersistConfig, newsReducer),
    friends: persistReducer(friendsPersisterConfig, friendsReducer),
    notices: persistReducer(noticesPersisterConfig, noticesReducer),
    auth: persistReducer(authPersisterConfig, authReducer),
    filter: persistReducer(filterPersisterConfig, filterReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
