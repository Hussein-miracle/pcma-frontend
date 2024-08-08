import { ApplicationFlowEnum } from "@/lib/constants";
import { ApplicationDetails } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";



type SpState = {
  latestApplicationCreated: ApplicationDetails | null;
  appFlowStatePersist:ApplicationFlowEnum | null;
};

const initialState: SpState = {
  latestApplicationCreated: null,
  appFlowStatePersist:null
};

export const spSlice = createSlice({
  name: "spSlice",
  initialState,
  reducers: {
    setAppFlowStatePersist: (state, action) => {
      state.appFlowStatePersist = action.payload;
    }
    ,
    setLatestApplicationCreated: (state, action) => {
      state.latestApplicationCreated = action.payload;
    },
    resetSpState: (_state) => initialState,
  },
});

export const { setLatestApplicationCreated,resetSpState,setAppFlowStatePersist} = spSlice.actions;
export default spSlice.reducer;
