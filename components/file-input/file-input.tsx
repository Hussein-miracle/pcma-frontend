"use client";
import React, { ChangeEvent, HTMLAttributes, useRef } from "react";
import { AttachmentIcon } from "../icons";
import ErrorMessage from "../error-message/error-message";

interface FileInputProps extends HTMLAttributes<HTMLInputElement> {
  fieldName?: string;
  selectedFileName?: string;
  fieldId?: string;
  error?: string;
  value?: string;
  placeholder?: string;
  onChange?: (fileEvent: ChangeEvent<HTMLInputElement>) => void;
  onFileSelect?: (files: FileList | null) => void;
  fileIcon?: React.ReactNode;
}

const FileInput = ({
  fieldId,
  fieldName,
  selectedFileName = "",
  error,
  value,
  placeholder = "Select File",
  onChange,
  onFileSelect,
  fileIcon = null,
  ...props
}: FileInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
          ref={fileInputRef}
          id={fieldId}
          type="file"
          value={value}
          hidden
          onChange={(fileEvent) => {
            fileEvent?.preventDefault();
            // console.log({ fileEvent });
            const files = fileEvent?.target?.files;
            onChange?.(fileEvent);
            onFileSelect?.(files);
          }}
        />

        <div
          onClick={() => {
            // console.log({fl:fileInputRef?.current})
            fileInputRef?.current?.click();
          }}
          className="border cursor-pointer border-grey-30 border-solid w-full p-2 rounded outline-none transition ease-in-out duration-100 focus:border-secondary-blue placeholder:text-grey-90 placeholder:text-base placeholder:font-normal text-grey-90 text-base font-normal h-[2.6rem] bg-white "
        >
          {!!selectedFileName ? selectedFileName : placeholder}
        </div>

        <label
          className="absolute top-2 right-3 cursor-pointer"
          htmlFor={fieldId}
        >
          {fileIcon ? fileIcon : <AttachmentIcon />}
        </label>
      </div>

      {error && <ErrorMessage text={error} />}
    </div>
  );
};

export default FileInput;
