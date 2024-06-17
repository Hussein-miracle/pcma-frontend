"use client";
import ErrorMessage from "@/components/error-message/error-message";
import Header from "@/components/header/header";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import PrimaryButton from "@/components/primary-button/primary-button";
import TextInput from "@/components/text-input/text-input";
import { USER_LOGIN_TYPES } from "@/lib/constant";
import { SelectItem, UserLoginType } from "@/lib/types";
import { mergeCn, pxToRem } from "@/lib/utils";
import {
  Listbox,
  ListboxButton,
  Transition,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
  login_type: SelectItem<UserLoginType> | null;
}

const Login = () => {
  const [selectedLoginType, setSelectedLoginType] = useState(
    USER_LOGIN_TYPES[0]
  );

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm<LoginForm>({
    defaultValues: {
      login_type: null,
      email: "",
      password: "",
    },
  });


  const handleLogin = async (values:LoginForm) => {
    // console.log({values});
  }

  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header />
      <main className="w-full mx-auto pt-[4rem]">
        <form onSubmit={handleSubmit(handleLogin)} className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
              Login
            </h2>
            <p className=" text-base font-normal text-[#4C689E]">
              Please login to your account to continue.
            </p>
          </div>

          <div className="flex flex-col items-center w-full gap-4">
            <div className="w-full">
              <label
                htmlFor={"login-type"}
                className=" text-grey-70 font-normal text-base/5"
              >
                Login&nbsp;as
              </label>

              <Controller
                name="login_type"
                control={control}
                render={({ field, fieldState }) => {
                  // console.log({ field, fieldState });
                  return (
                    <Listbox
                    as={'div'}
                    role="select"
                      value={selectedLoginType}
                      onChange={(v) => {
                        setValue("login_type", v);
                        setSelectedLoginType(v);
                      }}
                    >
                      <div className="w-full relative z-10">
                        <ListboxButton className="relative cursor-pointer text-left border border-grey-30 border-solid w-full p-2 rounded outline-none transition ease-in-out duration-100 focus:border-secondary-blue ">
                          {({ open }) => {
                            return (
                              <>
                                <span className="block truncate">
                                  {selectedLoginType?.label}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronDownIcon
                                    className={mergeCn(
                                      "h-5 w-5 transform rotate-0 transition-transform ",
                                      open && "rotate-180",
                                      "stroke-red"
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </>
                            );
                          }}
                        </ListboxButton>

                        {errors.login_type?.message && (
                          <ErrorMessage text={errors?.login_type?.message} />
                        )}

                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {USER_LOGIN_TYPES.map((loginType, loginTypeIdx) => (
                              <ListboxOption
                                key={loginTypeIdx}
                                className={({ selectedOption }) =>
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4 hover:bg-secondary-blue hover:text-white text-secondary-black bg-white ${
                                    selectedOption
                                      ? "bg-secondary-blue text-white"
                                      : "text-secondary-black"
                                  }`
                                }
                                value={loginType}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {loginType.label}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 stroke-white">
                                        <CheckIcon
                                          className="h-5 w-5"
                                          stroke="#4169E1"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Transition>
                      </div>
                    </Listbox>
                  );
                }}
              />
            </div>

            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    fieldId="email-address"
                    fieldName="Email Address"
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    fieldId="password"
                    fieldName="Password"
                    secureTextEntry
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </div>

          <PrimaryButton variant="secondary" className="w-full" type="submit">
            Login
          </PrimaryButton>
        </form>
      </main>
    </section>
  );
};

export default Login;
