import { LoginType } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  refresh_token: string | null;
  access_token: string | null;
  user_role: LoginType | null;
};

const initialState: AuthState = {
  access_token: null,
  refresh_token:null,
  user_role: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.access_token = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refresh_token = action.payload;
    },
    setRole: (state, action) => {
      state.user_role = action.payload;
    },
  },
});

export const { setAccessToken, setRole,setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
