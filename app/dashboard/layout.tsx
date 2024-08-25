import Header from "@/components/header/header";
import Spacer from "@/components/spacer/spacer";
import ApplicationContextProvider from "@/contexts/application-context/application-context";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    // <ApplicationContextProvider>
      <section className="  bg-grey-10  w-full h-full min-h-screen">

        <Header type="authed" roleType="service_provider" />

        <Spacer size={24} />

        {children}
      </section>
    // </ApplicationContextProvider>
  );
};

export default DashboardLayout;
