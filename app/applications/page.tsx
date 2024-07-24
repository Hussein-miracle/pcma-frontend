"use client";
import React, { useContext, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

import ApplicationCard from "./components/application-card/application-card";
import FileInput from "@/components/file-input/file-input";
import TextInput from "@/components/text-input/text-input";
import PrimaryButton from "@/components/primary-button/primary-button";
import Checkbox from "@/components/checkbox/checkbox";
import BackButton from "@/components/back-button/back-button";
import Spacer from "@/components/spacer/spacer";
import { CopyIcon, PlusIcon } from "@/components/icons";

import { ApplicationFlowContext } from "@/contexts/application-context/application-context";

import { ApplicationCreationData } from "@/lib/types";
import { useGetApplications } from "@/lib/hooks/api/queries";
import { ApplicationFlowEnum } from "@/lib/constants";
import { cn, sleep } from "@/lib/utils";

const ConfirmApplicationDetails = () => {
  const { handleSetApplicationFlowState } = useContext(ApplicationFlowContext);

  const handleBack = () => {
    handleSetApplicationFlowState(ApplicationFlowEnum.CREATE_APPLICATION);
  };
  return (
    <motion.section
      className="w-full max-w-[31.625rem] mx-auto"
      key={ApplicationFlowEnum.CONFIRM_APPLICATION}
      initial={{ x: "50vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50vw", opacity: 0 }}
      transition={{ duration: 1, ease: "linear" }}
    >
      <BackButton onClick={handleBack} />
      <Spacer size={24} />
      <div className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full flex flex-col items-center gap-8 rounded-xl">
        <section className=" w-full flex flex-col gap-1.5 items-stretch">
          <div className=" w-full bg-white py-2 flex justify-between items-center">
            <div className="h-full flex gap-x-4 items-center justify-start">
              <div className=" w-[46px] h-[46px] rounded-md overflow-hidden bg-grey-10" />

              <div className="flex flex-col h-full items-start justify-between gap-2">
                <h2 className=" text-grey-70 font-normal text-base/5">
                  Application Name
                </h2>
                <p className=" text-grey-70 font-normal text-base/5">
                  Website URL
                </p>
              </div>
            </div>

            <div className="flex flex-col h-full items-end justify-between gap-2">
              <h2 className=" text-grey-90 font-normal text-base/5">Google</h2>
              <p className=" text-grey-90 font-normal text-base/5">
                www.google.com
              </p>
            </div>
          </div>

          <section className="flex flex-col items-start gap-2">
            <h2 className=" text-grey-70 font-normal text-base/5">
              Data Types Requested
            </h2>
            {/* <Spacer size={16} /> */}
            <main className="w-full flex flex-wrap  gap-2">
              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={true} disabled />{" "}
                <span className="block">Email</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={true} disabled />{" "}
                <span className="block">Location</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={true} disabled />{" "}
                <span className="block">Contact</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={true} disabled />{" "}
                <span className="block">Others</span>
              </div>
            </main>
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
          </section>
        </section>

        <PrimaryButton variant="secondary" type="button">
          Proceed
        </PrimaryButton>
      </div>
    </motion.section>
  );
};
const ApplicationCreationForm = () => {
  const { handleSetApplicationFlowState ,applicationFlowState} = useContext(ApplicationFlowContext);


  const {control,watch,handleSubmit} = useForm<Partial<ApplicationCreationData>>({
    defaultValues: {
      applicationName: "",
      website_url: "",
      upload_logo: "",
      email_access: false,
      location_access: false,
      contacts_access: false,
      others_access: false,
      purpose_of_access: "",
    },
  });

  const screenDelay = useMemo(() => applicationFlowState === ApplicationFlowEnum.CREATE_APPLICATION ? 0 : 2, [applicationFlowState]);

  console.log({screenDelay})



  const handleCreateApplication = async (values:Partial<ApplicationCreationData>) => {
    console.log({ values });
    await sleep(500);
    handleSetApplicationFlowState(ApplicationFlowEnum.CONFIRM_APPLICATION);
  };

  const handleBack = () => {
    handleSetApplicationFlowState(ApplicationFlowEnum.VIEW_APPLICATIONS);
  };

  return (
    <motion.section
      key={ApplicationFlowEnum.CREATE_APPLICATION}
      className="w-fit h-fit mx-auto"
      initial={{ x: "50vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50vw", opacity: 0 }}
      transition={{ duration: 1, ease: "linear",delay:screenDelay }}
    >
      <BackButton onClick={handleBack} />
      <Spacer size={24} />
      <form
        onSubmit={handleSubmit(handleCreateApplication)}
        className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl"
      >
        <div className="flex flex-col items-center gap-1.5">
          <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
            Create Application
          </h2>
          <p className=" text-base text-center font-normal text-[#4C689E]">
            Fill out the details below to register your new application on the
            platform.
          </p>
        </div>
        <div className="flex flex-col items-center w-full gap-4 ">
          <Controller
            name="applicationName"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  onBlur={onBlur}
                  fieldId="applicationName"
                  fieldName="Application Name"
                  value={value}
                  onChange={onChange}
                  error={error?.message ?? ""}
                />
              );
            }}
          />
          <Controller
            name="applicationName"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  onBlur={onBlur}
                  fieldId="applicationName"
                  fieldName="Application Name"
                  value={value}
                  onChange={onChange}
                  error={error?.message ?? ""}
                />
              );
            }}
          />
          <Controller
            name="upload_logo"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              //   console.log({value});

              const v = typeof value === "string" ? value : value?.name;

              return (
                <FileInput
                  fieldId="upload_logo"
                  fieldName="Upload Logo"
                  selectedFileName={v}
                  placeholder="Upload Company Logo"
                  error={error?.message ?? ""}
                  onFileSelect={(files) => {
                    // console.log({ files });
                    if (!!files) {
                      const file = files[0];
                      onChange(file);
                    }
                  }}
                />
              );
            }}
          />

          <section className="flex flex-col items-start gap-2 w-full">
            <h2 className=" text-grey-70 font-normal text-base/5">
              Data Types Requested
            </h2>
            {/* <Spacer size={16} /> */}
            <main className="w-full flex flex-wrap  gap-2">
              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={true} /> <span className="block">Email</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={!true} />{" "}
                <span className="block">Contacts</span>
              </div>
              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={true} disabled />{" "}
                <span className="block">Location</span>
              </div>

              <div className="flex items-center justify-start gap-1">
                <Checkbox checked={!true} />{" "}
                <span className="block">Others</span>
              </div>
            </main>
          </section>
          <section className="flex flex-col items-start gap-2 w-full">
            <h2 className=" text-grey-70 font-normal text-base/5">
              Purpose of Data Access
            </h2>

            <div className="w-full h-fit rounded border border-grey-30 focus-within:border-secondary-blue overflow-hidden ">
              <textarea
                placeholder="To verify and authenticate users with the right crredentials"
                className="w-full outline-none focus-within:outline-none border-none resize-none p-2"
                rows={4}
              />
            </div>
          </section>
          <PrimaryButton variant="secondary" type="submit">
            Save&nbsp;&&nbsp;Continue
          </PrimaryButton>
        </div>
      </form>
    </motion.section>
  );
};

