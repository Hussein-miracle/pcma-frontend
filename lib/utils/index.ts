import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";




export const montserrat = Montserrat({ weight: '400', subsets: ['latin'] })
export const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '600', '700', '800'], subsets: ['latin'], display: 'swap',
  // style: ['normal', 'italic']
})

// NOTE: this is a helper function to merge tailwind classes
export function mergeCn(...classes: ClassValue[]) {
  const requiredClasses = classes.filter(Boolean);
  return twMerge(clsx(requiredClasses));
}
