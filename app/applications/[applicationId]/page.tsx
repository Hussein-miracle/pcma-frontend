"use client";
import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import BackButton from "@/components/back-button/back-button";
// import FormContentContainer from "@/components/form-content-container/form-content-container";
import Spacer from "@/components/spacer/spacer";
import Checkbox from "@/components/checkbox/checkbox";
import { CopyIcon } from "@/components/icons";
import useToggle from "@/lib/hooks/client/use-toggle";
import ProtectServiceProviderRoute from "@/hoc/protect-service-provider-route/protect-service-provider-route";

const ApplicationDetailsPage = () => {
  const { toggle: toggleDeactivateDialog, toggleState: showDeactivateDialog } =
    useToggle(false);
  return (
    <>
      <section className=" w-full max-w-[24rem] sm:max-w-[25rem] mx-auto">
        <BackButton />
        <Spacer size={20} />
        <section className="w-full overflow-hidden bg-white rounded-xl border border-[#D4DAF0]">
          {/* header details */}
          <div className=" w-full bg-white  border-b border-b-[#D7E1F4] p-3 flex justify-between items-center h-[5rem]">
            <div className="h-full flex gap-x-4 items-center justify-start">
              <div className=" w-[46px] h-[46px] rounded-md overflow-hidden bg-grey-10" />

              <div className="flex flex-col h-full items-start justify-between">
                <h2 className=" text-secondary-black font-bold text-xl">
                  Google
                </h2>
                <p className=" font-normal text-sm/5 text-grey-90">
                  13th August, 2023
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-[#F7F9FD] py-1 px-2 text-sm/5 font-semibold capitalize text-grey-90 border border-[#D7E1F4]">
              <span>23&nbsp;users</span>
            </div>
          </div>

          {/* content */}
          {/* <Spacer size={20} /> */}
          <main className=" w-full px-4 py-6 flex flex-col gap-4">
            <section className="flex flex-col items-start gap-2">
              <h2 className=" text-grey-70 font-normal text-base/5">
                Data Types Requested
              </h2>
              {/* <Spacer size={16} /> */}
              <main className="w-full flex flex-wrap max-w-[12rem] gap-2">
                <div className="flex items-center justify-start gap-1">
                  <Checkbox checked={true} />{" "}
                  <span className="block">Email</span>
                </div>
                <div className="flex items-center justify-start gap-1">
                  <Checkbox checked={true} />{" "}
                  <span className="block">Location</span>
                </div>
                <div className="flex items-center justify-start gap-1">
                  <Checkbox checked={true} />{" "}
                  <span className="block">Contact</span>
                </div>
                <div className="flex items-center justify-start gap-1">
                  <Checkbox checked={true} />{" "}
                  <span className="block">Others</span>
                </div>
              </main>
            </section>
            <section className="flex flex-col items-start gap-2">
              <h2 className=" text-grey-70 font-normal text-base/5">
                Purpose of Access
              </h2>

              <div className="w-full h-fit rounded border border-grey-30 focus-within:border-secondary-blueoverflow-hidden ">
                <textarea
                  placeholder="To sync your contacts and calendar events"
                  className="w-full outline-none focus-within:outline-none border-none resize-none p-2"
                  rows={4}
                />
              </div>
            </section>
            <section className="flex flex-col items-start gap-2">
              <h2 className=" text-grey-70 font-normal text-base/5">
                Credentials
              </h2>
              <div className="flex flex-col gap-2 rounded border border-grey-30 bg-[#F7F9FD] p-4 w-full">
                {/* CREDENTIAL ITEM */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <h2 className=" text-grey-70 font-normal text-base/5">
                    Application&nbsp;ID
                  </h2>
                  <div className="w-full  bg-white rounded p-2 border border-grey-30 flex items-center justify-between">
                    <span className=" text-grey-90 text-base/5 font-normal">
                      3456787654356789654667809
                    </span>
                    <CopyIcon />
                  </div>
                </div>
                {/* CREDENTIAL ITEM */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <h2 className=" text-grey-70 font-normal text-base/5">
                    Secret&nbsp;Key
                  </h2>
                  <div className="w-full  bg-white rounded p-2 border border-grey-30 flex items-center justify-between">
                    <span className=" text-grey-90 text-base/5 font-normal">
                      3456787654356789654667809
                    </span>
                    <CopyIcon />
                  </div>
                </div>
                {/* CREDENTIAL ITEM */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <h2 className=" text-grey-70 font-normal text-base/5">
                    Public&nbsp;Key
                  </h2>
                  <div className="w-full  bg-white rounded p-2 border border-grey-30 flex items-center justify-between">
                    <span className=" text-grey-90 text-base/5 font-normal">
                      3456787654356789654667809
                    </span>
                    <CopyIcon />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 w-full">
                <button
                  className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D]"
                  // onClick={close}
                >
                  Save Changes
                </button>
                <button className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1"
                onClick={toggleDeactivateDialog}
                >
                  Deactivate App
                </button>
              </div>
            </section>
          </main>
          {/* <Spacer size={20} /> */}
        </section>
      </section>
      {/* DE-ACTIVATE DIALOG */}
      <Dialog
        open={showDeactivateDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toggleDeactivateDialog}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-grey-100/70">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
            
              className="w-full max-w-[26rem] rounded-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  h-fit"
            >
              <DialogTitle
                as="h3"
                className="text-2xl/9 font-bold text-secondary-black tracking-[1%]"
              >
                Are you sure you want to <br /> Deactivate the Application
              </DialogTitle>

              <Spacer size={24} />

              <section className=" w-full flex flex-col justify-between h-max">
                <p className=" font-normal text-[#4C689E] text-base/6 tracking-[1%]">
                  This will revoke all access and permissions.
                </p>

                <Spacer size={24} />
                <div className="flex items-center justify-between gap-4 w-full">
                  <button
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D]"
                    onClick={toggleDeactivateDialog}
                  >
                    No,&nbsp;Go Back
                  </button>
                  <button className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1">
                    Yes,&nbsp;Deactivate
                  </button>
                </div>
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ProtectServiceProviderRoute(ApplicationDetailsPage);
