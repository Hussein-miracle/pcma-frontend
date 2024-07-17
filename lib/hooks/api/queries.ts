import { IndividualOverviewResponse, IndividualProfileResponse } from "@/lib/types"
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


export const useGetApplications = () => {
   const response = useQuery({
      queryKey: ["get-applications"],
      queryFn: async () => {
        return axiosInstance.get("/tp/application")
      }
   })

   return response;
}