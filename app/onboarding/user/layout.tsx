"use client";

import Header from "@/components/header/header";
import { AppRootState } from "@/rtk/app/store";
import React from "react";
import { useSelector } from "react-redux";

interface UserOnboardingLayoutProps {
  children?: any;
}

const UserOnboardingLayout = ({ children }: UserOnboardingLayoutProps) => {
  const  role = useSelector((state:AppRootState) => state.auth.role);
  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header roleType={role!}  />
      <main className="w-full mx-auto pt-[4rem]">{children}</main>
    </section>
  );
};

export default UserOnboardingLayout;
