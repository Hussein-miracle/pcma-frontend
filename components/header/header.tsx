"use client";
import Link from "next/link";
import React from "react";
import {
  ColorSwatchIcon,
  GridIcon,
  PCMABellIcon,
  PCMALogo,
  ShieldCheckIcon,
  UserProfileIcon,
} from "../icons";
import PrimaryButton from "../primary-button/primary-button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  variant?: "white" | "grey";
  // NOTE:the property below would be removed
  type?: "unauthed" | "authed";
}

type AuthenticatedHeaderItemProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

const AuthenticatedHeaderItem = ({
  icon,
  children,
  className,
}: AuthenticatedHeaderItemProps) => {
  return (
    <li
      className={cn(
        "w-fit h-fit cursor-pointer py-1 px-2 flex items-center gap-2 bg-[#0074FF0D] rounded-[10px]",
        className
      )}
    >
      <div className="">{icon}</div>
      <div className=" font-semibold text-secondary-black text-base/4 tracking-[1%]">
        {children}
      </div>
    </li>
  );
};

type D<S extends string> = S extends `/${infer T}` ? T : never;

const Header = ({ variant = "white", type = "unauthed" }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  console.log({ pathname }, "PN");

  return (
    <header
      className={cn(
        "border-b border-b-grey-30 w-full py-4 px-6 sm:px-[7.5rem] flex items-center justify-between gap-[10px] h-full z-10",
        variant === "white" ? "bg-neutral-white" : "bg-grey-10"
      )}
    >
      <div className="cursor-pointer" onClick={() => {
        router.push('/')
      }}>
        <PCMALogo />
      </div>

      <nav className="w-fit h-full">
        {type === "unauthed" && (
          <ul className="hidden sm:flex items-center gap-6 h-full">
            <li>
              <span className=" text-secondary-black text-base font-semibold leading-4 tracking-[1%]">
                About
              </span>
            </li>
            <li>
              <span className=" text-secondary-black text-base font-semibold leading-4 tracking-[1%]">
                Features
              </span>
            </li>
            <li>
              <span className=" text-secondary-black text-base font-semibold leading-4 tracking-[1%]">
                Contact
              </span>
            </li>
          </ul>
        )}

        {type === "authed" && (
          <ul className="hidden sm:flex items-center gap-6 h-full">
            <AuthenticatedHeaderItem
              icon={
                <GridIcon
                  stroke={pathname === "/overview" ? "#fff" : undefined}
                />
              }
              className={cn(pathname === "/overview" && `bg-primary`)}
            >
              <span className={cn(pathname === "/overview" && `text-white`)}>
                Overview
              </span>
            </AuthenticatedHeaderItem>
            <AuthenticatedHeaderItem
              icon={
                <UserProfileIcon
                  stroke={pathname === "/profile" ? "#fff" : undefined}
                />
              }
              className={cn(pathname === "/profile" && `bg-primary`)}
            >
              <span className={cn(pathname === "/profile" && `text-white`)}>
                Profile
              </span>
            </AuthenticatedHeaderItem>
            <AuthenticatedHeaderItem
              icon={
                <ColorSwatchIcon
                  stroke={pathname === "/audit-trail" ? "#fff" : undefined}
                />
              }
              className={cn(pathname === "/audit-trail" && `bg-primary`)}
            >
              <span className={cn(pathname === "/audit-trail" && `text-white`)}>
                Audit Trail
              </span>
            </AuthenticatedHeaderItem>
            <AuthenticatedHeaderItem
              icon={<ShieldCheckIcon />}
              className="border border-[#ADD1FE] pl-4 pr-1 py-1 rounded-3xl"
            >
              <div className="flex items-center gap-2">
                <span>Data-Leak </span>

                <span className="bg-white px-2 py-0.5 rounded-3xl text-primary text-xs border border-[#ADD1FE]">
                  Coming soon
                </span>
              </div>
            </AuthenticatedHeaderItem>
          </ul>
        )}
      </nav>

      {type === "unauthed" && (
        <div className="flex items-center gap-5 ">
          <Link href={"/login"}>
            <PrimaryButton className=" bg-transparent text-pretty text-primary p-0">
              Login
            </PrimaryButton>
          </Link>
          <Link href={"/register"}>
            <PrimaryButton>
              <span>Register</span>
            </PrimaryButton>
          </Link>
        </div>
      )}

      {type === "authed" && (
        <div
          role="button"
          className="relative flex items-center justify-center"
        >
          <PCMABellIcon />

          <div className="w-4 h-4 absolute -top-1.5 -right-1.5 rounded-full bg-red-500 flex items-center justify-center border border-white p-2">
            <span className=" text-white font-semibold text-xs/3">1</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
