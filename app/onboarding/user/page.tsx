"use client";
import React from "react";
import Header from "@/components/header/header";
import Spacer from "@/components/spacer/spacer";
import WelcomeCardUser from "../components/welcome-card-user/welcome-card-user";

const UserOnboardingPage = () => {
  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header roleType="user" />
      <main className="w-full mx-auto pt-[4rem]">
        <WelcomeCardUser/>
        {/* <Spacer size={72} />
        <BasicPiiCard />
        <Spacer size={72} />
        <PersonalPiiCard />
        <Spacer size={72} /> */}
      </main>
    </section>
  );
};

export default UserOnboardingPage;
