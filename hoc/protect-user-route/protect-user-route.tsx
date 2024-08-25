"use client";

import React, {ComponentType, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { AppRootState } from "../../rtk/app/store";
// import { useAppRouter } from "../../lib/hooks/client/use-app-router";
import { RoleEnum } from "../../lib/constants";

// TODO
type ExpectedUserRedirectUrl<S = string> = S extends `/${infer H}/${infer R}` ? R extends `user` ? never : R : S;

interface ProtectUserRouteProps {

}
type R = ExpectedUserRedirectUrl<"/profile/user">;

const ProtectUserRoute = <P extends object>(
  Page: ComponentType<P>,
  expectedRedirectUrl:ExpectedUserRedirectUrl = '/'
):React.FC<ProtectUserRouteProps & P> => {


  const AuthPage = ({ ...props }: P & ProtectUserRouteProps) => {
    // const router = useAppRouter();
    const access_token = useSelector(
      (state: AppRootState) => state.auth.access_token
    );
    const role = useSelector((state: AppRootState) => state.auth.role);


    useEffect(() => {
      // //console.log({ access_token, role });
      if (!access_token) {
        return redirect("/login");
      }

      if (
        role?.toLowerCase() !== RoleEnum.END_USER.toLowerCase() &&
        role?.toLowerCase() === RoleEnum.SERVICE_PROVIDER.toLowerCase()
      ) {
        return redirect(`${expectedRedirectUrl}`);
      } else if (role?.toLowerCase() !== RoleEnum.END_USER.toLowerCase()) {
        return redirect("/");
      }
    }, [access_token, role]);

    return !!access_token ? <Page {...props} /> : null;
  };

  AuthPage.propsType = {};

  return AuthPage;
};

export default ProtectUserRoute;
