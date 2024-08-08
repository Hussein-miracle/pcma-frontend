"use client";

import { createContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ApplicationFlowEnum } from "@/lib/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "@/rtk/app/store";
import { setAppFlowStatePersist } from "@/rtk/features/sp-slice/sp-slice";



interface ApplicationFlowContext {
  applicationFlowState: ApplicationFlowEnum;
   handleSetApplicationFlowState: (state: ApplicationFlowEnum) => void;
}

export const APPLICATION_INITIAL_STATE: ApplicationFlowContext = {
  applicationFlowState: ApplicationFlowEnum.VIEW_APPLICATIONS,
   handleSetApplicationFlowState: (_state: ApplicationFlowEnum) => {},
};

export const ApplicationFlowContext = createContext<ApplicationFlowContext>(
  APPLICATION_INITIAL_STATE
);

const ApplicationContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useDispatch();
  const persistedState = useSelector((state:AppRootState) => state.service_provider.appFlowStatePersist);
  const [applicationFlowState, setApplicationFlowState] =
    useState<ApplicationFlowEnum>( persistedState ??  ApplicationFlowEnum.VIEW_APPLICATIONS);


  const handleSetApplicationFlowState = (state: ApplicationFlowEnum) => {
    dispatch(setAppFlowStatePersist(state));
    setApplicationFlowState(state);
  }

  return (
    <ApplicationFlowContext.Provider
      value={{ applicationFlowState,  handleSetApplicationFlowState }}
    >
       {children}
    </ApplicationFlowContext.Provider>
  );
};

export default ApplicationContextProvider;
