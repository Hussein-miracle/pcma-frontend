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
import React, { Fragment, useState } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import { format as formatDate } from "date-fns";
import { Matcher } from "react-day-picker";
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

interface PersonalInformationForm {
  fullname: string;
  email: string;
  phone_number: string;
  home_address: string;
  country: string;
  occupation: string;
  date_of_birth: Date | string;
  id_card: File | string;
}

const ProfilePage = () => {
  const [date, setDate] = useState<Date>();
  const { toggle: toggleVdDialog, toggleState: showVdDialog } = useToggle(true);

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
      fullname: "",
      phone_number: "",
      home_address: "",
      occupation: "",
      date_of_birth: "",
      id_card: "",
    },
  });

  const values = watch();

  const handleSubmitPersonalInformation = async (
    values: PersonalInformationForm
  ) => {
    console.log({ values });
  };

  const handleViewDetails = () => {
    toggleVdDialog();
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
              <div className="grid grid-cols-2 grid-rows-4 gap-4 w-full">
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
                            value={values.date_of_birth as string}
                            onChange={() => {}}
                            placeholder="Choose Date"
                            icon={
                              <PopoverTrigger asChild>
                                <button type="button">
                                  <CalenderIcon />
                                </button>
                              </PopoverTrigger>
                            }
                          />

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={values.date_of_birth as Date}
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
                        // value={value?.name ?? ''}
                        selectedFileName={v}
                        placeholder="Upload Document"
                        onFileSelect={(files) => {
                          console.log({ files });
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
                                <button type="button">
                                  <MoreIcon />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className=" w-fit h-fit py-1 bg-white border-2  border-[#0074FF0D]">
                                <button
                                  className=" text-left  py-2 px-2.5 block"
                                  onClick={() => {
                                    handleViewDetails();
                                  }}
                                >
                                  <span className=" text-secondary-black font-medium text-sm/3 ">
                                    View&nbsp;Details
                                  </span>
                                </button>
                                <button className=" text-left  py-2 px-2.5 block">
                                  <span className=" text-secondary-black font-medium text-sm/3  truncate">
                                    Manage&nbsp;Permission
                                  </span>
                                </button>
                                <button className=" text-left  py-2 px-2.5 block">
                                  <span className=" text-[#D60B0B] font-medium text-sm/3 ">
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
        </main>
      </section>
    </>
  );
};

export default ProfilePage;
