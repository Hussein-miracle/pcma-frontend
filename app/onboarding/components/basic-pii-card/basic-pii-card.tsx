"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextInput from "@/components/text-input/text-input";
import PrimaryButton from "@/components/primary-button/primary-button";
import FormContentContainer from "@/components/form-content-container/form-content-container";
import { BasicPiiData } from "@/lib/types";
import { usePatchBasicPii, usePostBasicPii } from "@/lib/hooks/api/mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { basic_pii_schema } from "@/lib/validations";
import { handleErrorGlobal, successToast } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setBasicPiiSaved } from "@/rtk/features/user-slice/user-slice";



const BasicPiiCard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<BasicPiiData>({
    defaultValues: {
      email: "",
      last_name: "",
      first_name: "",
    },
    resolver:zodResolver(basic_pii_schema),
  });

  const {mutateAsync:handleBasicPii,isPending:isSavingBasicPii} = usePatchBasicPii();

  const onSubmit = async (details: BasicPiiData) => {
    //console.log({basicPiiDetails: details});
    try {
      const basicPiiResponse = await handleBasicPii(details);
      //console.log({basicPiiResponse})
      successToast("Basic PII updated successfully");

      dispatch(setBasicPiiSaved(true))
      
      router.push("/onboarding/user/personal-pii");
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
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-grey-30 border-solid py-8  h-fit px-[2.625rem] bg-white mx-auto w-full max-w-[31.625rem] flex flex-col items-center gap-8 rounded-xl">
      <div className="flex flex-col items-center gap-2">
        <h2 className=" font-bold  text-secondary-black text-2xl/[2.75rem] text-center ">
          Set Basic PII
        </h2>
        <p className=" text-base font-normal text-[#4C689E]">
          Update your personal information to ensure your data is accurate and
          secure.
        </p>
      </div>

      <FormContentContainer className="flex flex-col items-center w-full gap-4">
        <Controller
          name="first_name"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                fieldId="first_name"
                fieldName="First Name"
                
                value={value}
                onChange={onChange}
                
                error={errors?.first_name?.message ?? ''}
              />
            );
          }}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                fieldId="last_name"
                fieldName="Last Name"
                value={value}
                onChange={onChange}
                
                error={errors?.last_name?.message ?? ''}
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
                <p className=" text-sm/5  font-normal text-secondary-black text-left self-start -mt-2">
                  NOTE: Your Basic PII is accessible to registered enterprises
                </p>
              </>
            );
          }}
        />
      </FormContentContainer>

      <PrimaryButton variant="secondary" type="submit" loading={isSavingBasicPii} disabled={isSavingBasicPii}>Save</PrimaryButton>
    </form>
  );
};

export default BasicPiiCard;
