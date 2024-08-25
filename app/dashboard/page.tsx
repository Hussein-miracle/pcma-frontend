"use client";

import { useGetServiceProviderDashboard } from "@/lib/hooks/api/queries";
import React from "react";
import AuditTrailTable from "../audit-trail/components/audit-trail-table/audit-trail-table";
import { MoreIcon } from "@/components/icons";
import Spacer from "@/components/spacer/spacer";
import { cn, errorToast } from "@/lib/utils";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@radix-ui/react-popover";
import { formatDate } from "date-fns";
import { SearchIcon, FilterIcon, CheckIcon } from "lucide-react";
import { useAppRouter } from "@/lib/hooks/client/use-app-router";
import { Activity } from "@/lib/types";

const DashboardPage = () => {
  const router = useAppRouter();
  const { data: spDashboard, isLoading: isLoadingSpDashboard } =
    useGetServiceProviderDashboard();

  console.log({ spDashboard, isLoadingSpDashboard });

  const handleMakeRequest = async () => {};

  const handleViewTrail = (at: Activity) => {
    if (at.status?.toLowerCase() === "approved") {
      router.push(`/dashboard/requests/${at?.uuid!}`);
    } else {
      errorToast("Request is yet to be approved.");
    }
  };

  return (
    <section className=" pt-8  mx-auto w-full max-w-[48rem] px-4">
      <Spacer size={18} />
      <main className="bg-white border px-6 py-4 w-full rounded-3xl">
        <AuditTrailTable className="w-full">
          <AuditTrailTable.TableRow className="w-full rounded-xl border-[#0074FF1A] border-2 grid grid-cols-7 grid-rows-1 ">
            <AuditTrailTable.TableHeader className="col-span-2">
              <span>Activity </span>
            
            </AuditTrailTable.TableHeader>
            <AuditTrailTable.TableHeader className="col-span-2">
              <span>Date&nbsp;and&nbsp;Time</span>
            </AuditTrailTable.TableHeader>
            <AuditTrailTable.TableHeader className="">
             
              <span>Status</span>
            </AuditTrailTable.TableHeader>
            <AuditTrailTable.TableHeader className="-ml-2">
              <span>Expiration</span>
            </AuditTrailTable.TableHeader>
            <AuditTrailTable.TableHeader className="">
             
              <span>Action</span>
            </AuditTrailTable.TableHeader>
          </AuditTrailTable.TableRow>

          <main
            className={cn(
              "w-full custom-scroller overflow-auto h-[35rem]",
              isLoadingSpDashboard && " flex flex-col gap-4"
            )}
          >
            {!!spDashboard &&
              spDashboard?.length > 0 &&
              !isLoadingSpDashboard &&
              spDashboard?.map((audit_trail, idx: number) => {
                return (
                  <AuditTrailTable.TableRow
                    key={audit_trail?.uuid}
                    className="grid grid-cols-7 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full gap-1.5 "
                  >
                    <AuditTrailTable.TableDetail className="col-span-2">
                      <span>{audit_trail?.user_name}</span>
                    </AuditTrailTable.TableDetail>

                    <AuditTrailTable.TableDetail className="col-span-2">
                      <span>
                        {!!audit_trail?.requested_on
                          ? formatDate(
                              audit_trail?.requested_on!,
                              "yyyy-MM-d, h:mm a"
                            )
                          : "N/A"}
                      </span>
                    </AuditTrailTable.TableDetail>

                    <AuditTrailTable.TableDetail
                      className={cn(
                        "whitespace-break-spaces mt-2 col-span-1 p-1 rounded-md w-24 h-7 flex items-center justify-center",

                        audit_trail?.status?.toLowerCase() === "pending" &&
                          "bg-secondary-blue/80 text-white ",

                        audit_trail?.status?.toLowerCase() === "approved" &&
                          "bg-secondary-green/80 text-white",

                        audit_trail?.status?.toLowerCase() === "rejected" &&
                          " bg-danger-1/80 text-white"

                      )}
                    >
                      <span>{audit_trail?.status}</span>
                    </AuditTrailTable.TableDetail>

                    <AuditTrailTable.TableDetail
                      className={cn(
                        " whitespace-break-spaces  mb-4 mx-1 flex items-center justify-center",

                        audit_trail?.is_valid &&
                          "text-secondary-blue/80",




                        audit_trail?.is_valid === false &&
                          " text-danger-1/80"
                      )}
                    >
                      <span className="  lowercase mt-0.5">{audit_trail?.is_valid ?  'active' :  'expired'}</span>
                    </AuditTrailTable.TableDetail>
       
                    <AuditTrailTable.TableDetail className="pl-6">
                      <Popover>
                        <PopoverTrigger>
                          <div className=" cursor-pointer">
                            <MoreIcon />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className=" w-fit h-fit p-0 bg-white border-2  rounded border-[#0074FF0D]">
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
                        </PopoverContent>
                      </Popover>
                    </AuditTrailTable.TableDetail>
                  </AuditTrailTable.TableRow>
                );
              })}

            {isLoadingSpDashboard && (
              <>
                <AuditTrailTable.TableRow
                  key={"1"}
                  className="grid grid-cols-6 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full "
                >
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                </AuditTrailTable.TableRow>
                <AuditTrailTable.TableRow
                  key={"12"}
                  className="grid grid-cols-6 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full "
                >
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                </AuditTrailTable.TableRow>
                <AuditTrailTable.TableRow
                  key={"13"}
                  className="grid grid-cols-6 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full "
                >
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                </AuditTrailTable.TableRow>
                <AuditTrailTable.TableRow
                  key={"14"}
                  className="grid grid-cols-6 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full "
                >
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                </AuditTrailTable.TableRow>
                <AuditTrailTable.TableRow
                  key={"15"}
                  className="grid grid-cols-6 grid-rows-1 border-b-2 border-b-[#0074FF0D] w-full "
                >
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-2" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                  <AuditTrailTable.TableDetailLoaderItem className="col-span-1" />{" "}
                </AuditTrailTable.TableRow>
              </>
            )}

            {((!!spDashboard && spDashboard?.length <= 0) || !spDashboard) &&
              !isLoadingSpDashboard && (
                <div className="w-full flex items-center justify-center min-h-32">
                  <p className=" text-secondary-black  font-bold text-lg">
                    You have no activities at the moment.
                  </p>
                </div>
              )}
          </main>
        </AuditTrailTable>
      </main>
    </section>
  );
};

export default DashboardPage;
