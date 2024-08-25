"use client";
import React, { Fragment, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Listbox,
  ListboxButton,
  Transition,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Header from "@/components/header/header";
import PrimaryButton from "@/components/primary-button/primary-button";
import TextInput from "@/components/text-input/text-input";
import ErrorMessage from "@/components/error-message/error-message";
import ButtonLoader from "@/components/button-loader/button-loader";
import FormContentContainer from "@/components/form-content-container/form-content-container";
import Spacer from "@/components/spacer/spacer";
import { ChevronDownIcon, CheckIcon } from "@/components/icons";

import { USER_LOGIN_TYPES } from "@/lib/constants";
import { cn, handleErrorGlobal, sleep, successToast } from "@/lib/utils";
import { registrationSchema } from "@/lib/validations";
import { InferredRegistrationForm } from "@/lib/types";
import {
  usePostServiceProviderRegistration,
  usePostIndividualRegistration,
} from "@/lib/hooks/api/mutations";
import useToastCustom from "@/lib/hooks/client/use-toast-custom";

const Register = () => {
  const router = useRouter();
  // const {successToast} = useToastCustom();

  const {
    control,
    setValue,
    handleSubmit,
    // formState: { isValid },
    watch,
  } = useForm<InferredRegistrationForm>({
    defaultValues: {
      registration_type: USER_LOGIN_TYPES[0],
      email: "",
      password: "",
      confirm_password: "",
      last_name: "",
      first_name: "",
      company_name: "",
      // full_name: "",
      company_address: "",
      phone_number: "",
      registration_number: "",
    },
    resolver: zodResolver(registrationSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const registrationType = watch("registration_type");

  const {
    isPending: isPendingServiceProvider,
    mutateAsync: registerServiceProvider,
  } = usePostServiceProviderRegistration();

  const { isPending: isPendingIndividual, mutateAsync: registerIndividual } =
    usePostIndividualRegistration();

  // successToast("Registration Successful")
  const handleRegister = async (values: InferredRegistrationForm) => {
    // //console.log({ registerValues: values });

    try {
      if (registrationType.value === "individual") {
        const individualResponse = await registerIndividual({
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
          first_name: values.first_name!,
          last_name: values.last_name!,
        });

        // //console.log({individualResponse})

        successToast(individualResponse?.message ?? "Registration Successful");
        await sleep(3000);
        successToast("You're being redirected to login.");
        await sleep(2000);
        router.push("/login?loginType=user");
      } else {
        const spResponse = await registerServiceProvider({
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password,
          first_name: values.first_name!,
          last_name: values.last_name!,
          // full_name: values.full_name!,
          company_name: values.company_name!,
          company_address: values.company_address!,
          phone_number: values.phone_number!,
          registration_number: values.registration_number!,
        });

        // //console.log({spResponse})
        if(!!spResponse){

          successToast(spResponse?.message ?? "Registration Successful");
          await sleep(3000);
          successToast("You're being redirected to login.");
          await sleep(2000);
          router.push("/login?loginType=service-provider");
        }
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message ?? "An error occurred";
      // //console.log({errorMsg})
      handleErrorGlobal(errorMsg);
    }
  };

  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header />
      <main className="w-full mx-auto pt-[4rem]">
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl"
        >
          <div className="flex flex-col items-center gap-2">
            <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
              Register
            </h2>
            <p className=" text-base text-center font-normal text-[#4C689E]">
              Create an account to take control of your data privacy and start
              managing your consents
            </p>
          </div>
          <FormContentContainer className="flex flex-col items-center w-full gap-4 ">
            <div className="w-full">
              <label
                htmlFor={"login-type"}
                className=" text-grey-70 font-normal text-base/5"
              >
                Sign&nbsp;up&nbsp;as
              </label>

              <Controller
                name="registration_type"
                control={control}
                render={({ field: { value }, fieldState: { error } }) => {
                  // //console.log({ field, fieldState });
                  return (
                    <Listbox
                      as={"div"}
                      role="select"
                      value={value}
                      onChange={(currentValue) => {
                        setValue("registration_type", currentValue);
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
                                className={cn(
                                  `relative cursor-pointer select-none py-2 pl-10 pr-4  text-secondary-black bg-white`,
                                  loginType.value === value?.value
                                    ? "bg-secondary-blue text-white"
                                    : "text-secondary-black"
                                )}
                                value={loginType}
                              >
                                {({ selectedOption ,...others}) =>{
                                  //console.log({selectedOption,others})
                                  return  (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          loginType.value === value?.value
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {loginType.label}
                                      </span>
                                      {loginType.value === value?.value ? (
                                       
                                          <CheckIcon
                                            className="h-6 w-6 ml-3  absolute top-2 left-0"
                                            stroke="white"
                                            aria-hidden="true"
                                          />
                                        
                                      ) : null}
                                    </>
                                  )
                                }}
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
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => {
                return (
                  <TextInput
                    onBlur={onBlur}
                    fieldId="email"
                    fieldName="Email Address"
                    value={value}
                    onChange={onChange}
                    error={error?.message ?? ""}
                  />
                );
              }}
            />

            {/* {registrationType.value === "individual" && ( */}
              <>
                <Controller
                  name="first_name"
                  control={control}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextInput
                        onBlur={onBlur}
                        fieldId="first_name"
                        fieldName="First Name"
                        value={value}
                        onChange={onChange}
                        error={error?.message ?? ""}
                      />
                    );
                  }}
                />
                <Controller
                  name="last_name"
                  control={control}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextInput
                        onBlur={onBlur}
                        fieldId="last_name"
                        fieldName="Last Name"
                        value={value}
                        onChange={onChange}
                        error={error?.message ?? ""}
                      />
                    );
                  }}
                />
              </>
            {/* )} */}
            {registrationType.value !== "individual" && (
              <>
                {/* <Controller
                  name="full_name"
                  control={control}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextInput
                        onBlur={onBlur}
                        fieldId="full_name"
                        fieldName="Full Name"
                        value={value}
                        onChange={onChange}
                        error={error?.message ?? ""}
                      />
                    );
                  }}
                /> */}
                <Controller
                  name="company_name"
                  control={control}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextInput
                        onBlur={onBlur}
                        fieldId="company_name"
                        fieldName="Company Name"
                        value={value}
                        onChange={onChange}
                        error={error?.message ?? ""}
                      />
                    );
                  }}
                />
                <Controller
                  name="company_address"
                  control={control}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextInput
                        onBlur={onBlur}
                        fieldId="company_address"
                        fieldName="Company Address"
                        value={value}
                        onChange={onChange}
                        error={error?.message ?? ""}
                      />
                    );
                  }}
                />
                <Controller
                  name="registration_number"
                  control={control}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextInput
                        onBlur={onBlur}
                        fieldId="registration_number"
                        fieldName="Registration Number"
                        value={value}
                        onChange={onChange}
                        error={error?.message ?? ""}
                      />
                    );
                  }}
                />
                <Controller
                  name="phone_number"
                  control={control}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextInput
                        onBlur={onBlur}
                        fieldId="phone_number"
                        fieldName="Phone Number"
                        value={value}
                        onChange={onChange}
                        error={error?.message ?? ""}
                      />
                    );
                  }}
                />
              </>
            )}
            <Controller
              name="password"
              control={control}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => {
                return (
                  <TextInput
                    fieldId="password"
                    fieldName="Password"
                    onBlur={onBlur}
                    secureTextEntry
                    value={value}
                    onChange={onChange}
                    error={error?.message ?? ""}
                  />
                );
              }}
            />

            <Controller
              name="confirm_password"
              control={control}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => {
                return (
                  <TextInput
                    onBlur={onBlur}
                    fieldId="confirm_password"
                    fieldName="Confirm Password"
                    secureTextEntry
                    value={value}
                    onChange={onChange}
                    error={error?.message ?? ""}
                  />
                );
              }}
            />
          </FormContentContainer>

          <PrimaryButton
            variant="secondary"
            className="w-full"
            type="submit"
            disabled={isPendingIndividual || isPendingServiceProvider}
          >
            {isPendingIndividual || isPendingServiceProvider ? (
              <ButtonLoader />
            ) : (
              <span>Create&nbsp;Account</span>
            )}
          </PrimaryButton>
        </form>
      </main>

      <Spacer size={108} />
    </section>
  );
};

export default Register;
