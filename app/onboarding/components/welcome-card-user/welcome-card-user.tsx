import PrimaryButton from "@/components/primary-button/primary-button";
import { Role } from "@/lib/types";
import React from "react";

interface WelcomeCardUserProps {}

const WelcomeCardUser = (props: WelcomeCardUserProps) => {
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

      <PrimaryButton variant="secondary">Proceed</PrimaryButton>
    </main>
  );
};

export default WelcomeCardUser;
