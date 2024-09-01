import { Activity, IndividualDashboardResponse, IndividualOverviewResponse, IndividualProfileResponse, OverviewActivity, PendingRequest, ServiceProviderApplicationResponse, ServiceProviderApplicationsResponse, ServiceProviderProfileResponse, SpDashboardResponse } from "@/lib/types"
import { handleErrorGlobal } from "@/lib/utils"
import axiosInstance from "@/services/axiosInstance"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"


export const useGetIndividualOverview = () => {
   const response = useQuery({
      queryKey: ["get-individual-overview"],
      queryFn: async ():Promise<IndividualOverviewResponse> => {
        return axiosInstance.get("/user/dashboard")
      }
   })

   return response;
}

export const useGetIndividualOverviewActivities = () => {
   const response = useQuery({
      queryKey: ["get-individual-overview-activities"],
      queryFn: async ():Promise<Array<OverviewActivity>> => {
        return axiosInstance.get("/user/dashboard/activities/")
      }
   })

   return response;
}

export const useGetIndividualPendingRequests = () => {
   const response = useQuery({
      queryKey: ["get-individual-pending-requests"],
      queryFn: async ():Promise<PendingRequest[]> => {
        return axiosInstance.get("/user/dashboard/pending-requests/")
      }
   })

   return response;
}

export const useGetIndividualProfile = () => {
   const response = useQuery({
      queryKey: ["get-individual-profile"],
      queryFn: async ():Promise<IndividualProfileResponse> => {
        return axiosInstance.get("/user/profile/")
      }
   })

   return response;
}

export const useGetServiceProviderProfile = () => {
   const response = useQuery({
      queryKey: ["get-sp-profile"],
      queryFn: async ():Promise<ServiceProviderProfileResponse> => {
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

export const useGetApplicationDetailById = (applicationId:string) => {
   const response = useQuery({
      queryKey: ["get-sp-application-by-id",applicationId],
      queryFn: async ():Promise<ServiceProviderApplicationResponse> => {
        return axiosInstance.get(`/tp/application/${applicationId}`)
      },
      enabled: !!applicationId   
   })

   return response;
}
export const useGetRequestDetailById = (requestId:string) => {
   const response = useQuery({
      queryKey: ["get-sp-request-by-id",requestId],
      queryFn: async ():Promise<ServiceProviderApplicationResponse> => {
        return axiosInstance.get(`/tp/requests/${requestId}/`)
      },
      enabled: !!requestId ,
      // 2 minutes
      staleTime:2 * 60 * 1000,  
   })


   if(response?.isError){
      handleErrorGlobal('',response?.error);
   }

   return response;
}


export const useGetServiceProviderDashboard = () => {
   const response = useInfiniteQuery({
      queryKey: ["get-sp-dashboard"],
      initialPageParam: 1,
      queryFn: ({ pageParam, signal }): Promise<SpDashboardResponse> => {
         return axiosInstance.get("/tp/dashboard/",{
            params:{
               page:pageParam,
            },
            signal
         })
      },
      getNextPageParam: (
        lastPage: SpDashboardResponse,
        _allPages: SpDashboardResponse[],
        lastPageParam: number,
        _allPageParams: number[]
      ) => {
        return !!lastPage?.next ? lastPageParam + 1 : undefined;
      },
      getPreviousPageParam: (
        firstPage: SpDashboardResponse,
        _allPages: SpDashboardResponse[],
        firstPageParam: number,
        _allPageParams: number[]
      ) => {
        return !!firstPage?.previous ? firstPageParam - 1 : undefined;
      },
   })



   const results:Activity[] = [];


   response?.data?.pages?.forEach((page) => {
      page?.results?.forEach((pr) => {
         results.push(pr);
      })
   })

   return {...response,data:results};
}



export const useGetIndividualDashboard = () => {
   const response = useQuery({
      queryKey: ["get-individual-dashboard"],
      queryFn: async ():Promise<IndividualDashboardResponse & {data:IndividualDashboardResponse}> => {
        return axiosInstance.get("/user/dashboard")
      }
   })

   // //console.log({responseD:response})
   
   const data = response?.data?.data;
   // //console.log({dataD:data})
   
   return {...response,data};
}


export const useGetIndividualDashboardActivities = () => {
   const response = useQuery({
      queryKey: ["get-individual-dashboard-activities"],
      queryFn: async ():Promise<Array<Activity>> => {
        return axiosInstance.get("/user/dashboard/activities/")
      }
   })

   // //console.log({responseDaA:response})
   
   // const data = response?.data;
   // //console.log({dataDAds:data})
   
   return {...response};
}