import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStatePops = {
  isSearching?: boolean;
  status?: number;
  data: GroupStateProps[];
  debounce?: string;
};

const initialState: InitialStatePops = {
  isSearching: false,
  status: undefined,
  data: [],
  debounce: "",
};

export const Search = createSlice({
  name: "search",
  initialState,
  reducers: {
    onSearch: (state, action: PayloadAction<InitialStatePops>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    onReset: (state) => {
      return {
        ...state,
        ...initialState,
      };
    },
  },
});

export const { onSearch, onReset } = Search.actions;

export default Search.reducer;
