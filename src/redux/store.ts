//this is our redux store
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { OnlineTracking } from "./slices/online-member";
import { Search } from "./slices/search";
import { infiniteScrollSlice } from "./slices/infinite-scroll";

const rootReducer = combineReducers({
  online: OnlineTracking.reducer,
  search: Search.reducer,
  infiniteScroll: infiniteScrollSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

//we export these type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//this useAppSelector has type definitions added
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
