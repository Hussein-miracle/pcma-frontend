"use client";

import { IndividualLoginResponse, IndividualRegistrationDetails, SPLoginResponse } from "@/lib/types";
import axiosInstance from "@/services/axiosInstance"
import { useMutation } from "@tanstack/react-query"




export const usePostIndividualLogin = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-user-login'],
    mutationFn:(loginDetails:any):Promise<IndividualLoginResponse> => {
     return axiosInstance.post("/auth/user/login",loginDetails)  
    }
  });

  return mutationDetails;
}


export const usePostServiceProviderLogin = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-sp-login'],
    mutationFn:(loginDetails:any):Promise<SPLoginResponse> => {
     return axiosInstance.post("/auth/user/login",loginDetails)  
    }
  });

  return mutationDetails;
}




export const usePostIndividualRegistration = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-user-registration'],
    mutationFn:(registrationDetails:IndividualRegistrationDetails):Promise<{message?:string;}> => {
     return axiosInstance.post("/auth/user/signup",registrationDetails)  
    }
  });

  return mutationDetails;
}


export const usePostServiceProviderRegistration = () => {
  const mutationDetails = useMutation({
    mutationKey:['post-sp-registration'],
    mutationFn:(registrationDetails:any):Promise<{message?:string;}> => {
     return axiosInstance.post("/auth/user/login",registrationDetails)  
    }
  });

  return mutationDetails;
}