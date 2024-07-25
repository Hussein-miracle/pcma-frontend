"use client";
import React from "react";
import Header from "@/components/header/header";
import Spacer from "@/components/spacer/spacer";
import ProtectServiceProviderRoute from "@/hoc/protect-service-provider-route/protect-service-provider-route";
import WelcomeCardServiceProvider from "../components/welcome-card-service-provider/welcome-card-service-provider";

const ServiceProviderOnboardingPage = () => {
  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header roleType="transaction_party" />
      <main className="w-full mx-auto pt-[4rem]">
        <WelcomeCardServiceProvider />
        {/* <Spacer size={72} />
        <BasicPiiCard />
        <Spacer size={72} />
        <PersonalPiiCard />
        <Spacer size={72} /> */}
      </main>
    </section>
  );
};

export default ProtectServiceProviderRoute(ServiceProviderOnboardingPage,'/onboarding/user');
