"use client";

import React, { ComponentType, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { AppRootState } from "../../rtk/app/store";
// import { useAppRouter } from "../../lib/hooks/client/use-app-router";
import { RoleEnum } from "../../lib/constants";

// TODO
type ExpectedSPRedirectUrl<S = string> = S extends `/${infer H}/${infer R}` ? R extends `service-provider` ? never : R : S;

interface ProtectServiceProviderRouteProps {

}

const ProtectServiceProviderRoute = <P extends object>(Page:ComponentType<P>, expectedRedirectUrl: ExpectedSPRedirectUrl = '/'):React.FC<ProtectServiceProviderRouteProps & P> => {

  const AuthPage = ({...props}: P & ProtectServiceProviderRouteProps) => {
    // const router = useAppRouter();
    const access_token = useSelector((state: AppRootState) => state.auth.access_token);
    const role = useSelector((state: AppRootState) => state.auth.role);

    useEffect(() => {
      if (!access_token) {
        return redirect("/login");
      }

      if (
        role?.toLowerCase() !== RoleEnum.SERVICE_PROVIDER.toLowerCase() &&
        role?.toLowerCase() === RoleEnum.END_USER.toLowerCase()
      ) {
        return redirect(`${expectedRedirectUrl}`);
      } else if (
        role?.toLowerCase() !== RoleEnum.SERVICE_PROVIDER.toLowerCase()
      ) {
        return redirect("/");
      }
    }, [access_token, role]);



    return !!access_token ? <Page {...props} /> : null ;
  };

  AuthPage.propsType = {};

  return AuthPage;
};

export default ProtectServiceProviderRoute;
