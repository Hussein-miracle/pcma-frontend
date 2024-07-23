import { HTMLAttributes } from "react";
import { cn, montserrat } from "@/lib/utils";
import ErrorMessage from "../error-message/error-message";

interface FooterFormFieldProps extends HTMLAttributes<HTMLInputElement> {
  fieldName: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: "email" | "text" | "tel";
  autocomplete?: string | "off";
  endFieldNameWithAsterisk?: boolean;
  error?: string;
}

const FooterFormField = ({
  type = "text",
  autocomplete = "off",
  fieldName,
  endFieldNameWithAsterisk = false,
  error,
  ...otherProps
}: FooterFormFieldProps) => {
  const uniqueId = fieldName?.replace(/ /g,'-')?.toLowerCase();
  return (
    <div className="w-full">
      <label
        className="w-full rounded-xl border border-[#D4DAF0] border-solid px-5 py-3 flex items-center gap-2 h-fit"
        htmlFor={uniqueId}
      >
        <label
          className={cn(
            "flex items-center gap-1 whitespace-nowrap",
            `${montserrat.className} text-sm/6 text-secondary-black tracking-[1%]`
          )}
          htmlFor={uniqueId}
        >
          <span>{fieldName}</span>
          {endFieldNameWithAsterisk && <span className="text-primary">*</span>}
        </label>

        <input
          id={uniqueId}
          name={uniqueId}
          autoComplete={autocomplete}
          type={type}
          required={endFieldNameWithAsterisk}
          onChange={otherProps?.onChange}
          value={otherProps?.value}
          className={cn(
            "h-full w-full outline-none border-none focus:outline-none",
            `${montserrat.className} text-sm/6 text-secondary-black tracking-[1%]`
          )}
        />
      </label>
      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export default FooterFormField;
