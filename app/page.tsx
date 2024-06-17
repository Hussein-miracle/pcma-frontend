"use client";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import {
  PCMAHeartIcon,
  PCMALogo,
  PCMAQuestionMarkIcon,
  PCMAShieldIcon,
  PCMAStarIcon,
} from "@/components/icons";
import PrimaryButton from "@/components/primary-button/primary-button";
import Spacer from "@/components/spacer/spacer";
import { mergeCn, pxToRem } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface HomeStackedCardProps {
  card_type?: "start" | "end";
  title?: string;
  content?: string;
  className?: string;
}

const HomeStackedCard = ({
  card_type = "start",
  ...props
}: HomeStackedCardProps) => {
  const height = card_type === "start" ? pxToRem(75) : pxToRem(85);
  // },[card_type])
  return (
    <div className="w-full -mt-1">
      <div
        className={mergeCn(
          "w-fit mx-auto rounded-t-3xl flex flex-col items-center justify-center border-t-4 border-x-4 border-solid border-t-[#0074FF4D] border-x-[#0074FF4D] bg-[#F7F9FD] px-4 py-2  text-center",
          card_type === "start" ? `h-[${height}]` : `h-[${height}] w-full`,
          props.className
        )}
      >
        <p className="mx-auto text-center text-2xl font-normal leading-9 ">
          <span className=" text-primary font-bold capitalize  ">
            {props.title}:&nbsp;
          </span>
          {props.content}
        </p>
      </div>
      {card_type !== "start" && (
        <div className="w-full h-0 border-2 border-[#ADD1FE] border-solid z-10" />
      )}
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  // const pixelVal = pxToRem(17);
  // console.log("pixelVal",pixelVal);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between  bg-neutral-white w-full h-full">
      {/* FIRST  SECTION */}
      <section className="h-screen w-full grid grid-rows-[5.125rem_1fr] grid-cols-1 gap-0 z-0">
        <Header variant="grey" />
        <section className="h-full  w-full  flex flex-col items-center justify-between relative">
          <Spacer size={96} />
          {/* <section className="h-full  w-full bg-red-500 relative"> */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-fit h-fit z-0">
            <Image
              src={"/hero-background.png"}
              alt="PCMA"
              width={894}
              height={602}
            />
          </div>

          <main className=" w-full  flex flex-col items-center  gap-14 z-10">
            <div className="flex items-center w-full flex-col gap-6">
              <div className="bg-[#F3FFFC] px-6 py-3 rounded-full border border-solid border-secondary-green w-fit h-fit flex items-center gap-2 mx-auto">
                <PCMAShieldIcon />

                <span className=" text-center text-base font-semibold leading-4 tracking-[1%]">
                  Data&nbsp;Security
                </span>
              </div>

              <section className="flex flex-col items-center gap-4">
                <h2 className=" text-secondary-black  font-extrabold text-5xl  leading-[48px] tracking-[1%] text-center">
                  Empowering You to Control Your Data
                </h2>
                <p className=" text-2xl text-center leading-9 font-semibold text-secondary-black tracking-[1%] max-w-[43.3125rem]">
                  Manage your privacy and consent with ease using our robust
                  Consent Management System.
                </p>
              </section>
            </div>

            <PrimaryButton className="mx-auto">Get&nbsp;Started</PrimaryButton>
          </main>
          <Spacer size={72} axis="vertical" />
          <div className="w-full max-w-[1014px] mx-auto bg-[#5CA6FF] rounded-t-3xl pt-6 px-6 overflow-hidden h-[360px]  z-20">
            <div className="bg-[#F2F8FF] w-full h-full rounded-t-xl border-x-[12px] border-t-[12px] border-[#FFFFFF]"></div>
          </div>
        </section>
      </section>

      {/* SECOND SECTION */}

      <section className="bg-[#F7F9FD] w-full h-screen z-10 py-[5rem] px-[7.5rem] flex flex-col justify-between">
        <main className="flex items-start justify-between w-full">
          <div className="flex items-start gap-6 ">
            <div className="bg-[#F9D10133] px-6 py-3 rounded-full border border-solid border-[#F9B401] w-fit h-fit flex items-center gap-2 mx-auto">
              <PCMAStarIcon />

              <span className=" text-center text-base text-[#823E00] font-semibold leading-4 tracking-[1%]">
                Features
              </span>
            </div>

            <p className=" font-normal text-left text-secondary-black text-2xl max-w-3xl">
              PCMA helps you manage and track your consent for data collection
              and usage. Stay in control of your personal information and ensure
              your data is handled responsibly
            </p>
          </div>

          <PrimaryButton>Get&nbsp;Started</PrimaryButton>
        </main>

        <main className=" h-[34.375rem] grid grid-cols-4 grid-rows-[1.2fr_1fr] gap-6">
          <div className="bg-white h-full w-full rounded-3xl  row-span-2 col-span-1 border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Consent Management Platform (CMP):
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Central hub for user consent and data transfer management,
              integrating with various applications.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl  row-start-1 row-span-1 col-start-2 col-span-1 border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Granular Consent Control:
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Specify which data points can be shared with whom and for what
              purposes.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl row-start-1 row-span-1  col-start-3 col-span-1 border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              User Notification System:
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Receive notifications for data transfers and manage your consent
              in real-time.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl col-start-2 col-span-2 row-start-2 row-span-1 border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Audit Trail:
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Maintain a comprehensive record of all consent actions and data
              transfers for transparency and accountability
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl col-start-4 col-span-1 row-start-1 row-span-2 border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Data Leak Check:
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Trigger checks to ensure your Personally Identifiable Information
              (PII) is not available on the internet
            </p>
          </div>
        </main>
      </section>

      {/* THIRD SECTION */}
      <section className="bg-white w-full h-screen z-20 py-[5rem] px-[7.5rem] flex flex-col justify-between">
        <main className=" flex flex-col items-center gap-4">
          <div className="bg-[#01A0F933] px-6 py-3 rounded-full border border-solid border-[#5CA6FF] w-fit h-fit flex items-center gap-2 mx-auto">
            <PCMAQuestionMarkIcon />

            <span className=" text-center text-base text-secondary-black font-semibold leading-4 tracking-[1%]">
              How It Works
            </span>
          </div>

          <h2 className=" font-semibold text-5xl text-center  max-w-4xl mx-auto leading-[57.6px]">
            A Visual representation of the Consent Management Process
          </h2>
        </main>
        <div className="w-full">
          <HomeStackedCard
            title="Register"
            content="Data Owners and Transaction Parties register on the PCMA."
            className="w-full max-w-[59.375rem] mx-auto"
          />
          <HomeStackedCard
            title="Request Consent"
            content="Applications request consent from users for data access."
            className="w-full max-w-[62.4375rem] mx-auto"
          />
          <HomeStackedCard
            title="Manage Consent"
            content="Users manage their consents through a user-friendly interface."
            className="w-full  max-w-[66.4375rem] mx-auto"
          />
          <HomeStackedCard
            title="Manage Consent"
            content="Receive real-time notifications for any data transfer requests."
            className="w-full max-w-[69.9375rem] mx-auto"
          />
          <HomeStackedCard
            card_type="end"
            title="Audit and Review"
            content="Track all your consent actions and data transfers with our audit trail."
            className="w-full max-w-[73.3125rem] mx-auto"
          />
        </div>
        <PrimaryButton className=" mx-auto">Get&nbsp;Started</PrimaryButton>
      </section>

      {/* FOURTH SECTION */}

      <section className="bg-[#F7F9FD] w-full h-screen z-10 py-[5rem] px-[7.5rem] flex flex-col justify-between">
        <main className="flex items-start justify-between w-full">
          <div className="flex items-start gap-6 ">
            <div className="bg-[#F9D10133] px-6 py-3 rounded-full border border-solid border-[#F9B401] w-fit h-fit flex items-center gap-2 mx-auto">
              <PCMAHeartIcon />

              <span className=" text-center text-base text-[#823E00] font-semibold leading-4 tracking-[1%]">
                Benefits
              </span>
            </div>

            <p className=" font-normal text-left text-secondary-black text-2xl max-w-3xl">
              With our robust system, you can be confident that your personal
              identification information is secure with us
            </p>
          </div>

          <PrimaryButton>Get&nbsp;Started</PrimaryButton>
        </main>

        <main className=" h-[37.375rem] grid grid-cols-4 grid-rows-2 gap-6">
          <div className="bg-white h-full w-full rounded-3xl  border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Transparency
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Gain clear insights into how your data is being shared
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl  border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              User Control
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Decide exactly how your PII is used and shared
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Regulatory Compliance
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Ensure adherence to data privacy regulations like GDPR and CCPA.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl  border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Increased Trust
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Foster trust with organizations through transparent data practices
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Easy Audit Trails
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Maintain a detailed record of all consent actions & data
              transfers.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Real-time Notifications
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Receive instant notifications about any data transfer requests.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Data Leak Prevention
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Check & ensure your personal data is not available on the
              internet.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid p-6 flex flex-col gap-4">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Seamless Integration
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Easily integrate our system with your existing applications.
            </p>
          </div>
        </main>
      </section>

      <Footer />
    </main>
  );
}
