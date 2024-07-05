"use client";
import Link from "next/link";
import React, { Fragment } from "react";
import {
  CloseIcon,
  ColorSwatchIcon,
  GridIcon,
  PCMABellIcon,
  PCMALogo,
  PCMANotificationEmptyIcon,
  ShieldCheckIcon,
  UserProfileIcon,
} from "../icons";
import PrimaryButton from "../primary-button/primary-button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { IDateNotification, INotification } from "@/lib/types";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useToggle from "@/lib/hooks/client/use-toggle";
import Spacer from "../spacer/spacer";

interface HeaderProps {
  variant?: "white" | "grey";
  // NOTE:the property below would be removed
  type?: "unauthed" | "authed";
}

type AuthenticatedHeaderItemProps = {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  href?: string;
};

type NotificationItemProps = {
  notification?: INotification;
  index?: number;
};

type NotificationDateItemProps = {
  data?: IDateNotification;
};

const AuthenticatedHeaderItem = ({
  icon,
  children,
  className,
  href = "",
}: AuthenticatedHeaderItemProps) => {
  return (
    <>
      {!!href ? (
        <Link href={href}>
          <li
            className={cn(
              "w-fit h-fit cursor-pointer py-1 px-2 flex items-center gap-2 bg-[#0074FF0D] rounded-[10px]",
              !href && " cursor-not-allowed ",
              className
            )}
          >
            <div className="">{icon}</div>
            <div className=" font-semibold text-secondary-black text-base/4 tracking-[1%]">
              {children}
            </div>
          </li>
        </Link>
      ) : (
        <li
          className={cn(
            "w-fit h-fit cursor-pointer py-1 px-2 flex items-center gap-2 bg-[#0074FF0D] rounded-[10px]",
            !href && " cursor-not-allowed ",
            className
          )}
        >
          <div className="">{icon}</div>
          <div className=" font-semibold text-secondary-black text-base/4 tracking-[1%]">
            {children}
          </div>
        </li>
      )}
    </>
  );
};

type D<S extends string> = S extends `/${infer T}` ? T : never;

const NotificationItem = ({
  notification = { title: "", message: "" },
  index = 0,
}: NotificationItemProps) => {
  const { title, message } = notification;

  return (
    <div className="bg-white w-full h-[86px] border border-[#0074FF1A] p-4 gap-2.5 flex items-center justify-between rounded-xl">
      <div className="h-full flex flex-col justify-between items-start">
        <h2 className="text-sm font-semibold text-grey-60 sm:text-base">
          {!title
            ? (index + 1) % 2 === 0
              ? "Data Access Request"
              : "Policy Update"
            : title}
        </h2>
        <p className="mb-2 text-xs font-normal text-grey-90 sm:text-sm">
          {message
            ? message
            : "Notification about a request to access your data."}
        </p>
      </div>

      <button className="inline-flex items-center gap-2.5 rounded-xl bg-[#0074FF0D] py-1.5 px-3 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#0074FF0D]/10 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#0074FF0D]">
        Open
      </button>
    </div>
  );
};

const NotificationDateItem = ({ data }: NotificationDateItemProps) => {
  const notifications = [...Array(2)];
  return (
    <div className="w-full">
      <span className=" capitalize text-grey-60 text-sm/4 tracking-[2%] ">
        today
      </span>
      <Spacer size={10} />
      <div className="flex flex-col items-center  w-full gap-3 custom-scroller overflow-auto">
        {notifications?.map((notification, idx) => {
          return <NotificationItem key={idx} index={idx} />;
        })}
      </div>
    </div>
  );
};

const NotificationEmpty = () => {
  return (
    <div className=" w-full">
      <div className=" mx-auto flex h-52 w-64 items-center justify-center">
        <PCMANotificationEmptyIcon/>
      </div>

      <h2 className=" mx-auto mb-4 text-center text-2xl font-semibold leading-normal tracking-[0.4px] text-grey-60">
        No&nbsp;Notification
      </h2>

      <p className=" mx-auto text-center text-base font-normal leading-normal tracking-[0.32px] text-grey-80">
        You have no notification yet
      </p>
    </div>
  );
};
const Header = ({ variant = "white", type = "unauthed" }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toggle: toggleNotiDialog, toggleState: showNotiDialog } =
    useToggle();

  // console.log({ pathname }, "PN");

  const notifications: Array<any> = [];

  return (
    <Fragment>
      <header
        className={cn(
          "border-b border-b-grey-30 w-full py-4 px-6 sm:px-[7.5rem] flex items-center justify-between gap-[10px] h-full z-10",
          variant === "white" ? "bg-neutral-white" : "bg-grey-10"
        )}
      >
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
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
                href="/overview"
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
                href={"/profile"}
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
                href="/audit-trail"
                icon={
                  <ColorSwatchIcon
                    stroke={pathname === "/audit-trail" ? "#fff" : undefined}
                  />
                }
                className={cn(pathname === "/audit-trail" && `bg-primary`)}
              >
                <span
                  className={cn(pathname === "/audit-trail" && `text-white`)}
                >
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
            onClick={toggleNotiDialog}
          >
            <PCMABellIcon />

            <div className="w-4 h-4 absolute -top-1.5 -right-1.5 rounded-full bg-red-500 flex items-center justify-center border border-white p-2">
              <span className=" text-white font-semibold text-xs/3">1</span>
            </div>
          </div>
        )}
      </header>

      <Dialog
        open={showNotiDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={toggleNotiDialog}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-grey-100/70">
          <div className="flex min-h-full items-center justify-center w-full">
            <DialogPanel
              // @ts-ignore
              transition={true}
              className="w-full max-w-[32rem] rounded-3xl bg-[#F7F9FD] border border-grey-30 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0  h-[33rem] overflow-hidden"
            >
              <DialogTitle
                as="div"
                className="text-xl/6 font-semibold text-grey-60 tracking-[2%] text-center  w-full relative"
              >
                <span> Notifications</span>

                <button
                  className="absolute right-0 top-0 outline-none border-none focus:outline-none  justify-self-end "
                  onClick={toggleNotiDialog}
                >
                  <CloseIcon />
                </button>
              </DialogTitle>

              <Spacer size={24} />

              {notifications?.length > 0 ? (
                <div className="h-[27rem] w-full overflow-hidden">
                  <div className="w-full custom-scroller  h-full overflow-auto flex flex-col gap-4">
                    {notifications?.map((n, idx) => {
                      return <NotificationDateItem key={idx} />;
                    })}
                  </div>
                </div>
              ) : null}

              {notifications.length <= 0 && <NotificationEmpty />}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default Header;
