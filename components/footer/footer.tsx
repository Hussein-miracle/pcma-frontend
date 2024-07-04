import React, { HTMLAttributes } from "react";
import { Field, Select, Label } from "@headlessui/react";
import {
  ChevronDownIcon,
  PCMAEmailIcon,
  PCMAFaceBookIcon,
  PCMAInstagramIcon,
  PCMALinkedInIcon,
  PCMALocationIcon,
  PCMALogoWhite,
  PCMAPhoneCallIcon,
  PCMAWhatsappIcon,
  PCMAYoutubeIcon,
} from "../icons";
import PrimaryButton from "../primary-button/primary-button";
import { cn, montserrat, pxToRem } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface FooterFormFieldProps extends HTMLAttributes<HTMLInputElement> {
  fieldName: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: "email" | "text" | "tel";
  autocomplete?: string | "off";
  endFieldNameWithAsterisk?: boolean;
}

const FooterFormField = ({
  type = "text",
  autocomplete = "off",
  fieldName,
  endFieldNameWithAsterisk = false,
  ...otherProps
}: FooterFormFieldProps) => {
  return (
    <label
      className="w-full rounded-xl border border-[#D4DAF0] border-solid px-5 py-3 flex items-center gap-2 h-fit"
      htmlFor={fieldName}
    >
      <label
        className={cn(
          "flex items-center gap-1 whitespace-nowrap",
          `${montserrat.className} text-sm/6 text-secondary-black tracking-[1%]`
        )}
        htmlFor={fieldName}
      >
        <span>{fieldName}</span>
        {endFieldNameWithAsterisk && <span className="text-primary">*</span>}
      </label>

      <input
        autoComplete={autocomplete}
        type={type}
        required={endFieldNameWithAsterisk}
        onChange={otherProps?.onChange}
        value={otherProps?.value}
        className={cn(
          "h-full w-full outline-none border-none focus:outline-none",
          `${montserrat.className} text-sm/6 text-secondary-black tracking-[1%]`
        )}
      />
    </label>
  );
};

