import Link from "next/link";
import React from "react";
import { PCMALogo } from "../icons";
import PrimaryButton from "../primary-button/primary-button";
import { mergeCn } from "@/lib/utils";

interface HeaderProps {
  variant?: "white" | "grey";
}

const Header = ({ variant = "white" }: HeaderProps) => {
  return (
    <header className={mergeCn("border-b border-b-grey-30 w-full py-4 px-[7.5rem] flex items-center justify-between gap-[10px] h-full z-10",variant === 'white' ? 'bg-neutral-white' : 'bg-grey-10')}>
      <div className="">
        <PCMALogo />
      </div>

      <nav className="w-fit h-full">
        <ul className="flex items-center gap-6 h-full">
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
      </nav>

      <div className="flex items-center gap-5">
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
    </header>
  );
};

export default Header;
