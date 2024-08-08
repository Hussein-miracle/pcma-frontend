"use client";

import { queryClient } from "@/app/layout.client";
import { ApiResponse, ApplicationCreationData, ApplicationCreationResponse, IndividualLoginResponse, IndividualRegistrationDetails, InferredLoginForm, LoginDetails, SPLoginResponse, SPRegistrationDetails } from "@/lib/types";
import { successToast } from "@/lib/utils";
import axiosInstance from "@/services/axiosInstance"
import { useMutation } from "@tanstack/react-query"




export const usePostIndividualLogin = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-user-login'],
    mutationFn:(loginDetails:LoginDetails):Promise<IndividualLoginResponse> => {
     return axiosInstance.post("/auth/user/login",loginDetails)  
    }
  });

  return mutationDetails;
}


export const usePostServiceProviderLogin = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-sp-login'],
    mutationFn:(loginDetails:LoginDetails):Promise<SPLoginResponse> => {
     return axiosInstance.post("/auth/tp/login",loginDetails)  
    }
  });

  return mutationDetails;
}




export const usePostIndividualRegistration = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-user-registration'],
    mutationFn:(registrationDetails:IndividualRegistrationDetails):Promise<ApiResponse> => {
     return axiosInstance.post("/auth/user/signup",registrationDetails)  
    }
  });
  return mutationDetails;
}


export const usePostServiceProviderRegistration = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-sp-registration'],
    mutationFn:(registrationDetails:SPRegistrationDetails):Promise<ApiResponse> => {
     return axiosInstance.post("/auth/tp/signup",registrationDetails)  
    }
  });
  return mutationDetails;
}



export const usePatchServiceProviderProfile = () => {
  const mutationDetails = useMutation({
    mutationKey:['patch-sp-profile'],
    mutationFn:(details:unknown):Promise<ApiResponse> => {
     return axiosInstance.patch("/tp/profile",details);  
    }
  });
  return mutationDetails;
}


export const usePatchIndividualProfile = () => {
  const mutationDetails = useMutation({
    mutationKey:['patch-user-profile'],
    mutationFn:(details:unknown):Promise<ApiResponse> => {
     return axiosInstance.patch("/user/profile",details);  
    }
  });
  return mutationDetails;
}


export const usePostCreateApplication = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-create-application'],
    mutationFn:(details:ApplicationCreationData):Promise<ApplicationCreationResponse> => {
     return axiosInstance.post("/tp/application",details)  
    },
    onSuccess:(data,variables,ctx)=>{
      
      console.log({data,variables,ctx},'avc');
      successToast(data?.message ?? 'Application created successfully.')
      
      queryClient.invalidateQueries({ queryKey: ['get-sp-applications']})
    }
  });
  return mutationDetails;
}

