import { LoginType, Role } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  refresh_token: string | null;
  access_token: string | null;
  role: Role | null;
};

const initialState: AuthState = {
  access_token: null,
  refresh_token:null,
  role: null,
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
      state.role = action.payload;
    },
  },
});

export const { setAccessToken, setRole,setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
