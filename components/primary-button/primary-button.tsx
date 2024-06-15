import { mergeCn } from '@/lib/utils';
import React,{ButtonHTMLAttributes} from 'react';


interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?:string;
}

const PrimaryButton = ({className,children,...props}:PrimaryButtonProps) => {
  return (
    <button className={mergeCn('bg-primary text-neutral-white outline-none focus:outline-none border-none text-base font-semibold leading-4 tracking-[2%] rounded-[10px] px-[50px] py-[17px]',className)}
    
    
    {...props}
    >
      {children}
    </button>
  )
}

export default PrimaryButton;
