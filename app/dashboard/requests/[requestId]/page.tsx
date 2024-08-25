"use client";

import ButtonLoader from "@/components/button-loader/button-loader";
import PrimaryButton from "@/components/primary-button/primary-button";
import { usePostServiceProviderMakeRequest } from "@/lib/hooks/api/mutations";
import { useGetRequestDetailById } from "@/lib/hooks/api/queries";
import { handleErrorGlobal, successToast } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const RequestDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const requestId = params.requestId as string;

  console.log({ requestId });
  const { isLoading: isFetchingRequest, data: requestDetails } =
    useGetRequestDetailById(requestId);

  console.log({ isFetchingRequest, requestDetails });

  const { isPending: isMakingRequest, mutateAsync: makeRequest } =
    usePostServiceProviderMakeRequest();

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
    <section className="w-full mx-auto  min-h-screen max-w-[54.75rem]  px-4">
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

      <section className="w-full bg-green-300 mt-2">
        {JSON.stringify(requestId)}
      </section>
    </section>
  );
};

export default RequestDetailsPage;
