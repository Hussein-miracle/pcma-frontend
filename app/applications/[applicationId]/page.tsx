"use client";
import React, { useEffect } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import BackButton from "@/components/back-button/back-button";
import { useForm } from "react-hook-form";
import NextImage from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
// import FormContentContainer from "@/components/form-content-container/form-content-container";
import Spacer from "@/components/spacer/spacer";
import Checkbox from "@/components/checkbox/checkbox";
import { CopyIcon } from "@/components/icons";
import useToggle from "@/lib/hooks/client/use-toggle";

import ProtectServiceProviderRoute from "@/hoc/protect-service-provider-route/protect-service-provider-route";
import { useGetApplicationDetailById } from "@/lib/hooks/api/queries";
import { ApplicationCreationData, ApplicationUpdateData, DataAccessType } from "@/lib/types";
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "@/lib/validations";
import { DataAccessEnum } from "@/lib/constants";
import { handleErrorGlobal, truncateString } from "@/lib/utils";
import { useCopyToClipboard } from "@/lib/hooks/client/use-copy-to-clipboard";
import { Image } from "lucide-react";
import { usePatchApplication } from "@/lib/hooks/api/mutations";
import ButtonLoader from "@/components/button-loader/button-loader";

const ApplicationDetailsPage = ({
  params: { applicationId },
}: {
  params: { applicationId: string };
}) => {
  const [_, copyFn] = useCopyToClipboard();
  const { toggle: toggleDeactivateDialog, toggleState: showDeactivateDialog } =
    useToggle(false);

  //console.log({ applicationId });

  // const { data: applicationDetails, isLoading: isLoadingApplicationDetail } =
    // useGetApplicationDetailById(applicationId);
    const applicationDetails:any = null;

  const {mutateAsync:patchApp,isPending:isPatchingApp} = usePatchApplication();

  // //console.log({isLoadingApplicationDetail})
  const {
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Partial<ApplicationCreationData>>({
    defaultValues: {
      name: "",
      website_url: "",
      logo_url: "",
      purpose_of_access: "",
      data_access: [],
    },
    resolver: zodResolver(updateApplicationSchema),
    
  });

  const formValues = watch();
  // //console.log({ formValues });

  // useEffect(() => {
  //   if (!!applicationDetails?.data) {
  //     for (const key in applicationDetails?.data) {
  //       if (key in formValues) {
  //         setValue(
  //           key as keyof typeof formValues,
  //           applicationDetails?.data[key as keyof typeof formValues]
  //         );
  //       }
  //     }
  //   }
  // }, [applicationDetails?.data]);

  const handleAddAccessType = (access_type: DataAccessEnum) => {
    const dataToAccess =
      !!(formValues?.data_access as unknown as Array<DataAccessType>)
        ? [...(formValues?.data_access as unknown as Array<DataAccessType>)]
        : [];

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


  const handlePatchApp = async (appData:Partial<ApplicationCreationData>) => {
    try {
      const updateData:ApplicationUpdateData = {
        data_access:appData?.data_access!,
        purpose_of_access:appData?.purpose_of_access!,
      }
      
      const appPatchResponse =  await patchApp({data:updateData,applicationId});

      //console.log({appPatchResponse},'APP PATCH RESPONSE')

      // if(appPatchResponse)
    } catch (error:any) {
      handleErrorGlobal(error?.message);
    }
  }

  return (
    <section className="w-full h-full min-h-screen">
      <section className="w-full max-w-[24rem] sm:max-w-[25rem] mx-auto">
        <BackButton />
        <Spacer size={20} />
        <form onSubmit={handleSubmit(handlePatchApp)} className="w-full overflow-hidden bg-white rounded-xl border border-[#D4DAF0]">
          {/* header details */}
          <div className=" w-full bg-white  border-b border-b-[#D7E1F4] p-3 flex justify-between items-center h-[5rem]">
            <div className="h-full flex gap-x-4 items-center justify-start">
              <div className=" w-[46px] h-[46px] rounded-md overflow-hidden bg-grey-10">
                {!!formValues?.logo_url ? (
                  <NextImage
                    width={46}
                    height={46}
                    src={formValues?.logo_url}
                    alt={`${formValues?.name}'s logo`}
                    className="w-full h-full"
                  />
                ) : (
                  <Image className="w-full h-full" />
                )}
              </div>

              <div className="flex flex-col h-full items-start justify-between">
                <h2 className=" text-secondary-black font-bold text-xl">
                  {formValues?.name}
                </h2>
                {/* <p className=" font-normal text-sm/5 text-grey-90">
                  {!!applicationDetails?.data?.createdAt!
                    ? formatDate(
                        new Date(
                          applicationDetails?.data?.createdAt!
                        ).toISOString(),
                        "do, MMM yyyy"
                      )
                    : "N/A"}
                </p> */}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-[#F7F9FD] py-1 px-2 text-sm/5 font-semibold capitalize text-grey-90 border border-[#D7E1F4]">
              <span>0&nbsp;users</span>
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
                    handleAddAccessType(DataAccessEnum.LOCATION);
                  }}
                >
                  <Checkbox
                    checked={formValues?.data_access?.includes(
                      DataAccessEnum.LOCATION
                    )}
                  />{" "}
                  <span className="block">Location</span>
                </div>
                <div
                  className="flex items-center justify-start gap-1"
                  onClick={() => {
                    handleAddAccessType(DataAccessEnum.CONTACT);
                  }}
                >
                  <Checkbox
                    checked={formValues?.data_access?.includes(
                      DataAccessEnum.CONTACT
                    )}
                  />{" "}
                  <span className="block">Contact</span>
                </div>
                <div
                  className="flex items-center justify-start gap-1"
                  onClick={() => {
                    handleAddAccessType(DataAccessEnum.OTHERS);
                  }}
                >
                  <Checkbox
                    checked={formValues?.data_access?.includes(
                      DataAccessEnum.OTHERS
                    )}
                  />{" "}
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
                  value={formValues?.purpose_of_access}
                  onChange={(e) =>
                    setValue("purpose_of_access", e.target.value)
                  }
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
                      {applicationDetails?.data?.id}
                    </span>
                    <CopyIcon
                      className=" cursor-pointer"
                      onClick={() => {
                        if (!applicationDetails?.data?.id) return;
                        copyFn(applicationDetails?.data?.id);
                      }}
                    />
                  </div>
                </div>
                {/* CREDENTIAL ITEM */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <h2 className=" text-grey-70 font-normal text-base/5">
                    Secret&nbsp;Key
                  </h2>
                  <div className="w-full  bg-white rounded p-2 border border-grey-30 flex items-center justify-between">
                    <span className=" text-grey-90 text-base/5 font-normal">
                      {truncateString(
                        applicationDetails?.data?.secret_key!,
                        28
                      )}
                    </span>
                    <CopyIcon
                      className=" cursor-pointer"
                      onClick={() => {
                        if (!applicationDetails?.data?.secret_key) return;
                        copyFn(applicationDetails?.data?.secret_key);
                      }}
                    />
                  </div>
                </div>
                {/* CREDENTIAL ITEM */}
                <div className="w-full flex flex-col gap-1 items-start">
                  <h2 className=" text-grey-70 font-normal text-base/5">
                    Public&nbsp;Key
                  </h2>
                  <div className="w-full  bg-white rounded p-2 border border-grey-30 flex items-center justify-between">
                    <span className=" text-grey-90 text-base/5 font-normal">
                      {truncateString(
                        applicationDetails?.data?.public_key!,
                        28
                      )}
                    </span>
                    <CopyIcon
                      className=" cursor-pointer"
                      onClick={() => {
                        if (!applicationDetails?.data?.public_key) return;
                        copyFn(applicationDetails?.data?.public_key);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4 w-full">
                <button
                  className="flex justify-center items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D] min-w-28 min-h-8"
                  // onClick={handlePatchApp}
                  type="submit"
                  disabled={isPatchingApp}
                >
               
                  {isPatchingApp ? <ButtonLoader inverted/> :  <span>Save&nbsp;Changes</span>}
                </button>
                <button
                  className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1"
                  onClick={toggleDeactivateDialog}
                  type="button"
                >
                  Deactivate App
                </button>
              </div>
            </section>
          </main>
          {/* <Spacer size={20} /> */}
        </form>
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
            <DialogPanel className="w-full max-w-[26rem] rounded-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  h-fit">
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
    </section>
  );
};

export default ProtectServiceProviderRoute(ApplicationDetailsPage);
