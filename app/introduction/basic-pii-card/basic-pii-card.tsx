"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@/components/text-input/text-input";
import PrimaryButton from "@/components/primary-button/primary-button";

interface BasicPiiForm {
  lastname: string;
  firstname: string;
  email: string;
}

const BasicPiiCard = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<BasicPiiForm>({
    defaultValues: {
      email: "",
      lastname: "",
      firstname: "",
    },
  });

  return (
    <form className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
          Set Basic PII
        </h2>
        <p className=" text-base font-normal text-[#4C689E]">
          Update your personal information to ensure your data is accurate and
          secure.
        </p>
      </div>

      <div className="flex flex-col items-center w-full gap-4">
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
          name="email"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  fieldId="email-address"
                  fieldName="Email Address"
                  value={value}
                  onChange={onChange}
                />
                <p className=" text-sm/5  font-normal text-secondary-black text-left self-start -mt-2">
                  NOTE: Your Basic PII is accessible to registered enterprises
                </p>
              </>
            );
          }}
        />
      </div>

      <PrimaryButton variant="secondary">Save</PrimaryButton>
    </form>
  );
};

export default BasicPiiCard;
