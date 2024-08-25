import { createSlice } from "@reduxjs/toolkit";



type UserSliceState = {
  basic_pii_saved:boolean;
  personal_pii_saved:boolean;
};

const initialState: UserSliceState = {
  basic_pii_saved:false,
  personal_pii_saved:false,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setBasicPiiSaved: (state, action) => {
      state.basic_pii_saved = action.payload;
    },
    setPersonalPiiSaved: (state, action) => {
      state.personal_pii_saved = action.payload;
    },
    resetUserState: (_state) => initialState,
  },
});

export const {setBasicPiiSaved,setPersonalPiiSaved,resetUserState} = userSlice.actions;
export default userSlice.reducer;
