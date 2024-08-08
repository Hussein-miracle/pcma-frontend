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
import { ApplicationFlowEnum, DataAccessEnum } from "@/lib/constants";
import { cn, handleErrorGlobal, sleep, successToast } from "@/lib/utils";
import ProtectServiceProviderRoute from "@/hoc/protect-service-provider-route/protect-service-provider-route";
import ApplicationCardSkeleton from "./components/application-card-skeleton/application-card-skeleton";
import ErrorMessage from "@/components/error-message/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { createApplicationSchema } from "@/lib/validations";
import { usePostCreateApplication } from "@/lib/hooks/api/mutations";

const ConfirmApplicationDetails = () => {
  const { handleSetApplicationFlowState, applicationFlowState } = useContext(
    ApplicationFlowContext
  );
  const screenDelay = useMemo(
    () =>
      applicationFlowState === ApplicationFlowEnum.CONFIRM_APPLICATION
        ? 1.5
        : 0,
    [applicationFlowState]
  );

  // console.log({screenDelay})

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
  const { handleSetApplicationFlowState, applicationFlowState } = useContext(
    ApplicationFlowContext
  );

  const { mutateAsync: createApplication, isPending: isCreatingApplication } =
    usePostCreateApplication();

  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationCreationData>({
    defaultValues: {
      name: "",
      website_url: "",
      logo_url: "",
      purpose_of_access: "",
      data_access: [],
    },
    resolver: zodResolver(createApplicationSchema),
  });

  const formValues = watch();

  console.log({ formValues });

  const screenDelay = useMemo(
    () =>
      applicationFlowState === ApplicationFlowEnum.CREATE_APPLICATION ? 1.5 : 0,
    [applicationFlowState]
  );

  console.log({ screenDelay });

  const handleCreateApplication = async (values: ApplicationCreationData) => {
    console.log({ values });
    try {
      const appResponse = await createApplication(values);
      console.log({ appResponse }, "APP RESPONSE");
      if (appResponse?.status === 201) {
        successToast(
          appResponse?.message ?? "Application created successfully"
        );
        handleSetApplicationFlowState(ApplicationFlowEnum.CONFIRM_APPLICATION);
      } else {
        throw new Error(appResponse?.message ?? "An error occured while creating application");
      }
    } catch (error: any) {
      const errorMsg = error?.response?.message;
      handleErrorGlobal(errorMsg ?? error?.message ?? "An error occured");
    }
    // await sleep(500);
  };

  const handleBack = () => {
    handleSetApplicationFlowState(ApplicationFlowEnum.VIEW_APPLICATIONS);
  };

  const handleAddAccessType = (access_type: DataAccessEnum) => {
    const dataToAccess = [...formValues?.data_access];
    const dataToAccessIndex = dataToAccess?.findIndex(
      (dt) => dt === access_type
    );

    if (dataToAccessIndex > -1) {
      dataToAccess.splice(dataToAccessIndex, 1);
    } else {
      dataToAccess.push(access_type);
    }

    setValue("data_access", [...dataToAccess]);
  };

  return (
    <motion.section
      key={ApplicationFlowEnum.CREATE_APPLICATION}
      className="w-fit h-fit mx-auto"
      initial={{ x: "50vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50vw", opacity: 0 }}
      transition={{ duration: 1, ease: "linear", delay: screenDelay }}
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
            name="name"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  onBlur={onBlur}
                  fieldId="name"
                  fieldName="Application Name"
                  value={value}
                  onChange={onChange}
                  error={error?.message ?? ""}
                />
              );
            }}
          />
          <Controller
            name="website_url"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  onBlur={onBlur}
                  fieldId="website_url"
                  fieldName="Website URL"
                  value={value}
                  onChange={onChange}
                  error={error?.message ?? ""}
                />
              );
            }}
          />
          <Controller
            name="logo_url"
            control={control}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => {
              return (
                <TextInput
                  onBlur={onBlur}
                  fieldId="logo_url"
                  fieldName="Logo URL"
                  value={value}
                  onChange={onChange}
                  error={error?.message ?? ""}
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
              <div
                className="flex items-center justify-start gap-1"
                onClick={() => {
                  handleAddAccessType(DataAccessEnum.EMAIL);
                }}
              >
                <Checkbox
                  checked={formValues?.data_access?.includes(
                    DataAccessEnum.EMAIL
                  )}
                />{" "}
                <span className="block">Email</span>
              </div>
              <div
                className="flex items-center justify-start gap-1"
                onClick={() => {
                  handleAddAccessType(DataAccessEnum.CONTACTS);
                }}
              >
                <Checkbox
                  checked={formValues.data_access.includes(
                    DataAccessEnum.CONTACTS
                  )}
                />{" "}
                <span className="block">Contacts</span>
              </div>
              <div
                className="flex items-center justify-start gap-1"
                onClick={() => {
                  handleAddAccessType(DataAccessEnum.LOCATION);
                }}
              >
                <Checkbox
                  checked={formValues.data_access.includes(
                    DataAccessEnum.LOCATION
                  )}
                  // disabled
                />{" "}
                <span className="block">Location</span>
              </div>

              <div
                className="flex items-center justify-start gap-1"
                onClick={() => {
                  handleAddAccessType(DataAccessEnum.OTHERS);
                }}
              >
                <Checkbox
                  checked={formValues.data_access.includes(
                    DataAccessEnum.OTHERS
                  )}
                />{" "}
                <span className="block">Others</span>
              </div>
            </main>

            {errors.data_access?.message && (
              <ErrorMessage text={errors?.data_access?.message} />
            )}
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

            {errors?.purpose_of_access?.message && (
              <ErrorMessage text={errors?.purpose_of_access?.message} />
            )}
          </section>
          <PrimaryButton
            loading={isCreatingApplication}
            disabled={isCreatingApplication}
            variant="secondary"
            type="submit"
          >
            Save&nbsp;&&nbsp;Continue
          </PrimaryButton>
        </div>
      </form>
    </motion.section>
  );
};

