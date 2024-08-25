"use client";
import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@/components/text-input/text-input";
import PrimaryButton from "@/components/primary-button/primary-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format as formatDate } from "date-fns";
import { CalenderIcon } from "@/components/icons";
import FormContentContainer from "@/components/form-content-container/form-content-container";
import { usePatchPersonalPii, usePostPersonalPii } from "@/lib/hooks/api/mutations";
import { handleErrorGlobal, successToast } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { personal_pii_schema } from "@/lib/validations";
import { useAppRouter } from "@/lib/hooks/client/use-app-router";
import { setPersonalPiiSaved } from "@/rtk/features/user-slice/user-slice";
import { useDispatch } from "react-redux";

interface PersonalPiiForm {
  phone_number: string;
  country: string;
  home_address: string;
  occupation: string;
  date_of_birth:string;
}

const PersonalPiiCard = () => {
  const router = useAppRouter();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<PersonalPiiForm>({
    defaultValues: {
      phone_number: "",
      date_of_birth: "",
      country: "",
      occupation: "",
      home_address: "",
    },
    resolver:zodResolver(personal_pii_schema),
  });

  const values = watch();
  const dateOfBirth = watch('date_of_birth');

  
  const dateOfBirthValue = useMemo(() => {
    // //console.log({dateOfBirth})
    if(!!dateOfBirth){
      const dateValue = new Date(dateOfBirth);
      return formatDate(dateValue, "PPP");
    }
    return "";
  },[dateOfBirth]);

  // //console.log({dateOfBirthValue})


  const {mutateAsync:handlePersonalPii,isPending:isPendingPersonalPii} = usePatchPersonalPii();

  const onSubmit = async (data: PersonalPiiForm) => {
    try {
  //    //console.log({ data });
      const response = await handlePersonalPii(data);

//      //console.log({ response });


      dispatch(setPersonalPiiSaved(true));

      successToast("Personal PII updated successfully");


      router.push("/overview");
      
    } catch (error:any) {
      let errorMsg =  "An error occurred";
      // //console.log({errorLogin:error})
      if(error instanceof Error){
        errorMsg = error?.message;
      }else{
        if(error?.response?.data?.message){
          errorMsg =  error?.response?.data?.message ;
        }
      }
      // //console.log({errorMsg})
      handleErrorGlobal(errorMsg);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
          Set Personal PII
        </h2>
        <p className=" text-base font-normal text-[#4C689E]">
          Update your personal information to ensure your data is accurate and
          secure.
        </p>
      </div>

      <FormContentContainer className="flex flex-col items-center w-full gap-4">
        {/* <Controller
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
        /> */}

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
                  error={errors?.phone_number?.message ?? ""}
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
                    value={dateOfBirthValue}
                    onChange={() => {}}
                    placeholder="Choose Date"
                    error={errors?.date_of_birth?.message ?? ""}
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
                      selected={values.date_of_birth as unknown as Date}
                      onSelect={(date_value) => {
                        //console.log({ date_value }, "date");
                        if (!!date_value) {
                          const dateValue = formatDate(date_value, "yyyy-MM-dd");
                    //  //console.log({ dateValue }, "dateValue");
                          setValue("date_of_birth", dateValue);
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
                  error={errors?.home_address?.message ?? ""}
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
                  error={errors?.country?.message ?? ""}
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
                  error={errors?.occupation?.message ?? ""}
                />
              </>
            );
          }}
        />
      </FormContentContainer>

      <PrimaryButton variant="secondary" disabled={isPendingPersonalPii} loading={isPendingPersonalPii}>Save</PrimaryButton>
    </form>
  );
};

export default PersonalPiiCard;
