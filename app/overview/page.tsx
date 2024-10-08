"use client";

import React, { Fragment } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import OverviewSummaryCard from "./components/overview-summary-card/overview-summary-card";
import Header from "@/components/header/header";
import Spacer from "@/components/spacer/spacer";
import OverviewTable from "./components/overview-table/overview-table";
import OverviewItem from "./components/overview-item/overview-item";
import DataAccessItem from "../profile/components/data-access-item/data-access-item";
import {
  CheckSquareBrokenIcon,
  EmptyItemsIcon,
  InformationCircleContainedIcon,
} from "@/components/icons";

import useToggle from "@/lib/hooks/client/use-toggle";
import { OverviewActivity, PendingRequest } from "@/lib/types";
// import { overviewActivities } from "@/data";
import { cn, handleErrorGlobal, plusJakartaSans, successToast } from "@/lib/utils";
import {
  useGetIndividualOverview,
  useGetIndividualOverviewActivities,
  useGetIndividualPendingRequests,
} from "@/lib/hooks/api/queries";
import { RoleEnum } from "@/lib/constants";
import { AppRootState } from "@/rtk/app/store";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import ProtectUserRoute from "@/hoc/protect-user-route/protect-user-route";
import PrimaryButton from "@/components/primary-button/primary-button";
import { formatDate } from "date-fns";
import { usePatchUserRequest } from "@/lib/hooks/api/mutations";
import ButtonLoader from "@/components/button-loader/button-loader";

