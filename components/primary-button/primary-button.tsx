import { mergeCn } from '@/lib/utils';
import React,{ButtonHTMLAttributes} from 'react';


type PrimaryButtonVariant = 'primary' | 'secondary';
interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?:string;
  variant?: PrimaryButtonVariant;
}

const PrimaryButton = ({className,variant = 'primary',children,...props}:PrimaryButtonProps) => {

  return (
    <button className={mergeCn('bg-primary text-neutral-white outline-none focus:outline-none border-none text-base font-semibold leading-4 tracking-[2%] rounded-[0.625rem] px-[3.125rem] py-[1.0625rem]', variant === 'secondary' ? ' bg-secondary-blue' : '',className)}
    
    
    {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton;
