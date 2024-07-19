"use client";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import {
  PCMAAuditTrailIcon,
  PCMADataLeakPreventionIcon,
  PCMAHeartIcon,
  PCMAIncreasedTrustIcon,
  PCMALogo,
  PCMAQuestionMarkIcon,
  PCMARealTimeNotificationsIcon,
  PCMARegulatoryComplianceIcon,
  PCMASeamlessIntegrationIcon,
  PCMAShieldIcon,
  PCMAStarIcon,
  PCMATransparencyIcon,
  PCMAUserControlIcon,
} from "@/components/icons";
import PrimaryButton from "@/components/primary-button/primary-button";
import Spacer from "@/components/spacer/spacer";
import useMedia from "@/lib/hooks/client/use-media";
import { Role } from "@/lib/types";
import { cn, pxToRem } from "@/lib/utils";
import { AppRootState } from "@/rtk/app/store";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useSelector } from "react-redux";

interface HomeStackedCardProps {
  card_type?: "start" | "end";
  title?: string;
  content?: string;
  className?: string;
  wrapperClassName?: string;
  index?: number;
}

const HomeStackedCard = ({
  card_type = "start",
  index,
  ...props
}: HomeStackedCardProps) => {
  const isMobile = useMedia("(max-width:640px)", true);

  const desktopheight = card_type === "start" ? pxToRem(75) : pxToRem(85);
  const mobileHeight = card_type === "start" ? pxToRem(125) : pxToRem(133);
  // },[card_type])

  const height = useMemo(() => {
    return isMobile ? mobileHeight : desktopheight;
  }, [isMobile]);
  return (
    <div
      className={cn(
        "w-full sm:-mt-2 -mt-2.5 relative",
        props.wrapperClassName ?? ""
      )}
    >
      <div
        className={cn(
          "w-fit mx-auto rounded-t-3xl flex flex-col items-center justify-center border-t-4 border-x-4 border-solid border-t-[#0074FF4D] border-x-[#0074FF4D] bg-[#F7F9FD] px-6 sm:px-4 py-4 sm:py-2  text-center",
          card_type === "start" ? `h-[${height}]` : `h-[${height}] w-full`,
          card_type === "start" && "sm:scale-y-[1.125] scale-y-[1.126]",
          props.className
        )}
      >
        <div className="mx-auto text-center text-base sm:text-2xl font-normal leading-6 sm:leading-9 py-1 -translate-y-2.5 ">
          <span className=" text-primary font-bold capitalize  block sm:inline-block ">
            {props.title}:&nbsp;
          </span>
          <span className="block sm:inline-block">{props.content}</span>
        </div>
      </div>
      {card_type !== "start" && (
        <div className="w-screen self-center mx-auto sm:w-full h-0 border sm:border-2 border-[#ADD1FE] border-solid z-10" />
      )}
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const role = useSelector((state:AppRootState) => state.auth.role);
  const isMobile = useMedia("(max-width:640px)");
  // const pixelVal = pxToRem(17);
  // console.log("pixelVal",pixelVal);

  //console.log({ isMobile });
  return (
    <main className="flex sm:min-h-screen flex-col items-center justify-between  bg-neutral-white w-full h-full">
      {/* FIRST  SECTION */}
      <section className="h-screen w-full grid grid-rows-[5.125rem_1fr] grid-cols-1 gap-0 z-0">
        <Header variant="grey"  roleType={role as Role}/>
        <section className="h-full  w-full  flex flex-col items-center justify-between relative overflow-hidden">
          <Spacer size={isMobile ? 32 : 96} />
          {/* <section className="h-full  w-full bg-red-500 relative"> */}
          <div className="absolute top-2 sm:-top-6 left-1/2 -translate-x-1/2 w-full  scale-[3]  sm:scale-100 sm:w-fit sm:h-fit z-0">
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
                <h2 className=" text-secondary-black  font-extrabold text-[32px] sm:text-5xl  leading-[48px] tracking-[1%] text-center">
                  Empowering You to Control Your Data
                </h2>
                <p className=" text-base sm:text-2xl text-center leading-6 sm:leading-9 font-semibold text-secondary-black tracking-[1%] sm:max-w-[43.3125rem]">
                  Manage your privacy and consent with ease using our robust
                  Consent Management System.
                </p>
              </section>
            </div>
            <Link href="/register">
            <PrimaryButton className="mx-auto">Get&nbsp;Started</PrimaryButton>
            </Link>
          </main>
          <Spacer size={isMobile ? 36 : 72} />

          <div className="w-full max-w-[1014px] mx-auto     sm:h-[360px] flex items-center justify-center  z-20 sm:translate-y-0 translate-y-4">
            <Image
              src={"/hero-image.svg"}
              alt="Preview"
              width={800}
              height={400}
              className="w-[100%] h-full hidden sm:block object-fill"
            />
            <Image
              src="/hero-image-mobile.svg"
              alt="Preview"
              className="h-full object-contain max-w-[360px] self-center sm:hidden"
              width={380}
              height={360}
            />
          </div>
        </section>
      </section>

      {/* SECOND SECTION:FEATURES */}

      <section className="bg-[#F7F9FD] w-full z-10   flex flex-col justify-between gap-8 sm:gap-6">
        <main className="flex items-start justify-between w-full  sm:flex-row flex-col gap-6 pt-6  sm:pt-[5rem] px-4 sm:px-[7.5rem]">
          <div className="flex sm:flex-row flex-col items-start gap-6 ">
            <div className="bg-[#F9D10133] px-6 py-3 rounded-full border border-solid border-[#F9B401] w-fit h-fit flex items-center gap-2 mx-auto">
              <PCMAStarIcon />

              <span className=" text-center text-base text-[#823E00] font-semibold leading-4 tracking-[1%]">
                Features
              </span>
            </div>

            <p className=" font-normal text-left text-secondary-black text-base sm:text-2xl max-w-3xl">
              PCMA helps you manage and track your consent for data collection
              and usage. Stay in control of your personal information and ensure
              your data is handled responsibly
            </p>
          </div>

          <Link href="/register">
            <PrimaryButton type="button">Get&nbsp;Started</PrimaryButton>
          </Link>
        </main>

        <main className="h-auto  sm:h-[36rem] grid grid-cols-1 grid-rows-[25rem_16.25rem_16.25rem_16.25rem_25rem] sm:grid-cols-4 sm:grid-rows-[1.2fr_1fr] gap-6 pb-6 sm:pb-[5rem] px-4 sm:px-[7.5rem]">
          <div className="bg-white h-full w-full rounded-3xl  row-span-1  sm:row-span-2  border border-[#0074FF33] border-solid px-6  pt-6 pb-0 sm:py-6 flex flex-col gap-4 overflow-hidden">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Consent Management Platform (CMP):
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Central hub for user consent and data transfer management,
              integrating with various applications.
            </p>
            {isMobile && <Spacer size={16} />}
            <div className="w-full sm:block hidden">
              <Image
                src={"/consent-management.svg"}
                alt="consent management"
                className="object-cover w-full"
                width={800}
                height={600}
              />
            </div>
            <div className="w-full block sm:hidden">
              <Image
                src={"/consent-management-mobile.svg"}
                alt="consent management mobile"
                className="object-fill w-full"
                width={400}
                height={400}
              />
            </div>
          </div>
          <div className="bg-white h-full w-full rounded-3xl  sm:row-start-1 sm:row-span-1 sm:col-start-2 sm:col-span-1 border border-[#0074FF33] border-solid px-6 pt-6 flex flex-col gap-4 justify-between sm:justify-stretch">
            <div className="flex flex-col gap-4">
              <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
                Granular Consent Control:
              </h2>
              <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
                Specify which data points can be shared with whom and for what
                purposes.
              </p>
            </div>
            <div className="w-full sm:block hidden">
              <Image
                src={"/granular-consent.svg"}
                alt="granular-consent"
                className="object-cover w-full"
                width={800}
                height={600}
              />
            </div>
            <div className="w-full  sm:hidden block">
              <Image
                src={"/granular-consent-mobile.svg"}
                alt="granular consent"
                className="object-cover w-full"
                width={800}
                height={600}
              />
            </div>
          </div>
          <div className="bg-white h-full w-full rounded-3xl sm:row-start-1 sm:row-span-1  sm:col-start-3 sm:col-span-1 border border-[#0074FF33] border-solid px-6 pt-6 flex flex-col gap-4 justify-between sm:justify-stretch">
            <div className="flex flex-col gap-4">
              <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
                User Notification System:
              </h2>
              <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
                Receive notifications for data transfers and manage your consent
                in real-time.
              </p>
            </div>

            <div className="w-full sm:block hidden">
              <Image
                src={"/user-notification.svg"}
                alt="user notification"
                className="object-cover w-full"
                width={800}
                height={600}
              />
            </div>
            <div className="w-full sm:hidden block">
              <Image
                src={"/user-notification-mobile.svg"}
                alt="user notification"
                className="object-cover w-full"
                width={800}
                height={600}
              />
            </div>
          </div>

          <div className="bg-white h-full w-full rounded-3xl sm:col-start-2 sm:col-span-2 sm:row-start-2 sm:row-span-1 border border-[#0074FF33] border-solid pl-6 pt-6 sm:pr-0 pr-6 flex  sm:flex-row flex-col justify-between items-start  gap-4 overflow-hidden">
            <div className="flex flex-col gap-4">
              <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
                Audit Trail:
              </h2>
              <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
                Maintain a comprehensive record of all consent actions and data
                transfers for transparency and accountability
              </p>
            </div>

            <div className="w-full sm:block hidden">
              <Image
                src={"/audit-trail.svg"}
                alt="audit-trail"
                className="object-cover w-full"
                width={800}
                height={600}
              />
            </div>
            <div className="w-full block sm:hidden">
              <Image
                src={"/audit-trail-mobile.svg"}
                alt="audit-trail"
                className="object-cover w-full"
                width={800}
                height={600}
              />
            </div>
          </div>
          <div className="bg-white h-full w-full rounded-3xl sm:col-start-4 sm:col-span-1 sm:row-start-1 sm:row-span-2 border border-[#0074FF33] border-solid p-6 flex flex-col gap-4 overflow-hidden">
            <h2 className=" text-primary  font-extrabold text-xl leading-6 tracking-[1%] text-left ">
              Data Leak Check:
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Trigger checks to ensure your Personally Identifiable Information
              (PII) is not available on the internet
            </p>
            {isMobile && <Spacer size={16} />}
            <div className="w-full overflow-hidden mx-auto sm:block hidden">
              <Image
                src={"/data-leak.svg"}
                alt="data leak"
                className="object-fill w-full"
                width={600}
                height={400}
              />
            </div>

            <div className="sm:hidden block">
              <Image
                src={"/data-leak-mobile.svg"}
                alt="data leak"
                className="object-fill w-full"
                width={400}
                height={400}
              />
            </div>
          </div>
        </main>
      </section>

      {/* THIRD SECTION: HOW IT WORKS */}
      <section className="bg-white w-full z-20 py-6 sm:py-[5rem]  flex flex-col justify-between overflow-x-hidden">
        <main className=" flex flex-col items-center gap-8 sm:gap-6 w-full">
          <div className="px-4   sm:px-[7.5rem] flex flex-col items-center gap-8 sm:gap-6 w-full">
            <div className="bg-[#01A0F933] px-6 py-3 rounded-full border border-solid border-[#5CA6FF] w-fit h-fit flex items-center gap-2 mx-auto">
              <PCMAQuestionMarkIcon />

              <span className=" text-center text-base text-secondary-black font-semibold leading-4 tracking-[1%]">
                How It Works
              </span>
            </div>

            <h2 className=" font-semibold text-2xl sm:text-5xl text-center  max-w-4xl mx-auto leading-[28.8px] sm:leading-[57.6px]">
              A Visual representation of the Consent Management Process
            </h2>
          </div>

          <div className="w-full">
            <HomeStackedCard
              title="Register"
              content="Data Owners and Transaction Parties register on the PCMA."
              className="w-4/5 sm:w-full max-w-[59.375rem] mx-auto"
              wrapperClassName="z-0"
            />
            <HomeStackedCard
              title="Request Consent"
              content="Applications request consent from users for data access."
              className="w-4/5 sm:w-full max-w-[62.4375rem] mx-auto"
              wrapperClassName="z-10"
            />
            <HomeStackedCard
              title="Manage Consent"
              content="Users manage their consents through a user-friendly interface."
              className="w-4/5 sm:w-full  max-w-[66.4375rem] mx-auto"
              wrapperClassName="z-20"
            />
            <HomeStackedCard
              title="Manage Consent"
              content="Receive real-time notifications for any data transfer requests."
              className="w-4/5 sm:w-full max-w-[69.9375rem] mx-auto "
              wrapperClassName="z-30"
            />
            <HomeStackedCard
              card_type="end"
              title="Audit and Review"
              content="Track all your consent actions and data transfers with our audit trail."
              className="w-4/5 sm:w-full max-w-[73.3125rem] mx-auto "
              wrapperClassName="z-40"
            />
          </div>
          <Link href="/register">
          <PrimaryButton
            className=" mx-auto"
        
          >
            Get&nbsp;Started
          </PrimaryButton>
        </Link>
        </main>
      </section>

      {/* FOURTH SECTION :BENEFITS*/}

      <section className="bg-[#F7F9FD] w-full z-10  py-6 px-4 sm:py-[5rem] sm:px-[7.5rem] flex flex-col justify-between">
        <main className="flex items-start justify-between w-full sm:flex-row flex-col gap-6">
          <div className="flex sm:flex-row flex-col items-start gap-6 ">
            <div className="bg-[#F9D10133] px-6 py-3 rounded-full border border-solid border-[#F9B401] w-fit h-fit flex items-center gap-2 mx-auto">
              <PCMAHeartIcon />

              <span className=" text-center text-base text-[#823E00] font-semibold leading-4 tracking-[1%]">
                Benefits
              </span>
            </div>

            <p className=" font-normal text-left text-secondary-black text-base sm:text-2xl max-w-3xl">
              With our robust system, you can be confident that your personal
              identification information is secure with us
            </p>
          </div>

          <Link href="/register">

          <PrimaryButton>Get&nbsp;Started</PrimaryButton>
          </Link>
        </main>

        <main className="h-[70rem] sm:h-[37.375rem] grid grid-cols-2 sm:grid-cols-4  grid-rows-[repeat(15rem,4)] sm:grid-rows-2 gap-6 sm:gap-10 py-4">
          <div className="bg-white h-full w-full rounded-3xl  border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMATransparencyIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
              Transparency
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Gain clear insights into how your data is being shared
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl  border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMAUserControlIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
              User Control
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Decide exactly how your PII is used and shared
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMARegulatoryComplianceIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
              Regulatory Compliance
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Ensure adherence to data privacy regulations like GDPR and CCPA.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl  border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMAIncreasedTrustIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
              Increased Trust
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Foster trust with organizations through transparent data practices
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMAAuditTrailIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
              Easy Audit Trails
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Maintain a detailed record of all consent actions & data
              transfers.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMARealTimeNotificationsIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
              Real-time Notifications
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Receive instant notifications about any data transfer requests.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMADataLeakPreventionIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
              Data Leak Prevention
            </h2>
            <p className=" font-normal text-sm leading-5 tracking-[1%] text-secondary-black text-left max-w-sm">
              Check & ensure your personal data is not available on the
              internet.
            </p>
          </div>
          <div className="bg-white h-full w-full rounded-3xl border border-[#0074FF33] border-solid px-4 pt-6 pb-2 sm:px-6 sm:pt-6 sm:pb-6 flex flex-col gap-4">
            <div className="w-full  h-fit flex items-center justify-center">
              <PCMASeamlessIntegrationIcon className=" sm:w-auto sm:h-auto  w-16 h-16" />
            </div>
            <h2 className=" text-primary  font-extrabold text-base sm:text-xl leading-5 sm:leading-6 tracking-[1%] text-left ">
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
