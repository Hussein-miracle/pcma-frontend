import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { CountNumber, DynPixel, ErrorItem } from './types';
import toast from "react-hot-toast";
import { ToastOptions, toast as rtToast } from 'react-toastify';
import { isAxiosError } from "axios";







export const montserrat = Montserrat({ weight: '400', subsets: ['latin'] })
export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '600', '700', '800'], subsets: ['latin'], display: 'swap',
  // style: ['normal', 'italic']
})

// NOTE: this is a helper function to merge tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const mergeArrayString = (arr: Array<string>,separator:string = " ,",endString:string = '') => {
  let mergedString = '';


  if(arr.length === 0 || !arr){
    return mergedString;
  }

  for(let i = 0; i < arr.length; i++){
    if(i === arr.length - 1){
      mergedString += arr[i];
    }else{
      mergedString += arr[i] + separator;
    }
  }

  return mergedString + endString;
}

export const dynamicRequiredErrorMsg = (errKey:string) => {
  return  `${errKey?.toLowerCase()} is required!.`;
}


export const successToast = (msg: string,options:ToastOptions = {}) => {
  rtToast.success(msg,{...options});
};

export const errorToast = (msg: string,options:ToastOptions = {}) => {
  rtToast.error(msg,{...options});
};


export const truncateString = (str: string, num: number = 22) => {
  if (str?.length <= num) {
    return str;
  }
  return str?.slice(0, num) + '...';
}


export const pxToRemCalc = <P extends string | number>(pixels: DynPixel<P>):CountNumber<number>  => {
  if (typeof pixels === 'string') {
    const parsedValue = parseInt(pixels, 10);
    const rem = (parsedValue / 16) ;
    // //console.log({rem});
    return rem as CountNumber<typeof rem>;
  }

  const value = (pixels as number / 16);
  // //console.log({value});
  return value as CountNumber<typeof value>;
};


export const pxToRem = <P extends string | number>(pixels: DynPixel<P>):string => {
  const px = pxToRemCalc(pixels);

  return px + 'rem';
}

// let p = pxToRem(32);


/**
 * A function to sleep for a given time (milliseconds)
 *
 * @param {number} ms - The time to sleep in milliseconds
 * @returns {void}
 */
export const sleep = async (ms:number):Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const handleErrorGlobal = (message:string |  Array<string> = '',error:any = null) => {
  // let message
  if(typeof message === 'string' && !!message){
    errorToast(message)
    return;
  }else if(Array.isArray(message)){
    let errMsg = '';

    for(const msg of message){
      errMsg += ` ${msg}    .`; 
    }


    errorToast(errMsg);
    return;
  }



  if(isAxiosError(error)){
    const errorData = error?.response?.data;
    const errorArray = errorData?.errors;

    
    if (!!errorArray && errorArray.length > 0) {
      const item =  errorArray[0] as ErrorItem;
      // for (const item of errors as ErrorItem[]) {
        const attr = item?.attr;
        const note = `${attr?.slice(0, 1).toUpperCase()}${attr?.slice(
          1
        )}: ${item?.detail}`;
        if (!!note.trim().replace(/ /g, '') && attr) {
          errorToast(note);
        } else {
          errorToast(item?.detail as string);
        }
      // }

      return;
    }
  }

}

