import { LoginType, Role } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  refresh_token: string | null;
  access_token: string | null;
  role: Role | null;
  first_login: boolean;
};

const initialState: AuthState = {
  access_token: null,
  refresh_token:null,
  role: null,
  first_login: false,
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
    setFirstLogin: (state, action) => {
      state.first_login = action.payload
    },
    setLogout: (_state) => initialState,
  },
});

export const { setAccessToken, setRole,setRefreshToken,setLogout ,setFirstLogin} = authSlice.actions;
export default authSlice.reducer;
