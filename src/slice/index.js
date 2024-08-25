import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenToStore: (state, { payload }) => {
      return {
        ...state,
        token: payload,
      };
    },
    resetAuthStore: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTokenToStore, resetAuthStore } = authSlice.actions;
export default authSlice.reducer;
