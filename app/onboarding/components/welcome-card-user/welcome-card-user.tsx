"use client";
import PrimaryButton from "@/components/primary-button/primary-button";
import { useAppRouter } from "@/lib/hooks/client/use-app-router";
import { AppRootState } from "@/rtk/app/store";
import React from "react";
import { useSelector } from "react-redux";

interface WelcomeCardUserProps {}

const WelcomeCardUser = (props: WelcomeCardUserProps) => {
  const basicPiiSaved = useSelector((state:AppRootState) => state.individual.basic_pii_saved);
  const personalPiiSaved = useSelector((state:AppRootState) => state.individual.personal_pii_saved);
  const router = useAppRouter();


  const handleProceed = () => {
    if(!basicPiiSaved){
      router.replace("/onboarding/user/basic-pii");
      return;
    }


    if(!personalPiiSaved){
      router.replace("/onboarding/user/personal-pii");
      return;
    }
  }


  return (
    <main className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center  flex items-start gap-0">
          Welcome&nbsp;<span className="text-3xl -mt-0.5">🎉</span>
        </h2>
        <p className=" text-base text-center font-normal text-[#4C689E]">
          We&apos;re glad to have you here.
        </p>
      </div>

      <p className=" text-base text-center font-normal text-[#4C689E]">
        Get started by managing your data privacy and consents in one convenient
        place. Stay informed, stay secure, and take control of your personal
        information.
      </p>

      <p className=" text-base text-center font-normal text-[#4C689E]">
        Let’s ensure your data privacy together!
      </p>

      <PrimaryButton variant="secondary" onClick={handleProceed}>Proceed</PrimaryButton>
    </main>
  );
};

export default WelcomeCardUser;
