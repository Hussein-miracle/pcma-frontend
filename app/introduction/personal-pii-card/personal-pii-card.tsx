"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@/components/text-input/text-input";
import PrimaryButton from "@/components/primary-button/primary-button";

interface PersonalPiiForm {
  fullname: string;
  email: string;
  phone_number:string;
  home_address:string;
  country:string;
  occupation:string;
  date_of_birth:string;
}

const PersonalPiiCard = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<PersonalPiiForm>({
    defaultValues: {
      email: "",
      fullname: "",
      phone_number:"",
      home_address:"",
      date_of_birth:"",
    },
  });

  return (
    <form className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
        Set Personal PII
        </h2>
        <p className=" text-base font-normal text-[#4C689E]">
        Update your personal information to ensure your data is accurate and secure.
        </p>
      </div>

      <div className="flex flex-col items-center w-full gap-4">
        <Controller
          name="fullname"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                fieldId="fullname"
                fieldName="Full Name"
                
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
              </>
            );
          }}
        />

        <Controller
          name="phone_number"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  fieldId="phone_number"
                  fieldName="Phone Number"
                  value={value}
                  onChange={onChange}
                />
              </>
            );
          }}
        />
        <Controller
          name="date_of_birth"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  fieldId="date_of_birth"
                  fieldName="Date of Birth"
                  value={value}
                  
                  onChange={onChange}
                />
              </>
            );
          }}
        />
        <Controller
          name="home_address"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  fieldId="home_address"
                  fieldName="Home Address"
                  value={value}
                  onChange={onChange}
                />
         
              </>
            );
          }}
        />
        <Controller
          name="country"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  fieldId="country"
                  fieldName="Country"
                  value={value}
                  onChange={onChange}
                />
         
              </>
            );
          }}
        />
        <Controller
          name="occupation"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <TextInput
                  fieldId="occupation"
                  fieldName="Occupation"
                  value={value}
                  onChange={onChange}
                />
         
              </>
            );
          }}
        />
      </div>

      <PrimaryButton variant="secondary">Save</PrimaryButton>
    </form>
  );
};

export default PersonalPiiCard;