const ApplicationListPage = () => {
  const { handleSetApplicationFlowState,applicationFlowState } = useContext(ApplicationFlowContext);

  const { isLoading:isLoadingApplications, data:applicationsData } = useGetApplications();

  
  const handleCreateApplication = () => {
    handleSetApplicationFlowState(ApplicationFlowEnum.CREATE_APPLICATION);
  };

  const screenDelay = useMemo(() => applicationFlowState === ApplicationFlowEnum.VIEW_APPLICATIONS ? 2 : 0, [applicationFlowState]);

  // console.log({screenDelay})
  console.log({ isLoading:isLoadingApplications, applicationsData });
  
  return (
    <motion.section
      // key={ApplicationFlowEnum.VIEW_APPLICATIONS}
      className={cn("w-full grid grid-cols-2 grid-flow-row gap-4  max-w-[48.75rem] mx-auto", !applicationsData || applicationsData?.data?.length === 0 && "flex items-center justify-center")}
      initial={false}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50vw", opacity: 0 }}
      transition={{ duration: 1, ease: "linear",delay:screenDelay }}
    >
      <div
        role="button"
        className="w-96 bg-primary h-[5rem] rounded-xl p-3 text-white flex items-center justify-center gap-2 mx-auto"
        onClick={handleCreateApplication}
      >
        <PlusIcon /> <span>Create Application</span>
      </div>
      {/* <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard />
      <ApplicationCard /> */}
    </motion.section>
  );
};

const ApplicationPage = () => {
  const { applicationFlowState } = useContext(ApplicationFlowContext);

  return (
    <section className="w-full">
      <AnimatePresence initial={false}>
        {applicationFlowState === ApplicationFlowEnum.VIEW_APPLICATIONS && (
          <ApplicationListPage key={ApplicationFlowEnum.VIEW_APPLICATIONS} />
        )}

        {applicationFlowState === ApplicationFlowEnum.CREATE_APPLICATION && (
          <ApplicationCreationForm
            key={ApplicationFlowEnum.CREATE_APPLICATION}
          />
        )}

        {applicationFlowState === ApplicationFlowEnum.CONFIRM_APPLICATION && (
          <ConfirmApplicationDetails
            key={ApplicationFlowEnum.CONFIRM_APPLICATION}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ApplicationPage;
