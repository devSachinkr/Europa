/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InfiniteScrollState {
  data: unknown[];
}

const initialState: InfiniteScrollState = {
  data: [],
};

export const infiniteScrollSlice = createSlice({
  name: "infiniteScroll",
  initialState,
  reducers: {
    onInfiniteScroll: (state, action: PayloadAction<InfiniteScrollState>) => {
      const list = state.data.find((item: any) =>
        action.payload.data.find((data: any) => data.id === item.id),
      );
      if (!list) {
        state.data = [...state.data, ...action.payload.data];
      }
    },
    onClearList: (state, action: PayloadAction<InfiniteScrollState>) => {
      state.data = action.payload.data;
    },
  },
});

export const { onInfiniteScroll, onClearList } = infiniteScrollSlice.actions;

export default infiniteScrollSlice.reducer;
