"use client";
import React, { Fragment, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Listbox,
  ListboxButton,
  Transition,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import ErrorMessage from "@/components/error-message/error-message";
import Header from "@/components/header/header";
import PrimaryButton from "@/components/primary-button/primary-button";
import TextInput from "@/components/text-input/text-input";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import { USER_LOGIN_TYPES, VALIDATION_ERROR_MESSAGES } from "@/lib/constants";
import { InferredLoginForm, LoginForm } from "@/lib/types";
import { cn, handleErrorGlobal, successToast } from "@/lib/utils";
import { loginSchema } from "@/lib/validations";
import { z } from "zod";
import { usePostIndividualLogin, usePostServiceProviderLogin } from "@/lib/hooks/api/mutations";
import useToastCustom from "@/lib/hooks/client/use-toast-custom";
import { useAppRouter } from "@/lib/hooks/client/use-app-router";
import { useDispatch } from "react-redux";
import { setAccessToken, setRefreshToken, setRole } from "@/rtk/features/auth-slice/auth-slice";

const Login = () => {
  const dispatch = useDispatch();
  // const {successToast,errorToast} = useToastCustom();
  const router = useAppRouter();
  const {
    control,
    // formState: { isValid },
    setValue,
    handleSubmit,
    watch
  } = useForm<LoginForm>({
    defaultValues:{
      login_type: {    ...USER_LOGIN_TYPES[0]},
      email:"",
      password:""
    },
    resolver: zodResolver(loginSchema),
    mode:"all",
    reValidateMode:"onChange"
  });


  const loginType = watch('login_type');

  // console.log({errors});

  const {isPending:isPendingServiceProvider,mutateAsync:loginServiceProvider} = usePostServiceProviderLogin();

  const {isPending:isPendingIndividual,mutateAsync:loginIndividual} = usePostIndividualLogin();


  const handleLogin = async (values: InferredLoginForm) => {
   // console.log({loginValues: values });
    try {
      if (loginType.value === "individual") {

       const individualLoginResponse =  await loginIndividual({
          email: values.email,
          password: values.password,
        });

        console.log({individualLoginResponse})

        const role = individualLoginResponse?.role;
        const token = individualLoginResponse?.token;


        dispatch(setAccessToken(token.access_token));

        dispatch(setRefreshToken(token.refresh_token));

        dispatch(setRole(role));

        successToast(individualLoginResponse?.message ?? "Login Successful")
   
        // router.push("/overview"); 

      } else {

        const spLoginResponse = await loginServiceProvider({
          email: values.email,
          password: values.password,
        });

        console.log({spLoginResponse});

        const token = spLoginResponse?.token;
        const role = spLoginResponse?.role;
        dispatch(setRole(role));  
        dispatch(setAccessToken(token.access_token));
        dispatch(setRefreshToken(token.refresh_token));

        successToast(spLoginResponse?.message ?? "Login Successful");

        router.push("/applications");     
      }
    } catch (error:any) {
      // console.log({errorLogin:error})
      const errorMsg = error?.response?.data?.message ?? "An error occurred";
      // console.log({errorMsg})
      handleErrorGlobal(errorMsg)
    }
  };

  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header />
      <main className="w-full mx-auto pt-[4rem]">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl"
        >
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
               // rules={{ required: true }}
                render={({ field:{value}, fieldState:{error}}) => {
                  // console.log({ field, fieldState });
                  return (
                    <Listbox
                      as={"div"}
                      role="select"
                      value={value}
                      onChange={(currentValue) => {
                        console.log({currentValue})
                        setValue("login_type", currentValue);
                        // setSelectedLoginType(v);
                      }}
                    >
                      <div className="w-full relative z-10">
                        <ListboxButton className="relative cursor-pointer text-left border border-grey-30 border-solid w-full p-2 rounded outline-none transition ease-in-out duration-100 focus:border-secondary-blue ">
                          {({ open }) => {
                            return (
                              <>
                                <span className="block truncate">
                                  {value?.label}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <ChevronDownIcon
                                    className={cn(
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



                        {!!error?.message && (
                          <ErrorMessage text={error?.message} />
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
                                      {loginType?.label}
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
              // rules={{ required: true }}
              render={({ field: { onChange, value,onBlur } ,fieldState:{error}}) => {
                return (
                  <TextInput
                    fieldId="email"
                    fieldName="Email Address"
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={error?.message ?? ""}
                  />
                );
              }}
            />
            <Controller
              name="password"
              control={control}
              // rules={{ required: VALIDATION_ERROR_MESSAGES.PASSWORD }}
              // rules={{ required: true }}
              render={({ field: { onChange, value ,onBlur},fieldState:{error} }) => {
                return (
                  <TextInput
                    fieldId="password"
                    fieldName="Password"
                    value={value}
                    onBlur={onBlur}
                    secureTextEntry
                    onChange={onChange}
                    error={error?.message ?? ""}
                  />
                );
              }}
            />
          </div>

          <PrimaryButton variant="secondary" className="w-full" type="submit"  disabled={isPendingIndividual || isPendingServiceProvider} loading={isPendingIndividual || isPendingServiceProvider}>
            Login
          </PrimaryButton>
        </form>
      </main>
    </section>
  );
};

export default Login;
