"use client";
import React, { HTMLAttributes, HtmlHTMLAttributes } from "react";
import { EyeCloseIcon, EyeIcon, EyeOpenIcon } from "../icons";
import useToggle from "@/lib/hooks/client/use-toggle";
import ErrorMessage from "../error-message/error-message";

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  secureTextEntry?: boolean;
  fieldName?: string;
  fieldId?: string;
  error?:string;
  value?:string | undefined;
}

const TextInput = ({
  secureTextEntry = false,
  fieldId,
  fieldName,
  error,
  value,
  ...props
}: TextInputProps) => {

  const {toggle,toggleState} = useToggle(false)
  return (
    <div className="w-full">
      <label
        htmlFor={fieldId}
        className=" text-grey-70 font-normal text-base/5"
      >
        {fieldName}
      </label>
      <div className="w-full relative h-fit">
        <input
          type={!toggleState ? "text" : 'password'}
          name={fieldId}
          id={fieldId}
          {...props}
          value={value}
          className="border border-grey-30 border-solid w-full p-2 rounded outline-none transition ease-in-out duration-100 focus:border-secondary-blue "
          />

        {secureTextEntry && <button type="button" className="absolute top-2 right-4" onClick={toggle}>
          
        {!toggleState ?  <EyeCloseIcon className="!stroke-primary "/> : <EyeIcon className="w-6 h-6 stroke-primary block"/>}
          
          </button>}
      </div>

      {error && <ErrorMessage text={error}/>}
    </div>
  );
};

export default TextInput;