const Overview = () => {
  const role = useSelector((state: AppRootState) => state.auth.role);
  const basicPiiSaved = useSelector(
    (state: AppRootState) => state.individual.basic_pii_saved
  );
  const personalPiiSaved = useSelector(
    (state: AppRootState) => state.individual.personal_pii_saved
  );

  const [currentView, setCurrentView] = React.useState<OverviewActivity | null>(
    null
  );

  const [currentViewRequest, setCurrentViewRequest] =
    React.useState<PendingRequest | null>(null);

  const {
    toggle: toggleRequestDetailsDialog,
    toggleState: showRequestDetailsDialog,
  } = useToggle();
  const { toggle: toggleVdDialog, toggleState: showVdDialog } = useToggle();

  const { data: overviewData, isLoading: isLoadingOverview } =
    useGetIndividualOverview();

  const { isLoading: isLoadingActivities, data: activities_data } =
    useGetIndividualOverviewActivities();

  const { isLoading: isLoadingPendingRequests, data: pending_requests_data } =
    useGetIndividualPendingRequests();

    const {mutateAsync:handlePatchRequest,isPending:isPatchingRequest} = usePatchUserRequest();
  // //console.log({ overviewData, isLoadingOverview });

  // //console.log({activities_data,isLoadingActivities})

  //console.log({ pending_requests_data, isLoadingPendingRequests });

  const handleViewActivity = (activity: OverviewActivity) => {
    //console.log({ activity });
    setCurrentView(activity);
    // toggleVdDialog();
  };

  const handleViewRequestDetails = (request: PendingRequest) => {
    // //console.log({request})
    setCurrentViewRequest(request);

    toggleRequestDetailsDialog();
  };


  const handleApproveRequest =  async () => {
    if(!currentViewRequest || !currentViewRequest?.uuid) return;

    try {
      const approvedResponse = await handlePatchRequest({data:{status:'approved'},requestId:currentViewRequest?.uuid});
      //console.log({approvedResponse})     
      if(!!approvedResponse){
        successToast("Request approved successfully");
        toggleRequestDetailsDialog();
      } 
    } catch (error:any) {
      let errorMsg =  "An error occurred";
      // //console.log({errorLogin:error})
      if(error instanceof Error){
        errorMsg = error?.message;
      }else{
        if(error?.response?.data?.message){
          errorMsg =  error?.response?.data?.message ;
        }
      }
      // //console.log({errorMsg})
      handleErrorGlobal(errorMsg);
    }

  }

  const handleRejectRequest =  async () => {
    if(!currentViewRequest || !currentViewRequest?.uuid) return;


    try {
      const rejectedResponse = await handlePatchRequest({data:{status:'rejected'},requestId:currentViewRequest?.uuid});  
      //console.log({rejectedResponse})
      if(!!rejectedResponse){
        successToast("Request rejected successfully");
        toggleRequestDetailsDialog();
      }
    } catch (error:any) {
      let errorMsg =  "An error occurred";
      // //console.log({errorLogin:error})
      if(error instanceof Error){
        errorMsg = error?.message;
      }else{
        if(error?.response?.data?.message){
          errorMsg =  error?.response?.data?.message ;
        }
      }
      // //console.log({errorMsg})
      handleErrorGlobal(errorMsg);
    }


  }

  return (
    <Fragment>
      <section className="bg-grey-10 w-full h-full min-h-screen">
        <Header type="authed" roleType="end_user" />
        <main className="w-full mx-auto  px-6 py-4 md:pt-[4rem] md:px-[7.5rem]">
          <div className="w-full flex items-center justify-between">
            {!basicPiiSaved && (
              <PrimaryButton>Set&nbsp;Basic&nbsp;PII</PrimaryButton>
            )}
            {!personalPiiSaved && basicPiiSaved && (
              <PrimaryButton>Set&nbsp;Personal&nbsp;PII</PrimaryButton>
            )}
          </div>
          <Spacer size={24} />
          <div className="w-full bg-white border-2 border-[#0074FF1A] border-solid rounded-3xl grid grid-cols-1 md:grid-cols-4  gap-6 p-4 md:h-44">
            <OverviewSummaryCard
              title="Approved&nbsp;Requests"
              loading={isLoadingOverview}
              value={overviewData?.approved ?? 0}
              icon={<CheckSquareBrokenIcon stroke="#01F971" />}
            />
            <OverviewSummaryCard
              title="Pending&nbsp;requests"
              loading={isLoadingOverview}
              value={overviewData?.pending ?? 0}
              icon={<CheckSquareBrokenIcon stroke="#F9B401" />}
            />
            <OverviewSummaryCard
              title="Rejected&nbsp;requests"
              loading={isLoadingOverview}
              value={overviewData?.rejected ?? 0}
              icon={<CheckSquareBrokenIcon stroke="#F90101" />}
            />
            <OverviewSummaryCard
              title="Data&nbsp;Leaks"
              loading={isLoadingOverview}
              value={overviewData?.data_leaks ?? 0}
              icon={<InformationCircleContainedIcon />}
            />
          </div>

          <Spacer size={32} />

          <section className="w-full h-fit  md:h-[25rem] grid grid-cols-1 md:grid-cols-[2fr_1fr]  md:grid-rows-1 gap-8">
            <div className="w-full hidden md:block h-fit md:h-full bg-white border-[#0074FF1A] border-2 border-solid p-6  rounded-3xl">
              <div className="flex items-center justify-between">
                <h2 className="text-secondary-black text-base/4 font-semibold  tracking-[1%]">
                  Recents Activities
                </h2>
                <button className=" text-primary  text-base/4 font-semibold  tracking-[1%] outline-none border-none focus:outline-none">
                  View All Activities
                </button>
              </div>

              <OverviewTable>
                <OverviewTable.TableRow className="w-full rounded-xl border-[#0074FF1A] border-2">
                  {/* <OverviewTable.TableHeader>
                    <span>Name</span>
                  </OverviewTable.TableHeader> */}
                  <OverviewTable.TableHeader className=" col-span-2">
                    <span>Date</span>
                  </OverviewTable.TableHeader>
                  <OverviewTable.TableHeader className=" col-span-2">
                    <span>Activity</span>
                  </OverviewTable.TableHeader>
                  {/* <OverviewTable.TableHeader>
                    <span>View</span>
                  </OverviewTable.TableHeader> */}
                </OverviewTable.TableRow>

                <div className="w-full overflow-x-hidden overflow-y-scroll custom-scroller h-64">
                  {!!activities_data &&
                  activities_data?.length > 0 &&
                  isLoadingActivities === false
                    ? activities_data?.map(
                        (overviewItem: OverviewActivity, index: number) => {
                          return (
                            <OverviewTable.TableRow
                              key={index}
                              className="border-b-2 border-b-[#0074FF0D] w-full"
                            >
                              {/* <OverviewTable.TableDetail>
                                {overviewItem.name}
                              </OverviewTable.TableDetail> */}
                              <OverviewTable.TableDetail className=" col-span-2">
                                {formatDate(
                                  overviewItem?.created_on,
                                  "yyyy-MM-dd, hh:mm a"
                                )}
                              </OverviewTable.TableDetail>
                              <OverviewTable.TableDetail className=" col-span-2">
                                {overviewItem?.message}
                              </OverviewTable.TableDetail>
                              {/* <OverviewTable.TableDetail type="action">
                                <button
                                  className=" outline-none border-none focus:outline-none bg-transparent "
                                  onClick={() => {

                                    handleViewActivity(overviewItem);
                                  }}
                                >
                                  <span className="!text-primary">View</span>
                                </button>
                              </OverviewTable.TableDetail> */}
                            </OverviewTable.TableRow>
                          );
                        }
                      )
                    : null}

                  {isLoadingOverview ? (
                    <>
                      <OverviewTable.TableRow className="border-b-2 border-b-[#0074FF0D] w-full">
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        <OverviewTable.TableDetailLoaderItem />
                        <OverviewTable.TableDetailLoaderItem />
                      </OverviewTable.TableRow>
                      <OverviewTable.TableRow className="border-b-2 border-b-[#0074FF0D] w-full">
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        <OverviewTable.TableDetailLoaderItem />
                        <OverviewTable.TableDetailLoaderItem />
                      </OverviewTable.TableRow>
                      <OverviewTable.TableRow className="border-b-2 border-b-[#0074FF0D] w-full">
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        <OverviewTable.TableDetailLoaderItem />
                        <OverviewTable.TableDetailLoaderItem />
                      </OverviewTable.TableRow>
                      <OverviewTable.TableRow className="border-b-2 border-b-[#0074FF0D] w-full">
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        {/* <OverviewTable.TableDetailLoaderItem /> */}
                        <OverviewTable.TableDetailLoaderItem />
                        <OverviewTable.TableDetailLoaderItem />
                      </OverviewTable.TableRow>
                    </>
                  ) : null}

                  {(!activities_data ||
                    (!!activities_data && activities_data?.length <= 0)) &&
                  isLoadingActivities === false ? (
                    <div className="w-full flex items-center justify-center min-h-32">
                      <p className=" text-secondary-black  font-bold text-lg">
                        You have no activities at the moment.
                      </p>
                    </div>
                  ) : null}
                </div>
              </OverviewTable>
            </div>

            <section className=" md:hidden block w-full">
              <div className="flex items-center justify-between">
                <h2 className="text-secondary-black text-base/4 font-semibold  tracking-[1%]">
                  Recents Activities
                </h2>
                <button className=" text-primary  text-base/4 font-semibold  tracking-[1%] outline-none border-none focus:outline-none">
                  View All Activities
                </button>
              </div>

              <Spacer size={32} />

              <div className="flex flex-col items-center gap-4 w-full h-96 overflow-auto custom-scroller">
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
                <OverviewItem />
              </div>
            </section>

            <main className="w-full h-fit md:h-full bg-white border-[#0074FF1A] border-2 border-solid p-6  rounded-3xl">
              <h2 className="capitalize text-base/4 font-semibold tracking-[1%] text-secondary-black">
                Review&nbsp;Requests
              </h2>

              <Spacer size={16} />

              {((!!pending_requests_data &&
                pending_requests_data?.length <= 0) ||
                !pending_requests_data) &&
              !isLoadingPendingRequests ? (
                <div className="w-full flex items-center flex-col gap-2">
                  <EmptyItemsIcon />
                  <p className=" text-xl/[30px] text-center font-extrabold tracking-[1%] text-secondary-black max-w-xs">
                    You have no Request at the moment
                  </p>
                </div>
              ) : null}


{isLoadingPendingRequests && <div className="w-full flex items-center justify-center flex-col gap-2 p-4">
                   <ButtonLoader className=" " inverted />
                </div>}

              {!!pending_requests_data &&
              pending_requests_data?.length > 0 &&
              !isLoadingPendingRequests ? (
                <div className="w-full flex items-center flex-col gap-4   h-80  custom-scroller overflow-auto pr-1.5">
                  {pending_requests_data?.map((request, index) => {
                    return (
                      <div
                        className="w-full  border-[#0074FF1A] border-b-2 border-solid flex items-center justify-between py-2"
                        key={request?.uuid}
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span
                            className={cn(
                              " font-medium capitalize  text-base text-secondary-black",
                              plusJakartaSans.className
                            )}
                          >
                            {request?.service_provider_company}
                          </span>
                          <p className=" lowercase">
                            Status:{" "}
                            <span className="  text-secondary-blue/85 text-sm">
                              {request?.status}
                            </span>
                          </p>
                        </div>

                        {/* <span className={cn(" font-medium capitalize  text-base text-secondary-black",plusJakartaSans.className)}>{request?.service_provider_company}</span> */}
                        {/* <span className={cn("font-semibold  text-base text-secondary-black",plusJakartaSans.className)}>  {formatDate(
                                  request?.requested_on,
                                  "yyyy-MM-dd,  hh:mm aaa"
                                )}</span> */}

                        <button
                        type="button"
                          className="outline-none border-none font-semibold  text-base focus:outline-none  text-secondary-blue bg-transparent w-fit h-fit"
                          onClick={() => {
                            handleViewRequestDetails(request);
                          }}
                        >
                          View
                        </button>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </main>
          </section>
        </main>
      </section>

      <Dialog
        open={showRequestDetailsDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toggleRequestDetailsDialog}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-grey-100/70">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="w-full max-w-[26rem] rounded-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  min-h-[16rem]">
              <DialogTitle
                as="h3"
                className="text-2xl/6 font-bold text-secondary-black tracking-[1%]"
              >
                Request&nbsp;Details
              </DialogTitle>

              <Spacer size={24} />

              <section className=" w-full flex flex-col justify-between h-max">
                <main className="flex flex-col gap-4 h-fit ">
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Company&nbsp;Name
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      {currentViewRequest?.service_provider_company}
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Date and Time
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      {!!currentViewRequest?.requested_on ?  formatDate(
                        currentViewRequest?.requested_on!,
                        "yyyy-MM-dd"
                      ) + ' ' + formatDate(currentViewRequest?.requested_on!, "hh:mm a") : '  N/A'}
                    </span>
                  </div>
                  {/* <div className="flex w-full items-center justify-between">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%]">
                      Action Type
                    </span>
                    <span className=" text-sm/[14px] font-medium tracking-[1%]">
                      Consent Give
                    </span>
                  </div> */}
                  {/* <div className="flex w-full items-start justify-between gap-4">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%] whitespace-nowrap">
                      Granted Access to
                    </span>
                    <div className="flex flex-wrap items-center justify-end gap-2 custom-scroller max-h-[10rem] h-fit overflow-auto">
                      <DataAccessItem>Email</DataAccessItem>
                      <DataAccessItem>Contacts</DataAccessItem>
                    </div>
                  </div> */}

                  <div className="flex w-full items-start justify-between gap-4">
                    <span className=" font-normal text-[#4C689E] text-sm/[14px] tracking-[1%] block whitespace-nowrap">
                      Status
                    </span>

                    <span
                      className={cn(
                        "font-medium capitalize text-sm/[14px] tracking-[1%]",
                        
                          currentViewRequest?.status?.toLowerCase() === "approved" &&  "text-[#007836]",
                         currentViewRequest?.status?.toLowerCase() === "rejected" &&  " text-danger-1",
                        currentViewRequest?.status?.toLowerCase() === "pending" &&   "text-secondary-blue ",
                        
                      )}
                    >
                      {currentViewRequest?.status}
                    </span>
                  </div>
                </main>

                <Spacer size={32} />
                <div className="mt-4 flex items-center justify-between gap-4 w-full">
                  <button
                    className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D] disabled:cursor-not-allowed disabled:opacity-80"
                    disabled={isPatchingRequest}
                    onClick={() => {
handleApproveRequest()
                    }}
                  >
                   
                    {isPatchingRequest ?  <ButtonLoader/>  : <span> Accept</span>}
                  </button>
                  <button className="inline-flex items-center gap-2.5 rounded-xl bg-danger-1 py-1.5 px-3 text-sm/6 font-semibold text-danger-2 shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-danger-1/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-danger-1 disabled:cursor-not-allowed disabled:opacity-80" 
                     disabled={isPatchingRequest}
                  onClick={() => {
                    handleRejectRequest();
                  }}>
                   {isPatchingRequest ?  <ButtonLoader inverted/>  : <span>Reject</span>}
                  </button>
                </div>
              </section>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={showVdDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toggleVdDialog}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-grey-100/70">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="w-full max-w-[26rem] rounded-3xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  min-h-[22rem]">
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
      </Dialog>
    </Fragment>
  );
};

export default ProtectUserRoute(Overview, "/applications");
