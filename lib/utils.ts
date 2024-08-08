import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { CountNumber, DynPixel } from './types';
import toast from "react-hot-toast";
import { ToastOptions, toast as rtToast } from 'react-toastify';







export const montserrat = Montserrat({ weight: '400', subsets: ['latin'] })
export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '600', '700', '800'], subsets: ['latin'], display: 'swap',
  // style: ['normal', 'italic']
})

// NOTE: this is a helper function to merge tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
}


export const pxToRemCalc = <P extends string | number>(pixels: DynPixel<P>):CountNumber<number>  => {
  if (typeof pixels === 'string') {
    const parsedValue = parseInt(pixels, 10);
    const rem = (parsedValue / 16) ;
    // console.log({rem});
    return rem as CountNumber<typeof rem>;
  }

  const value = (pixels as number / 16);
  // console.log({value});
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

export const handleErrorGlobal = (message:string |  Array<string>) => {
  // let message
  if(typeof message === 'string'){
    errorToast(message)
  }else if(Array.isArray(message)){
    let errMsg = '';

    for(const msg of message){
      errMsg += ` ${msg}    .`; 
    }


    errorToast(errMsg);
  }
}

