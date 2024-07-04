"use client";
import React, {
  HTMLAttributes,
  HtmlHTMLAttributes,
  ReactNode,
  useMemo,
} from "react";
import { EyeCloseIcon, EyeIcon, EyeOpenIcon } from "../icons";
import useToggle from "@/lib/hooks/client/use-toggle";
import ErrorMessage from "../error-message/error-message";

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  secureTextEntry?: boolean;
  fieldName?: string;
  fieldId?: string;
  error?: string;
  value?: string | undefined;
  type?: string;
  icon?: ReactNode;
  iconPosition?: "right" | "left";
  placeholder?:string;
}

const TextInput = ({
  secureTextEntry = false,
  fieldId,
  fieldName,
  error,
  value,
  type = "text",
  iconPosition = "right",
  icon,
  placeholder,
  ...props
}: TextInputProps) => {
  const { toggle, toggleState } = useToggle(false);

  const textType = useMemo(() => {
    if (secureTextEntry === true && toggleState === true) {
      return "password";
    }

    return type ?? "text";
  }, [type, secureTextEntry, toggleState]);

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
          type={textType}
          name={fieldId}
          id={fieldId}
          placeholder={placeholder}
          {...props}
          value={value}
          className="border border-grey-30 border-solid w-full p-2 rounded outline-none transition ease-in-out duration-100 focus:border-secondary-blue placeholder:text-grey-90 placeholder:text-base placeholder:font-normal "
        />

        {secureTextEntry && (
          <button
            type="button"
            className="absolute top-2 right-4"
            onClick={toggle}
          >
            {!toggleState ? (
              <EyeCloseIcon className="!stroke-primary " />
            ) : (
              <EyeIcon className="w-6 h-6 stroke-primary block" />
            )}
          </button>
        )}

        {!secureTextEntry && !!icon && iconPosition === "right" ? (
          <div className="absolute top-2 right-4">{icon}</div>
        ) : null}
      </div>

      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export default TextInput;
