"use client";

import React, {ComponentType, useEffect } from "react";
import { redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { AppRootState } from "../../rtk/app/store";
// import { useAppRouter } from "../../lib/hooks/client/use-app-router";
import { RoleEnum } from "../../lib/constants";

// todo
type ExpectedRedirectUrl<S = string> = S extends `/${infer H}/${infer R}` ? H : S;

type R = ExpectedRedirectUrl<"/profile/user">;

const ProtectUserRoute = (
  Page: ComponentType,
  expectedRedirectUrl: string
) => {
  const AuthPage = ({ ...props }) => {
    // const router = useAppRouter();
    const access_token = useSelector(
      (state: AppRootState) => state.auth.access_token
    );
    const role = useSelector((state: AppRootState) => state.auth.role);

    useEffect(() => {
      if (!access_token) {
        return redirect("/login");
      }
      if (
        role?.toLowerCase() !== RoleEnum.USER.toLowerCase() &&
        role?.toLowerCase() === RoleEnum.TRANSACTION_PARTY.toLowerCase()
      ) {
        return redirect(`${expectedRedirectUrl}`);
      } else if (role?.toLowerCase() !== RoleEnum.USER.toLowerCase()) {
        return redirect("/");
      }
    }, [access_token, role]);

    return !!access_token ? <Page {...props} /> : null;
  };

  AuthPage.propsType = {};

  return AuthPage;
};

export default ProtectUserRoute;