const Footer = () => {
  const router = useRouter();
  // const px = pxToRem(491);

  // console.log({px})
  return (
    <footer className="w-full h-fit">
      <section className="px-6 sm:px-[7.5rem] pb-10 pt-6 sm:py-[5rem] flex sm:flex-row flex-col items-center justify-between gap-6">
        <main
          className={`sm:h-[35rem] w-full  max-w-[30.6875rem] bg-[#F7F9FD] rounded-3xl  px-6  sm:px-10 py-8  sm:py-12 gap-6 relative overflow-hidden `}
        >
          <div className="w-full">
            <h2 className=" font-semibold  text-[28px] text-secondary-black leading-9">
              Contact Information
            </h2>
            <p className=" text-lg text-secondary-black font-normal">
              Say something to start a live chat!
            </p>
          </div>

          <div className="flex flex-col gap-12 items-start mt-12">
            <div className="flex items-start gap-6">
              <PCMAPhoneCallIcon className=" w-6 h-6 min-h-6 min-w-6" />
              <span className=" text-base text-secondary-black font-normal">
                +1012 3456 789
              </span>
            </div>
            <div className="flex items-start gap-4">
              <PCMAEmailIcon className=" w-6 h-6 min-h-6 min-w-6" />
              <span className=" text-base text-secondary-black font-normal">
                demo@gmail.com
              </span>
            </div>
            <div className="flex items-start gap-4">
              <PCMALocationIcon className=" w-6 h-6 min-h-6 min-w-6" />
              <span className=" text-base text-secondary-black font-normal">
                132 Dartmouth Street Boston, Massachusetts 02156 United States
              </span>
            </div>
          </div>


          <div className=" h-28 relative  bottom-0 right-0 flex items-start justify-end translate-y-24 translate-x-6">
            <div className="bg-[#0074FF1A] absolute right-0 w-[9rem] h-[9rem] rounded-full inline-block -translate-x-14" />
            <div className="bg-[#0074FF1A] absolute right-0 translate-x-28 w-[17rem] h-[17rem] rounded-full inline-block translate-y-6" />
          </div>
        </main>

        <main className="pr-0 h-fit sm:h-full sm:pr-8">
          <form className="h-full w-full max-w-[545px] flex flex-col items-start gap-10">
            <div className="w-full">
              <h2 className=" text-[32px] sm:text-[54px] font-extrabold text-secondary-black">
                Get in <span className=" text-primary">Touch</span>{" "}
              </h2>
              <p className=" text-sm sm:text-base text-secondary-black text-left leading-6 max-w-lg">
                We&apos;re here to help and answer any questions you may have.
                Reach out to us and we&apos;ll respond as soon as we can.
              </p>
            </div>

            <main className="flex flex-col items-center w-full gap-5">
              <FooterFormField
                fieldName="Name"
                endFieldNameWithAsterisk
                autocomplete="given-name"
              />
              <FooterFormField
                fieldName="Email"
                type="email"
                autocomplete={"on"}
              />
              <FooterFormField
                fieldName="Phone Number"
                type="tel"
                endFieldNameWithAsterisk
              />

              {/* <div > */}
              <label
                className="w-full rounded-xl border border-[#D4DAF0] border-solid px-5 py-3 flex items-center gap-2 h-fit text-secondary-black"
                htmlFor="where"
              >
                <label
                  htmlFor="where"
                  className="flex items-center gap-1 whitespace-nowrap"
                >
                  <span
                    className={`${montserrat.className} text-sm/6 text-secondary-black tracking-[1%]`}
                  >
                    How did you find us?
                  </span>
                </label>
                <div className="relative text-black w-full items-center flex justify-between">
                  <Select
                    id="where"
                    name="where"
                    className={cn(
                      "block w-full appearance-none h-full border-none outline-none",
                      `${montserrat.className} text-sm/6 text-secondary-black tracking-[1%]`
                      // "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                      // Make the text of each option black on Windows
                      // "*:text-black"
                    )}
                  >
                    <option value="" selected disabled></option>
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="delayed">Delayed</option>
                    <option value="canceled">Canceled</option>
                  </Select>

                  <ChevronDownIcon
                    className="group absolute top-0 right-2 size-6  pointer-events-none"
                    aria-hidden="true"
                  />
                </div>
              </label>
            </main>
            <PrimaryButton className="w-full">SEND</PrimaryButton>
          </form>
        </main>
      </section>



      <main className="w-full bg-[#1C1A39] px-6 sm:px-[7.5rem] py-10 sm:py-[5rem] sm:h-96 flex sm:flex-row flex-col items-center justify-between sm:gap-auto gap-10">
        <div className="flex items-start justify-between h-full flex-col sm:w-auto w-full">
          <div className="flex items-start flex-col gap-5 ">
            <div
              className="cursor-pointer"
              onClick={() => {
                router.push("/");
              }}
            >
              <PCMALogoWhite />
            </div>
            <p className=" text-white max-w-96">
              PCMA helps you manage and track your consent for data collection
              and usage. Stay in control of your personal information and ensure
              your data is handled responsibly
            </p>
          </div>
          <div className="sm:flex items-center gap-2  hidden">
            <PCMAWhatsappIcon />
            <PCMAFaceBookIcon />
            <PCMAInstagramIcon />
            <PCMAYoutubeIcon />
            <PCMALinkedInIcon />
          </div>
        </div>

        <div className="flex flex-row items-center justify-between sm:w-auto w-full">
          <div className="flex flex-col justify-between gap-5 h-full">
            <h2 className=" text-primary font-bold text-xl leading-[25.2px]">
              Quick&nbsp;Link
            </h2>
            <ul className=" text-base text-white leading-6 flex flex-col gap-4 items-start">
              <li>About</li>
              <li>Features</li>
              <li>Privacy&nbsp;Policy</li>
              <li>Contact</li>
              <li>Developers</li>
            </ul>
          </div>
          <div className="flex flex-col gap-5 h-full">
            <h2 className=" text-primary font-bold text-xl leading-[25.2px]">
              Contact Us
            </h2>
            <div className=" text-base text-white leading-6 pb-4 border-b border-b-[#10807080] ">
              <span className="block">contact@pcma.com</span>
              <span className="block">+44 2045842425</span>
            </div>
            <div className="flex items-center gap-2  sm:hidden pb-4 border-b border-b-[#10807080] ">
              <PCMAWhatsappIcon />
              <PCMAFaceBookIcon />
              <PCMAInstagramIcon />
              <PCMAYoutubeIcon />
              <PCMALinkedInIcon />
            </div>
          </div>
        </div>
      </main>
    </footer>
  );
};

export default Footer;
