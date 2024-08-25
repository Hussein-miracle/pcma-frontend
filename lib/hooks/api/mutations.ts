"use client";

import { queryClient } from "@/app/layout.client";
import { ApiResponse, ApplicationCreationData, ApplicationCreationResponse, ApplicationUpdateData, BasicPiiData, IndividualLoginResponse, IndividualRegistrationDetails, InferredLoginForm, LoginDetails, PersonalPiiData, SPLoginResponse, SPRegistrationDetails, UnifiedLoginResponse } from "@/lib/types";
import { handleErrorGlobal, successToast } from "@/lib/utils";
import axiosInstance from "@/services/axiosInstance"
import { useMutation } from "@tanstack/react-query"




export const usePostIndividualLogin = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-user-login'],
    mutationFn: (loginDetails: LoginDetails): Promise<IndividualLoginResponse> => {
      return axiosInstance.post("/auth/user/login", loginDetails)
    }
  });

  return mutationDetails;
}

export const usePostUnifiedLogin = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-unified-login'],
    mutationFn: (loginDetails: LoginDetails): Promise<UnifiedLoginResponse> => {
      return axiosInstance.post("/auth/user/login/", loginDetails)
    }
  });

  return mutationDetails;
}
export const usePatchUserRequest = () => {
  const mutationDetails = useMutation({
    mutationKey: ['patch-user-request'],
    mutationFn: (details: { data:{status: 'approved' | 'rejected';};requestId:string;}): Promise<any> => {
      return axiosInstance.patch(`/user/requests/${details?.requestId}/`, details?.data)
    },
    onSuccess: (data, variables, ctx) => {
      queryClient.invalidateQueries({ queryKey: ['get-individual-overview'] })
      queryClient.invalidateQueries({ queryKey: ['get-individual-pending-requests'] })
    }
  });

  return mutationDetails;
}

export const usePostBasicPii = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-basic-pii'],
    mutationFn: (basicPiiData:BasicPiiData): Promise<ApiResponse> => {
      return axiosInstance.post("/user/basic-pii/", basicPiiData)
    }
  });
  return mutationDetails;
}

export const usePatchBasicPii = () => {
  const mutationDetails = useMutation({
    mutationKey: ['patch-basic-pii'],
    mutationFn: (basicPiiData:BasicPiiData): Promise<ApiResponse> => {
      return axiosInstance.patch("/user/basic-pii/", basicPiiData)
    }
  });
  return mutationDetails;
}



export const usePostPersonalPii = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-personal-pii'],
    mutationFn: (personalPiiData:PersonalPiiData): Promise<ApiResponse> => {
      return axiosInstance.post("/user/sensitive-pii/", personalPiiData)
    }
  });

  return mutationDetails;
}
export const usePatchPersonalPii = () => {
  const mutationDetails = useMutation({
    mutationKey: ['patch-personal-pii'],
    mutationFn: (personalPiiData:PersonalPiiData): Promise<ApiResponse> => {
      return axiosInstance.patch("/user/sensitive-pii/", personalPiiData)
    }
  });

  return mutationDetails;
}



export const usePostServiceProviderLogin = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-sp-login'],
    mutationFn: (loginDetails: LoginDetails): Promise<SPLoginResponse> => {
      return axiosInstance.post("/auth/tp/login/", loginDetails)
    }
  });

  return mutationDetails;
}




export const usePostIndividualRegistration = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-user-registration'],
    mutationFn: (registrationDetails: IndividualRegistrationDetails): Promise<ApiResponse> => {
      return axiosInstance.post("/auth/user/signup/", registrationDetails)
    }
  });
  return mutationDetails;
}


export const usePostServiceProviderRegistration = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-sp-registration'],
    mutationFn: (registrationDetails: SPRegistrationDetails): Promise<ApiResponse> => {
      return axiosInstance.post("/auth/tp/signup/", registrationDetails)
    }
  });
  return mutationDetails;
}

export const usePostServiceProviderMakeRequest = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-sp-request-retry'],
    mutationFn: (requestId:string): Promise<ApiResponse> => {
      return axiosInstance.post(`/tp/requests/${requestId}/retry/`,{});
    },
    onSuccess(data, variable, context) {
      // console.log({data},'data');
      // console.log({variables},'variables');
      // console.log({context},'context');
      queryClient.invalidateQueries({
        queryKey:["get-sp-dashboard"]
      })
    },
    onError(error, variables, context) {

      console.log({error,variables,context});


      handleErrorGlobal('',error);
    },
    onSettled(data, error, variables, context) {

      console.log({data,error,variables,context});
    },
  });
  return mutationDetails;
}



export const usePatchServiceProviderProfile = () => {
  const mutationDetails = useMutation({
    mutationKey: ['patch-sp-profile'],
    mutationFn: (details: unknown): Promise<ApiResponse> => {
      return axiosInstance.patch("/tp/profile/", details);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-sp-profile'] })
    }
  });
  return mutationDetails;
}


export const usePatchIndividualProfile = () => {
  const mutationDetails = useMutation({
    mutationKey: ['patch-user-profile'],
    mutationFn: (details: unknown): Promise<ApiResponse> => {
      return axiosInstance.patch("/user/profile/", details);
    },
    onSuccess: (data, variables, ctx) => {
      queryClient.invalidateQueries({ queryKey: ['get-individual-profile'] })
    }
  });
  return mutationDetails;
}


export const usePostCreateApplication = () => {
  const mutationDetails = useMutation({
    mutationKey: ['post-create-application'],
    mutationFn: (details: ApplicationCreationData): Promise<ApplicationCreationResponse> => {
      return axiosInstance.post("/tp/application/", details)
    },
    onSuccess: (data, variables, ctx) => {

      //console.log({ data, variables, ctx }, 'avc');
      successToast(data?.message ?? 'Application created successfully.')

      queryClient.invalidateQueries({ queryKey: ['get-sp-applications'] })
    }
  });
  return mutationDetails;
}


export const usePatchApplication = () => {
  const mutationDetails = useMutation({
    mutationKey: ['patch-application'],
    mutationFn: (details: {
      data: ApplicationUpdateData,
      applicationId: string
    }): Promise<ApplicationCreationResponse> => {
      return axiosInstance.patch(`/tp/application/${details.applicationId}/`, details.data)
    },
    onSuccess: (data, variables, ctx) => {

      //console.log({ data, variables, ctx }, 'avc');
      // successToast(data?.message ?? 'Application created successfully.')

      // queryClient.invalidateQueries({ queryKey: ['get-sp-applications']})
    }
  });
  return mutationDetails;
}

