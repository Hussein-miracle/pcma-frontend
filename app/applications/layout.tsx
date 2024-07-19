import Header from "@/components/header/header";
import Spacer from "@/components/spacer/spacer";
import ApplicationContextProvider from "@/contexts/application-context/application-context";
import React from "react";

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApplicationContextProvider>
      <section className=" bg-grey-10  w-full h-full min-h-screen">
        <Header type="authed" roleType="transaction_party" />
        <Spacer size={24} />

        {children}
      </section>
    </ApplicationContextProvider>
  );
};

export default ApplicationLayout;
