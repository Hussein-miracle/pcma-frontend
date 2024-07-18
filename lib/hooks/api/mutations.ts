"use client";

import { ApiResponse, IndividualLoginResponse, IndividualRegistrationDetails, InferredLoginForm, LoginDetails, SPLoginResponse, SPRegistrationDetails } from "@/lib/types";
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
     return axiosInstance.post("/auth/user/login",loginDetails)  
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