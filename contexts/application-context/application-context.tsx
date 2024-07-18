"use client";

import { createContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ApplicationFlowEnum } from "@/lib/constants";



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
  const [applicationFlowState, setApplicationFlowState] =
    useState<ApplicationFlowEnum>(ApplicationFlowEnum.VIEW_APPLICATIONS);


  const handleSetApplicationFlowState = (state: ApplicationFlowEnum) => {
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
