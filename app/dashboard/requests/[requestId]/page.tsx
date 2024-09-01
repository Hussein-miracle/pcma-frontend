"use client";

import AntiScreenshotXInspection from "@/components/anti-screenshot-x-inspection/anti-screenshot-x-inspection";
import ButtonLoader from "@/components/button-loader/button-loader";
import PrimaryButton from "@/components/primary-button/primary-button";
import Spacer from "@/components/spacer/spacer";
import { usePostServiceProviderMakeRequest } from "@/lib/hooks/api/mutations";
import { useGetRequestDetailById } from "@/lib/hooks/api/queries";
import { ServiceProviderApplicationResponse } from "@/lib/types";
import { formatSnakeCaseString, handleErrorGlobal, successToast } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import React, { useMemo } from "react";

const RequestDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const requestId = params.requestId as string;

  // console.log({ requestId });
  const { isLoading: isFetchingRequest, data: requestDetails ,isError:isFetchingRequestError} =
    useGetRequestDetailById(requestId);

  // console.log({ isFetchingRequest, requestDetails });




  const { isPending: isMakingRequest, mutateAsync: makeRequest } =
    usePostServiceProviderMakeRequest();


  const basicPiiDetails = {...requestDetails?.basic_pii} as Pick<ServiceProviderApplicationResponse,'basic_pii'>;

  const personalPiiDetails = {...requestDetails?.sensitive_pii} as Pick<ServiceProviderApplicationResponse,'sensitive_pii'>;

  const basiiPiiDetailsEntries = Object.entries(basicPiiDetails) as unknown as Array<[string,string]>;

  const personalPiiDetailsEntries = useMemo(() => {
    const details = Object.entries(personalPiiDetails)  as unknown as Array<[string,string]>;
    const filteredDetails = details.filter(([key,value]) => value !== null && value !== undefined && value !== '');
    return filteredDetails as unknown as Array<[string,string]>  
  },[personalPiiDetails]);
  // console.log({basiiPiiDetailsEntries},'MRDE');

  

  const handleBack = () => {
    router.back();
  };

  const handleMakeRequest = async () => {
    try {
      const response = await makeRequest(requestId);
      // console.log({ response });
      if(response?.message){
        successToast(response?.message);
      }
    } catch (error: any) {
      console.log({errorMaker:error});
      // handleErrorGlobal("", error);
    }
  };

  return (
  <AntiScreenshotXInspection>
    <section className="w-full mx-auto  min-h-screen max-w-[54.75rem]  px-4 select-none" >
      <main className="w-full items-center justify-between flex">
        <PrimaryButton disabled={isFetchingRequest} onClick={handleBack}>
          Back
        </PrimaryButton>
        <PrimaryButton
          disabled={isMakingRequest || isFetchingRequest}
          onClick={handleMakeRequest}
        >
          {isMakingRequest ? (
            <ButtonLoader />
          ) : (
            <span>Make&nbsp;Another&nbsp;Request</span>
          )}
        </PrimaryButton>
      </main>

      <main className=" mx-auto  max-w-[54rem] w-full">
          <section className="w-full mt-4 ">
            <h2 className=" text-2xl font-bold text-secondary-black text-left">
              Basic&nbsp;Information
            </h2>

            <div className="w-full mt-2 rounded bg-white px-2 py-1 flex flex-col gap-2">
              {!isFetchingRequest && !isFetchingRequestError && basiiPiiDetailsEntries?.length > 0 &&  basiiPiiDetailsEntries?.map(([key, value]) => (
                <div
                  key={key}
                  className="flex gap-2 items-center justify-between"
                >
                  <span className="text-sm text-secondary-black font-semibold capitalize">
                    {formatSnakeCaseString(key)}:&nbsp;
                  </span>
                  <span className="text-sm text-secondary-black">{value}</span>
                </div>
              ))}      

               {isFetchingRequest && <ButtonLoader wrapperClassName="w-8 h-8 my-4"/>}       
               {(( basiiPiiDetailsEntries?.length === 0) && !isFetchingRequest || isFetchingRequestError && !isFetchingRequest) ? <div className="m-6">
                <Spacer size={16}/>
                {/* <Spacer className="h-4"/> */}
                <p>The request for basic PII has expired,please mamke another request and wait for approval.</p>
                <Spacer size={16}/>
              </div> : null }
            </div>

          </section>
          <section className="w-full mt-4 ">
            <h2 className=" text-2xl font-bold text-secondary-black text-left">
             Personal&nbsp;Identifiable&nbsp;Information
            </h2>

            <div className="w-full mt-2 rounded bg-white px-2 py-1 flex flex-col gap-2">
              {!isFetchingRequest && personalPiiDetailsEntries?.length > 0 && personalPiiDetailsEntries?.map(([key, value]) => (
                <div
                  key={key}
                  className="flex gap-2 items-center justify-between"
                >
                  <span className="text-sm text-secondary-black font-semibold capitalize">
                    {formatSnakeCaseString(key)}:&nbsp;
                  </span>
                  <span className="text-sm text-secondary-black">{value}</span>
                </div>
              ))}

              {isFetchingRequest && <ButtonLoader  wrapperClassName="w-8 h-8 my-4"/>}


              {( personalPiiDetailsEntries?.length === 0) && !isFetchingRequest || isFetchingRequestError && !isFetchingRequest ? <div className="m-6">
              <Spacer size={16}/>
                <p>The request for personal PII has expired,please mamke another request and wait for approval.</p>
              <Spacer size={16}/>
              </div> : null }
            </div>

          </section>
        </main>
    </section>
    </AntiScreenshotXInspection>
  );
};

export default RequestDetailsPage;
