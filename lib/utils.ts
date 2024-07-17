import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import { CountNumber, DynPixel } from './types';








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

let p = pxToRem(32);