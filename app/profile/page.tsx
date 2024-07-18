"use client";

import Header from "@/components/header/header";
import { AttachmentIcon, CalenderIcon, MoreIcon } from "@/components/icons";
import PrimaryButton from "@/components/primary-button/primary-button";
import Spacer from "@/components/spacer/spacer";
import TextInput from "@/components/text-input/text-input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { Fragment, useEffect, useState } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { format as formatDate } from "date-fns";
import FileInput from "@/components/file-input/file-input";
import ProfileTable from "./components/profile-table/profile-table";
import { connectedApplications } from "@/data";
import { ConnectedApplication } from "@/lib/types";
import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Button,
  Transition,
} from "@headlessui/react";
import useToggle from "@/lib/hooks/client/use-toggle";
import DataAccessItem from "./components/data-access-item/data-access-item";
import DataAccessCheckItem from "./components/data-access-check-item/data-access-check-item";
import { useGetIndividualProfile } from "@/lib/hooks/api/queries";

interface PersonalInformationForm {
  fullname?: string;
  firstname?:string;
  lastname?:string;
  email: string;
  phone_number: string;
  home_address: string;
  country: string;
  occupation: string;
  date_of_birth?: Date | string;
  id_card?: File | string;
}



const ProfilePage = () => {
  const { toggle: toggleVdDialog, toggleState: showVdDialog } = useToggle();
  const { toggle: togglePermissionDialog, toggleState: showPermissionDialog } =
    useToggle();
  const { toggle: toggleDisconnectDialog, toggleState: showDisconnectDialog } =
    useToggle();

  const {isLoading:isLoadingIndividual,data:individualProfile} = useGetIndividualProfile();
  
  const individualProfileData: Partial<PersonalInformationForm> | null = individualProfile?.data ?? null;

  console.log({isLoadingIndividual,individualProfileData});

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    getValues,
    watch,
  } = useForm<PersonalInformationForm>({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
      fullname: "",
      phone_number: "",
      home_address: "",
      occupation: "",
      date_of_birth: "",
      id_card: "",
    },
  });

  const formValues = watch();

  console.log({formValues});



  useEffect(() => {
    if(!!individualProfileData){
      for(const key in individualProfileData){
        if(key in formValues){
          setValue(key as unknown as keyof PersonalInformationForm, individualProfileData[key as unknown as keyof PersonalInformationForm]);
        }
      }
    }
  },[individualProfileData])

  

  const handleSubmitPersonalInformation = async (
    values: PersonalInformationForm
  ) => {
    console.log({ values });
  };

  const handleViewDetails = () => {
    toggleVdDialog();
  };

  const handleManagePermissions = () => {
    togglePermissionDialog();
  };

  const handleDisconnect = () => {
    toggleDisconnectDialog();
  };

  return (
    <>
      <section className=" bg-grey-10  w-full h-full min-h-screen">
        <Header type="authed" />
        <Spacer size={24} />
        <main className=" mx-auto  max-w-[54rem] w-full">
          <section className="w-full ">
            <h2 className=" text-2xl font-bold text-secondary-black text-left">
              Personal&nbsp;information
            </h2>

            <form
              className=" w-full "
              onSubmit={handleSubmit(handleSubmitPersonalInformation)}
            >
              <div className="grid grid-cols-1 grid-rows-8 md:grid-cols-2 md:grid-rows-4 gap-4 w-full">
                <Controller
                  name="firstname"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextInput
                        fieldId="firstname"
                        fieldName="First Name"
                        value={value}
                        onChange={onChange}
                        error={errors?.fullname?.message ?? ""}
                      />
                    );
                  }}
                />
                <Controller
                  name="lastname"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextInput
                        fieldId="lastname"
                        fieldName="Last Name"
                        value={value}
                        onChange={onChange}
                        error={errors?.fullname?.message ?? ""}
                      />
                    );
                  }}
                />
                <Controller
                  name="fullname"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <TextInput
                        fieldId="fullname"
                        fieldName="Full Name"
                        value={value}
                        onChange={onChange}
                        error={errors?.fullname?.message ?? ""}
                      />
                    );
                  }}
                />

                <Controller
                  name="home_address"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <TextInput
                          fieldId="home_address"
                          fieldName="Home Address"
                          value={value}
                          onChange={onChange}
                          error={errors?.home_address?.message ?? ""}
                        />
                      </>
                    );
                  }}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <TextInput
                          fieldId="email-address"
                          fieldName="Email Address"
                          value={value}
                          onChange={onChange}
                          error={errors?.email?.message ?? ""}
                        />
                      </>
                    );
                  }}
                />

                <Controller
                  name="country"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <TextInput
                          fieldId="country"
                          fieldName="Country"
                          value={value}
                          onChange={onChange}
                        />
                      </>
                    );
                  }}
                />

                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <TextInput
                          fieldId="phone_number"
                          fieldName="Phone Number"
                          value={value}
                          error={errors?.country?.message ?? ""}
                          onChange={onChange}
                        />
                      </>
                    );
                  }}
                />

                <Controller
                  name="occupation"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <TextInput
                          fieldId="occupation"
                          fieldName="Occupation"
                          value={value}
                          onChange={onChange}
                          error={errors?.occupation?.message ?? ""}
                        />
                      </>
                    );
                  }}
                />

                <Controller
                  name="date_of_birth"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    return (
                      <>
                        <Popover>
                          <TextInput
                            fieldId="date_of_birth"
                            fieldName="Date of Birth"
                            value={formValues.date_of_birth as string}
                            onChange={() => {}}
                            error={errors?.date_of_birth?.message ?? ""}
                            placeholder="Choose Date"
                            icon={
                              <PopoverTrigger asChild>
                                <div>
                                  <CalenderIcon />
                                </div>
                              </PopoverTrigger>
                            }
                          />

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={formValues.date_of_birth as Date}
                              onSelect={(date_value) => {
                                console.log({ date_value }, "date");
                                if (!!date_value) {
                                  const date = formatDate(date_value, "PPP");
                                  setValue("date_of_birth", date);
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </>
                    );
                  }}
                />
                <Controller
                  name="id_card"
                  control={control}
                  render={({ field: { onChange, value } }) => {
                    //   console.log({value});

                    const v = typeof value === "string" ? value : value?.name;

                    return (
                      <FileInput
                        fieldId="id_card"
                        fieldName="National ID/Passport:"
                        selectedFileName={v}
                        placeholder="Upload Document"
                        error={errors?.id_card?.message ?? ""}
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
              </div>
              <Spacer size={32} />
              <PrimaryButton className=" bg-[#4169E1]">
                Save&nbsp;Changes
              </PrimaryButton>
            </form>
          </section>
          <Spacer size={32} />

          <section className=" w-full">
            <h2 className=" text-secondary-black font-bold text-2xl">
              Connected Applications
            </h2>
            <Spacer size={18} />
            <div className="bg-white border px-6 py-4 w-full rounded-3xl">
              <ProfileTable className="w-full">
                <ProfileTable.TableRow className="w-full rounded-xl border-[#0074FF1A] border-2 flex-nowrap grid grid-cols-5 grid-rows-1">
                  <ProfileTable.TableHeader className="">
                    <span>Name</span>
                  </ProfileTable.TableHeader>
                  <ProfileTable.TableHeader className="">
                    <span>Connected&nbsp;Date</span>
                  </ProfileTable.TableHeader>
                  <ProfileTable.TableHeader className="">
                    <span>Data&nbsp;Access</span>
                  </ProfileTable.TableHeader>
                  <ProfileTable.TableHeader className="">
                    <span>Last&nbsp;Accessed</span>
                  </ProfileTable.TableHeader>
                  <ProfileTable.TableHeader className="">
                    <span>Action</span>
                  </ProfileTable.TableHeader>
                </ProfileTable.TableRow>

                <main className="w-full">
                  {connectedApplications?.map(
                    (ca: ConnectedApplication, idx: number) => {
                      return (
                        <ProfileTable.TableRow
                          key={idx}
                          className="grid grid-cols-5 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full "
                        >
                          <ProfileTable.TableDetail>
                            <span>{ca.company_name}</span>
                          </ProfileTable.TableDetail>
                          <ProfileTable.TableDetail>
                            <span>{ca.connected_date}</span>
                          </ProfileTable.TableDetail>
                          <ProfileTable.TableDetail className=" whitespace-break-spaces">
                            <span>{ca.data_access}</span>
                          </ProfileTable.TableDetail>
                          <ProfileTable.TableDetail>
                            <span>{ca.last_accessed}</span>
                          </ProfileTable.TableDetail>
                          <ProfileTable.TableDetail>
                            <Popover>
                              <PopoverTrigger>
                                {" "}
                                <div className=" cursor-pointer">
                                  <MoreIcon />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className=" w-fit h-fit py-1 px-2 bg-white border-2  border-[#0074FF0D]">
                                <button
                                  className=" text-left  py-2 px-2.5 block  hover:bg-grey-30 rounded-md w-full"
                                  onClick={() => {
                                    handleViewDetails();
                                  }}
                                >
                                  <span className=" text-secondary-black font-medium text-sm/3 ">
                                    View&nbsp;Details
                                  </span>
                                </button>
                                <button
                                  className=" text-left  py-2 px-2.5 block hover:bg-grey-30 rounded-md  w-full"
                                  onClick={() => {
                                    handleManagePermissions();
                                  }}
                                >
                                  <span className=" text-secondary-black font-medium text-sm/3  truncate">
                                    Manage&nbsp;Permission
                                  </span>
                                </button>
                                <button
                                  className=" text-left  py-2 px-2.5 block  rounded-md hover:bg-danger-2 text-[#D60B0B] hover:text-black transition-colors ease-in-out duration-100  w-full"
                                  onClick={() => {
                                    handleDisconnect();
                                  }}
                                >
                                  <span className="   font-medium text-sm/3 ">
                                    Disconnect
                                  </span>
                                </button>
                              </PopoverContent>
                            </Popover>
                          </ProfileTable.TableDetail>
                        </ProfileTable.TableRow>
                      );
                    }
                  )}
                </main>
              </ProfileTable>
            </div>
          </section>
          <Spacer size={16} />
        </main>
        <Spacer size={32} />
      </section>

      <Dialog
        open={showVdDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toggleVdDialog}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-grey-100/70">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              className="w-full max-w-[26rem] rounded-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  min-h-[22rem]"
            >
              <DialogTitle
                as="h3"
                className="text-2xl/6 font-bold text-secondary-black tracking-[1%]"
              >
                Application Details
              </DialogTitle>

              <Spacer size={24} />

              <section className=" w-full flex flex-col justify-between h-max">
                <main className="flex flex-col gap-4 h-fit ">
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Application&nbsp;Name
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      Google
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Connected Date
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      June 1, 2024
                    </span>
                  </div>
                  {/* ACCESS PERMISSIONS */}
                  <div className="flex w-full items-start justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Data Access Permissions
                    </span>
                    <div className="flex flex-col items-end gap-2 max-h-32 overflow-auto custom-scroller">
                      <DataAccessItem>Read your email</DataAccessItem>
                      <DataAccessItem>Access your contacts</DataAccessItem>
                      <DataAccessItem>View your calendar</DataAccessItem>
                    </div>
                  </div>

                  <div className="flex w-full items-start justify-between gap-4">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%] block whitespace-nowrap">
                      Purpose of Access
                    </span>
                    <DataAccessItem className="text-right">
                      To sync your contacts and calendar events
                    </DataAccessItem>
                  </div>
                </main>

                <Spacer size={32} />
                <div className="mt-4 flex items-center justify-between gap-4 w-full">
                  <button
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D]"
                    // onClick={close}
                  >
                    Manage&nbsp;Permissions
                  </button>
                  <button className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1">
                    Disconnect
                  </button>
                </div>
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={showPermissionDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={togglePermissionDialog}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-grey-100/70">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              className="w-full max-w-[26rem] rounded-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  min-h-[22rem]"
            >
              <DialogTitle
                as="h3"
                className="text-2xl/6 font-bold text-secondary-black tracking-[1%]"
              >
                Manage Permissions
              </DialogTitle>

              <Spacer size={24} />

              <section className=" w-full flex flex-col justify-between h-max">
                <main className="flex flex-col gap-4 h-fit ">
                  {/* ACCESS PERMISSIONS */}
                  <div className="flex w-full items-start justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Current Permissions
                    </span>
                    <div className="flex flex-col items-end gap-2 max-h-32 overflow-auto custom-scroller">
                      <DataAccessItem>Read your email</DataAccessItem>
                      <DataAccessItem>Access your contacts</DataAccessItem>
                      <DataAccessItem>View your calendar</DataAccessItem>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Modify Permissions
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      Google
                    </span>
                  </div>

                  <div className="flex flex-col items-start  gap-2 max-h-32 overflow-auto custom-scroller">
                    <DataAccessCheckItem>Read your email</DataAccessCheckItem>
                    <DataAccessCheckItem checked>
                      Access your contacts
                    </DataAccessCheckItem>
                    <DataAccessCheckItem checked>
                      View your calendar
                    </DataAccessCheckItem>
                  </div>
                </main>

                <Spacer size={32} />
                <div className="mt-4 flex items-center justify-center gap-4 w-full">
                  <button
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D]"
                    // onClick={close}
                  >
                    Save&nbsp;Changes
                  </button>
                </div>
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* DISCONNECT DIALOG */}
      <Dialog
        open={showDisconnectDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toggleDisconnectDialog}
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
                Are you sure you want to disconnect Google
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
                    // onClick={close}
                  >
                    Manage&nbsp;Permissions
                  </button>
                  <button className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1">
                    Disconnect
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

export default ProfilePage;
