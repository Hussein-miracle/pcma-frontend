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
import Header from "@/components/header/header";
import PrimaryButton from "@/components/primary-button/primary-button";
import TextInput from "@/components/text-input/text-input";
import ErrorMessage from "@/components/error-message/error-message";
import { ChevronDownIcon, CheckIcon } from "@/components/icons";
import { USER_LOGIN_TYPES } from "@/lib/constant";
import { cn } from "@/lib/utils";
import { SelectItem, UserLoginType } from "@/lib/types";
import Spacer from "@/components/spacer/spacer";

interface RegisterForm {
  email: string;
  password: string;
  confirm_password: string;
  register_type: SelectItem<UserLoginType> | null;
  lastname:string;
  firstname:string;
}

const Register = () => {
  const [selectedRegisterType, setSelectedRegisterType] = useState(
    USER_LOGIN_TYPES[0]
  );

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<RegisterForm>({
    defaultValues: {
      register_type: null,
      email: "",
      password: "",
      confirm_password: "",
      lastname:"",
      firstname:"",
    },
  });

  const handleRegister = async (values:RegisterForm) => {
    console.log({registerValues:values});
  }


  return (
    <section className="bg-grey-10 w-full h-full min-h-screen">
      <Header />
      <main className="w-full mx-auto pt-[4rem]">
        <form onSubmit={handleSubmit(handleRegister)} className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl">
          <div className="flex flex-col items-center gap-2">
            <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
              Register
            </h2>
            <p className=" text-base text-center font-normal text-[#4C689E]">
              Create an account to take control of your data privacy and start
              managing your consents
            </p>
          </div>
          <main className="flex flex-col items-center w-full gap-4">
            <div className="w-full">
              <label
                htmlFor={"login-type"}
                className=" text-grey-70 font-normal text-base/5"
              >
                Sign&nbsp;up&nbsp;as
              </label>

              <Controller
                name="register_type"
                control={control}
                render={({ field, fieldState }) => {
                  // console.log({ field, fieldState });
                  return (
                    <Listbox
                      as={"div"}
                      role="select"
                      value={selectedRegisterType}
                      onChange={(v) => {
                        setValue("register_type", v);
                        setSelectedRegisterType(v);
                      }}
                    >
                      <div className="w-full relative z-10">
                        <ListboxButton className="relative cursor-pointer text-left border border-grey-30 border-solid w-full p-2 rounded outline-none transition ease-in-out duration-100 focus:border-secondary-blue ">
                          {({ open }) => {
                            return (
                              <>
                                <span className="block truncate">
                                  {selectedRegisterType?.label}
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

                        {errors.register_type?.message && (
                          <ErrorMessage text={errors?.register_type?.message} />
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
                    fieldId="email_address"
                    fieldName="Email Address"
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />

            <Controller
              name="firstname"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    fieldId="firstname"
                    fieldName="First Name"
                    
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
            <Controller
              name="lastname"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    fieldId="lastname"
                    fieldName="Last Name"
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

            <Controller
              name="confirm_password"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextInput
                    fieldId="confirm_password"
                    fieldName="Confirm Password"
                    secureTextEntry
                    value={value}
                    onChange={onChange}
                  />
                );
              }}
            />
          </main>

          <PrimaryButton variant="secondary" className="w-full">
            Create&nbsp;Account
          </PrimaryButton>
        </form>
      </main>

      <Spacer size={108}/>
    </section>
  );
};

export default Register;
