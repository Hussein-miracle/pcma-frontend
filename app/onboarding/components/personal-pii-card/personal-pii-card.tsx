"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@/components/text-input/text-input";
import PrimaryButton from "@/components/primary-button/primary-button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format as formatDate } from "date-fns";
import { CalenderIcon } from "@/components/icons";
import FormContentContainer from "@/components/form-content-container/form-content-container";

interface PersonalPiiForm {
  fullname: string;
  email: string;
  phone_number:string;
  home_address:string;
  country:string;
  occupation:string;
  date_of_birth: Date | string;
}

const PersonalPiiCard = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    watch
  } = useForm<PersonalPiiForm>({
    defaultValues: {
      email: "",
      fullname: "",
      phone_number:"",
      home_address:"",
      date_of_birth:"",
    },
  });

  const values = watch();
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

      <FormContentContainer className="flex flex-col items-center w-full gap-4">
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
                error={errors?.fullname?.message ?? ''}
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
                  error={errors?.email?.message ?? ''}
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
                  error={errors?.phone_number?.message ?? ''}
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
                        <Popover>
                          <TextInput
                            fieldId="date_of_birth"
                            fieldName="Date of Birth"
                            value={values.date_of_birth as string}
                            onChange={() => {}}
                            placeholder="Choose Date"
                            error={errors?.date_of_birth?.message ?? ''}
                            icon={
                              <PopoverTrigger asChild>
                                <div>
                                  <CalenderIcon />
                                </div>
                              </PopoverTrigger>
                            }
                          />

                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={values.date_of_birth as Date}
                              onSelect={(date_value) => {
                                console.log({ date_value }, "date");
                                if (!!date_value) {
                                  const date = formatDate(date_value, "PPP");
                                  setValue("date_of_birth", date);
                                }
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
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

                  error={errors?.home_address?.message ?? ''}
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
                  
                  error={errors?.country?.message ?? ''}
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
                  
                  error={errors?.occupation?.message ?? ''}
                />
         
              </>
            );
          }}
        />
      </FormContentContainer>

      <PrimaryButton variant="secondary">Save</PrimaryButton>
    </form>
  );
};

export default PersonalPiiCard;
