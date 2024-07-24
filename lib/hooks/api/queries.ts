import { IndividualOverviewResponse, IndividualProfileResponse, ServiceProviderApplicationsResponse } from "@/lib/types"
import axiosInstance from "@/services/axiosInstance"
import { useQuery } from "@tanstack/react-query"


export const useGetIndividualOverview = () => {
   const response = useQuery({
      queryKey: ["get-individual-overview"],
      queryFn: async ():Promise<IndividualOverviewResponse> => {
        return axiosInstance.get("/user/dashboard")
      }
   })

   return response;
}

export const useGetIndividualProfile = () => {
   const response = useQuery({
      queryKey: ["get-individual-profile"],
      queryFn: async ():Promise<IndividualProfileResponse> => {
        return axiosInstance.get("/user/profile")
      }
   })

   return response;
}

export const useGetServiceProviderProfile = () => {
   const response = useQuery({
      queryKey: ["get-sp-profile"],
      queryFn: async ():Promise<IndividualProfileResponse> => {
        return axiosInstance.get("/tp/profile")
      }
   })

   return response;
}



export const useGetApplications = () => {
   const response = useQuery({
      queryKey: ["get-sp-applications"],
      queryFn: async ():Promise<ServiceProviderApplicationsResponse> => {
        return axiosInstance.get("/tp/application")
      }
   })

   return response;
}


export const useGetServiceProviderAuditTrailDashboard = () => {
   const response = useQuery({
      queryKey: ["get-sp-audit-trail-dashboard"],
      queryFn: async () => {
        return axiosInstance.get("/tp/dashboard")
      }
   })

   return response;
}

export const useGetIndividualAuditTrailDashboard = () => {
   const response = useQuery({
      queryKey: ["get-individual-audit-trail-dashboard"],
      queryFn: async () => {
        return axiosInstance.get("/user/dashboard")
      }
   })

   return response;
}