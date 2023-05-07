import { configureStore, createSlice } from "@reduxjs/toolkit";
import { IPost, IUser } from "../lib/types";
import { persistStore, persistReducer } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "reduxjs-toolkit-persist";
import storage from "redux-persist/lib/storage";

const initialState = {
  mode: "light",
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.user.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { store, persistor };
export const { setMode, setLogin, setLogout } = authSlice.actions;
