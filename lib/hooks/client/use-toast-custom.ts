"use client";

import { toast } from "react-hot-toast";

// import { useToast } from "@/components/ui/use-toast";

const useToastCustom = () => {
  // const { toast, dismiss } = useToast();

  const successToast = (message: string) => {
    toast.success(message, {
      className: "bg-green-500 text-white",
    })
  }

  const warnToast = (message: string) => {
    toast.success(message, {
      className: "bg-yellow-500 text-white",
    })
  }




  const errorToast = (message: string) => {
    toast.error(message, {})
  }


  return { successToast, errorToast, warnToast }

}

export default useToastCustom;