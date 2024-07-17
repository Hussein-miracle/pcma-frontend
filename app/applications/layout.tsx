import Header from "@/components/header/header";
import Spacer from "@/components/spacer/spacer";
import React from "react";

const ApplicationLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <section className=" bg-grey-10  w-full h-full min-h-screen">
      <Header type="authed" userType="service-provider" />
      <Spacer size={24} />

      {children}
    </section>
  );
};

export default ApplicationLayout;