const ApplicationListPage = () => {
  const { handleSetApplicationFlowState, applicationFlowState } = useContext(
    ApplicationFlowContext
  );

  const { isLoading: isLoadingApplications, data: applicationsData } =
    useGetApplications();

  const handleCreateApplication = () => {
    handleSetApplicationFlowState(ApplicationFlowEnum.CREATE_APPLICATION);
  };

  const screenDelay = useMemo(
    () =>
      applicationFlowState === ApplicationFlowEnum.VIEW_APPLICATIONS ? 0 : 1.5,
    [applicationFlowState]
  );

  // console.log({screenDelay})
  console.log({ isLoading: isLoadingApplications, applicationsData });

  return (
    <motion.section
      // key={ApplicationFlowEnum.VIEW_APPLICATIONS}
      className={cn(
        "w-full max-w-[48.75rem] mx-auto",
        // ((!applicationsData?.data || applicationsData?.data?.length === 0) && !isLoadingApplications) ? "flex gap-4 items-center justify-center" : ' grid grid-cols-2 grid-flow-row gap-4 '
        "",
        "grid  grid-cols-1 sm:grid-cols-2 grid-flow-row gap-3 sm:gap-4"
      )}
      initial={{ x: "50vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50vw", opacity: 0 }}
      transition={{ duration: 1, ease: "linear", delay: screenDelay }}
    >
      <div
        role="button"
        className="w-96 bg-primary h-[5rem] rounded-xl p-3 text-white flex items-center justify-center gap-2 mx-auto"
        onClick={handleCreateApplication}
      >
        <PlusIcon /> <span>Create Application</span>
      </div>

      {!isLoadingApplications &&
        !!applicationsData?.data &&
        applicationsData?.data?.length > 0 &&
        applicationsData?.data?.map((application, idx) => {
          return <ApplicationCard key={idx} application={application} />;
        })}

      {isLoadingApplications && (
        <>
          <ApplicationCardSkeleton />
          <ApplicationCardSkeleton />
          <ApplicationCardSkeleton />
          <ApplicationCardSkeleton />
        </>
      )}
    </motion.section>
  );
};

const ApplicationsPage = () => {
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

export default ProtectServiceProviderRoute(ApplicationsPage, "/overview");
