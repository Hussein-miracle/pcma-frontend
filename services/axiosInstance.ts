import { RefreshTokenApiResponse } from '@/lib/types';
import { errorToast } from '@/lib/utils';
import { store } from '@/rtk/app/store';
import { setAccessToken, setLogout, setRefreshToken } from '@/rtk/features/auth-slice/auth-slice';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  }
})


const handleRefreshToken = async () => {
  const refresh_token = store.getState().auth.refresh_token;
  const access_token = store.getState().auth.access_token;

  const body = {
    refresh_token:refresh_token!
  }

  try {
    const response = await axiosInstance.post<unknown,RefreshTokenApiResponse,Omit<RefreshTokenApiResponse,'access_token'>>(`/auth/token/refresh`,body,{
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    console.log({ responseRefresh:response });

    const newAccessToken = response.access_token;
    const newRereshToken = response.refresh_token;


    store.dispatch(setAccessToken(newAccessToken));
    store.dispatch(setRefreshToken(newRereshToken))
    

    return newAccessToken;
  } catch (error:any) {
    console.error({ error })
    store.dispatch(setAccessToken(null));
    store.dispatch(setRefreshToken(null));
    store.dispatch(setLogout());
    errorToast(error?.message ??  "Session expired.")
    window.location.href = '/';
  }
}

// Add a request interceptor
const _axiosRequestInterceptor = axiosInstance.interceptors.request.use(
  (config) => {
    const storedToken = store.getState().auth.access_token;
    // console.log({ storedToken })
    if (storedToken) {
      config.headers['Authorization'] = `Bearer ${storedToken}`;
    }
    // You can modify the request config here, e.g., add authentication headers
    // config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  (error) => {
    // console.log({errorInRequestInterceptor: error})
    return Promise.reject(error);
  }
);

let retryCount = 0;
// Add a response interceptor
const _axiosResponseInterceptor = axiosInstance.interceptors.response.use(
  (response) => {
    // console.log({ responseInResponseINTERCEPTOR: response})
    // You can modify the response data here, e.g., handling pagination
    // if (response.status === 401 && window.location.pathname !== '/login') {

    //   window.location.href = '/login';
    //   // window.history.replaceState(null, '', `${window.location.origin}/login`);

    //   queryClient.clear();

    //   return;
    // }

    return response.data;
  },
  async (error) => {
    // console.log({errorAxios:error});
    const errorConfig = error?.config;
    const errorResponse = error?.response;
    const netInfo = window?.navigator?.onLine;
    // if (timer !== null) {
    //   clearTimeout(timer);
    // }

    if (error?.request?.status == 500 && error?.response?.status == 500) {
      // serverErrorToast('Internal Server Error: Please Contact Support.');
      return;
    }

    if (errorConfig && !!errorResponse) {
      // console.log('errorConfig', errorConfig);
      const errorUrl = errorConfig?.url;

      console.log({ errorUrl });
      // console.log('INTERCEPTOR errorResponse', errorResponse);
      if (
        errorResponse?.status === 401 &&
        !errorConfig._retry && errorUrl !== '/auth/token/refresh') {
        errorConfig._retry = true;
        if (retryCount < 3) {
          retryCount += 1;
          const new_token = await handleRefreshToken();

          if (!!new_token) {
            errorConfig.headers['Authorization'] = `Bearer ${new_token}`;
            return axiosInstance(errorConfig);  
          }
        } else {
          store.dispatch(setLogout());
          errorToast("Session expired.")
          window.location.href = '/';
          retryCount = 0;
          return;
        }
        // toast.error("401 error in INSTANCE",{

        // })

      } else if (errorResponse?.status === 401 && errorUrl === '/auth/token/refresh') {
        store.dispatch(setLogout());
        errorToast("Session expired.")
        window.location.href = '/';
        retryCount = 0;
        return;
      }

      // console.log({ errorResponse }, '500');
    }

    if (errorResponse?.status === 500) {
      // serverErrorToast('Internal Server Error: Please Contact Support.');
      return;
    }

    if (error.code === 'ERR_NETWORK' && !netInfo) {
      // toast.info('Network Error: Check Your Internet Connection.');
      return;
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;