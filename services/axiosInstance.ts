import { store } from '@/rtk/app/store';
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
  const refreshToken = store.getState().auth.refresh_token;
  try {
    const data = await axiosInstance.get(`/auth/token/refresh`,{
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });

    console.log({ data });

  } catch (error) {
    console.error({ error })
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
          await handleRefreshToken();
        } else {
          toast.error("Session expired.")
          window.location.href = '/';
          retryCount = 0;
          return;
        }
        // toast.error("401 error in INSTANCE",{

        // })

      } else if (errorResponse?.status === 401 && errorUrl === '/auth/token/refresh') {
        toast.error("Session expired.")
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