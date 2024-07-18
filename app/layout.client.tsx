"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import React, { Fragment } from "react";
import { ToastContainer } from 'react-toastify';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import TopLoader from "@/components/top-loader/top-loader";
import { store, persistedStore } from "@/rtk/app/store";
import 'react-toastify/dist/ReactToastify.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <QueryClientProvider client={queryClient}>
          <TopLoader
            color={`#4169E1`}
            initialPosition={0.08}
            crawlSpeed={0.5}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            // template='<div class="w-full bg-skin-secondary bar" role="bar"></div>'
            zIndex={1600}
            showAtBottom={false}
          />
          <ToastContainer
          
          
          
          />

          {children}
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
              },
            }}
          />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

const RootClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <GlobalProvider>{children}</GlobalProvider>
    </Fragment>
  );
};

export default RootClientLayout;
