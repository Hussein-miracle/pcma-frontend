import React from "react";
import Header from "@/components/header/header";
import WelcomeCard from "./welcome-card/welcome-card";
import BasicPiiCard from "./basic-pii-card/basic-pii-card";
import Spacer from "@/components/spacer/spacer";
import PersonalPiiCard from "./personal-pii-card/personal-pii-card";

const IntroductionPage = () => {
  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header />

      <main className="w-full mx-auto pt-[4rem]">
        <WelcomeCard />
        <Spacer size={72} />
        <BasicPiiCard />
        <Spacer size={72} />
        <PersonalPiiCard />
        <Spacer size={72} />
      </main>
    </section>
  );
};

export default IntroductionPage;
