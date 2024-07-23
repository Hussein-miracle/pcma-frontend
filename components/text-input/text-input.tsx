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
import { cn } from "@/lib/utils";

interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  secureTextEntry?: boolean;
  secureTextEntryIcon?: ReactNode;
  fieldName?: string;
  fieldId?: string;
  error?: string;
  value?: string | undefined;
  type?: string;
  icon?: ReactNode;
  iconPosition?: "right" | "left";
  placeholder?: string;
  ref?: any;
  required?: boolean;
  className?: string;
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
  placeholder = fieldName ,
  required,
  secureTextEntryIcon = null,
  className,
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
          ref={props.ref ?? undefined}
          type={textType}
          name={fieldId}
          id={fieldId}
          {...props}
          placeholder={placeholder}
          autoComplete="off"
          required={required ?? undefined}
          value={value}
          className={cn("border border-grey-30 border-solid w-full p-2 rounded outline-none transition ease-in-out duration-100 focus:border-secondary-blue placeholder:text-grey-90 placeholder:text-base placeholder:font-normal ",className)}
        />

        {secureTextEntry && (
          <button
            type="button"
            className="absolute top-2 right-4"
            onClick={toggle}
          >
            <>
              {secureTextEntryIcon ? (
                secureTextEntryIcon
              ) : !toggleState ? (
                <EyeCloseIcon className="!stroke-primary " />
              ) : (
                <EyeIcon className="w-6 h-6 stroke-primary block" />
              )}
            </>
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
