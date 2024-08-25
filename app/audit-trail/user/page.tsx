"use client";

import React, { Fragment, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Header from "@/components/header/header";
import Spacer from "@/components/spacer/spacer";
import AuditTrailTable from "../components/audit-trail-table/audit-trail-table";
import DataAccessItem from "../../profile/components/data-access-item/data-access-item";
import { CheckIcon, FilterIcon, MoreIcon, SearchIcon } from "@/components/icons";
// import { auditTrails } from "@/data";
import { Activity, AuditTrail } from "@/lib/types";
import useToggle from "@/lib/hooks/client/use-toggle";
import { cn } from "@/lib/utils";
import { useGetIndividualDashboard, useGetIndividualDashboardActivities } from "@/lib/hooks/api/queries";
import { RoleEnum } from "@/lib/constants";
import { AppRootState } from "@/rtk/app/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import ProtectUserRoute from "@/hoc/protect-user-route/protect-user-route";
import { formatDate } from "date-fns";

const people = [
  { id: 1, name: "Tom Cook" },
  { id: 2, name: "Wade Cooper" },
  { id: 3, name: "Tanya Fox" },
  { id: 4, name: "Arlene Mccoy" },
  { id: 5, name: "Devon Webb" },
];

const AuditTrailPage = () => {
  const role = useSelector((state:AppRootState) => state.auth.role);
  
  const { toggle: toggleVdDialog, toggleState: showVdDialog } = useToggle();
  const [selected, setSelected] = useState(people[1]);
  const [query, setQuery] = useState<string>("");
  const [currentViewActivity,setCurrentViewActivity] = useState<Activity | null>(null);


  const {isLoading:isLoadingIndividualDashboardActivities,data:individualDashboardActivities} =  useGetIndividualDashboardActivities();

  //console.log({individualDashboardActivities,isLoadingIndividualDashboardActivities})


  const handleViewTrail = (trail: Activity) => {
    // //console.log({ trail });
    setCurrentViewActivity(trail);

    toggleVdDialog();
  };



  return (
    <Fragment>
      <section className="bg-grey-10 w-full h-full min-h-screen">
        <Header type="authed" roleType={'end_user'} />

        <main className=" pt-8 mx-auto w-full max-w-[756px]">
          <h2 className=" font-bold text-2xl/9 text-center max-w-lg mx-auto">
            Track and review all actions related to your data privacy and
            consents.
          </h2>
          <Spacer size={24} />
          <section className="  mx-auto w-full">
            <div className="items-center justify-between gap-4  hidden">
              <div className="w-full h-[3.125rem] bg-white border-grey-30 border rounded-3xl relative focus-within:border-grey-60 transition-colors ease-in-out duration-150 overflow-hidden drop-shadow-lg">
                <input
                  type="text"
                  placeholder="Search Transaction"
                  value={query}
                  onChange={(e) => {
                    const value = e.target.value;
                    setQuery(value);
                  }}
                  className=" w-full h-full outline-none border-none focus:outline-none  text-base/5 font-normal py-2.5 px-4 text-grey-60 placeholder:text-secondary-black transition-colors ease-in-out duration-150 "
                />
                <button className=" absolute top-3 right-3 pointer-events-none">
                  <SearchIcon />
                </button>
              </div>

              <Listbox value={selected} onChange={setSelected} >
                <ListboxButton
                  className={cn(
                    "relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-sm/6 text-white",
                    // "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    "bg-white border py-2.5 px-4 flex items-center gap-2 border-grey-30 w-fit h-[3.125rem] rounded-3xl drop-shadow-lg cursor-pointer"
                  )}
                >
                  <span className=" font-normal text-grey-60 text-base/5 text-nowrap">
                    {selected?.name ?? "Filter"}
                  </span>{" "}
                  <FilterIcon />
                </ListboxButton>
                <ListboxOptions
                  anchor="bottom"
             
                  className={cn(
                    "w-[10rem] rounded-xl border border-white/5 bg-white p-1 [--anchor-gap:8px] focus:outline-none",
                    "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
                  )}
                >
                  {people.map((person) => (
                    <ListboxOption
                      key={person.name}
                      value={person}
                      className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none  hover:bg-grey-30 w-full "
                    >
                      <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      <div className="text-sm/6  text-grey-60">{person.name}</div>
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>

            <Spacer size={18} />
            <main className="bg-white border px-6 py-4 w-full rounded-3xl">
              <AuditTrailTable className="w-full">
                <AuditTrailTable.TableRow className="w-full rounded-xl border-[#0074FF1A] border-2 flex-nowrap grid grid-cols-5 grid-rows-1">
                  <AuditTrailTable.TableHeader className="col-span-2">
                    <span>Activity </span>
                    {/* <span>Application </span> */}
                  </AuditTrailTable.TableHeader>
                  <AuditTrailTable.TableHeader className="col-span-2">
                    <span>Date&nbsp;and&nbsp;Time</span>
                  </AuditTrailTable.TableHeader>
                  <AuditTrailTable.TableHeader className="">
                    {/* <span>Action&nbsp;Type</span> */}
                    <span>Action</span>
                  </AuditTrailTable.TableHeader>
                  {/* <AuditTrailTable.TableHeader className="">
                    <span>Action</span>
                  </AuditTrailTable.TableHeader> */}
                </AuditTrailTable.TableRow>

                <main className="w-full custom-scroller overflow-auto h-[35rem]">
                  {individualDashboardActivities?.map((audit_trail: Activity, idx: number) => {
                    return (
                      <AuditTrailTable.TableRow
                        key={idx}
                        className="grid grid-cols-5 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full "
                      >
                        <AuditTrailTable.TableDetail className="col-span-2">
                          <span>{audit_trail?.message}</span>
                        </AuditTrailTable.TableDetail>
                        <AuditTrailTable.TableDetail className="col-span-2">
                          <span>{!!audit_trail?.created_on ?  formatDate(audit_trail?.created_on!,'yyyy-MM-d, h:mm a') : 'N/A'}</span>
                        </AuditTrailTable.TableDetail>
                        {/* <AuditTrailTable.TableDetail className=" whitespace-break-spaces col-span-1">
                          <span>{audit_trail?.viewed_by_name}</span>
                        </AuditTrailTable.TableDetail> */}
                        <AuditTrailTable.TableDetail className=" pl-6">
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
                                  handleViewTrail(audit_trail);
                                }}
                              >
                                <span className=" text-secondary-black font-medium text-sm/3 ">
                                  View&nbsp;Details
                                </span>
                              </button>
                              {/* <button
                                className=" text-left  py-2 px-2.5 block hover:bg-grey-30 rounded-md  w-full"
                                onClick={() => {
                                  // handleManagePermissions();
                                }}
                              >
                                <span className=" text-secondary-black font-medium text-sm/3  truncate">
                                  Acknowlegde
                                </span>
                              </button>
                              <button
                                className=" text-left  py-2 px-2.5 block  rounded-md hover:bg-danger-2 text-[#D60B0B] hover:text-black transition-colors ease-in-out duration-100  w-full"
                                onClick={() => {
                                  // handleDisconnect();
                                }}
                              >
                                <span className="   font-medium text-sm/3 ">
                                  Revoke
                                </span>
                              </button> */}
                            </PopoverContent>
                          </Popover>
                        </AuditTrailTable.TableDetail>
                      </AuditTrailTable.TableRow>
                    );
                  })}
                </main>
              </AuditTrailTable>
            </main>
          </section>
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
            
              className="w-full max-w-[26rem] rounded-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  min-h-[14rem]"
            >
              <DialogTitle
                as="h3"
                className="text-2xl/6 font-bold text-secondary-black tracking-[1%]"
              >
                Activity Details
              </DialogTitle>

              <Spacer size={24} />

              <section className=" w-full flex flex-col justify-between h-max">
                <main className="flex flex-col gap-4 h-fit ">
                  {/* <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Application&nbsp;Name
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      Google
                    </span>
                  </div> */}
                  {/* <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Date and Time
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      2024-06-11 14:23
                    </span>
                  </div> */}
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Message
                    </span>
                    <p className=" text-sm/[14px] font-medium tracking-[1%]">
                      {currentViewActivity?.message}
                    </p>
                  </div>
                  {/* <div className="flex w-full items-start justify-between gap-4">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%] whitespace-nowrap">
                      Granted Access to
                    </span>
                    <div className="flex flex-wrap items-center justify-end gap-2 custom-scroller max-h-[10rem] h-fit overflow-auto">
                      <DataAccessItem>Email</DataAccessItem>
                      <DataAccessItem>Contacts</DataAccessItem>
                    </div>
                  </div>

                  <div className="flex w-full items-start justify-between gap-4">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%] block whitespace-nowrap">
                      Status
                    </span>

                    <span
                      className={cn(
                        "text-[#007836] font-medium capitalize text-sm/[14px] tracking-[1%]"
                      )}
                    >
                      Completed
                    </span>
                  </div> */}
                </main>

                {/* <Spacer size={32} /> */}
                {/* <div className="mt-4 flex items-center justify-between gap-4 w-full">
                  <button
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D]"
                    // onClick={close}
                  >
                    Acknowledge
                  </button>
                  <button className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1">
                    Revoke
                  </button>
                </div> */}
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      {/* <Dialog
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
                      Date and Time
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      2024-06-11 14:23
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Action Type
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      Consent Give
                    </span>
                  </div>
                  <div className="flex w-full items-start justify-between gap-4">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%] whitespace-nowrap">
                      Granted Access to
                    </span>
                    <div className="flex flex-wrap items-center justify-end gap-2 custom-scroller max-h-[10rem] h-fit overflow-auto">
                      <DataAccessItem>Email</DataAccessItem>
                      <DataAccessItem>Contacts</DataAccessItem>
                    </div>
                  </div>

                  <div className="flex w-full items-start justify-between gap-4">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%] block whitespace-nowrap">
                      Status
                    </span>

                    <span
                      className={cn(
                        "text-[#007836] font-medium capitalize text-sm/[14px] tracking-[1%]"
                      )}
                    >
                      Completed
                    </span>
                  </div>
                </main>

                <Spacer size={32} />
                <div className="mt-4 flex items-center justify-between gap-4 w-full">
                  <button
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D]"
                    // onClick={close}
                  >
                    Acknowledge
                  </button>
                  <button className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1">
                    Revoke
                  </button>
                </div>
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog> */}
    </Fragment>
  );
};

export default ProtectUserRoute(AuditTrailPage,'/audit-trail/service-provider');
