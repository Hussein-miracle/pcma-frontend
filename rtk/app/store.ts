"use client";
import {
  Dispatch,
  Middleware,
  combineReducers,
  configureStore,
  UnknownAction,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';


import authSliceReducer from '../features/auth-slice/auth-slice';


const middlewares: Middleware<{}, any, Dispatch<UnknownAction>>[] = [];

// const logger = createLogger();

if (process.env.NODE_ENV === 'development') {
  // middlewares.push(logger);
}

const persistConfig = {
  key: 'root',

  storage,
};

const rootReducer = combineReducers({
  auth: authSliceReducer,
});
const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false }).concat(
      ...middlewares
    );
  },
  devTools: process.env.NODE_ENV === 'development' ? true : false,
});

export const persistedStore = persistStore(store);

export type AppStoreType = ReturnType<typeof configureStore>;
export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
