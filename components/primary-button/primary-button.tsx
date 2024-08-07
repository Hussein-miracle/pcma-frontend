import { cn } from '@/lib/utils';
import React,{ButtonHTMLAttributes} from 'react';
import ButtonLoader from '../button-loader/button-loader';


type PrimaryButtonVariant = 'primary' | 'secondary';
interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?:string;
  variant?: PrimaryButtonVariant;
  loading?:boolean;
}

const PrimaryButton = ({className,variant = 'primary',loading = false,children,...props}:PrimaryButtonProps) => {

  return (
    <button className={cn('bg-primary text-neutral-white outline-none focus:outline-none border-none text-base font-semibold leading-4 tracking-[2%] rounded-[0.625rem] px-4 py-4 sm:px-[3.125rem] sm:py-[1.0625rem] disabled:opacity-80 disabled:cursor-not-allowed', variant === 'secondary' && ' bg-secondary-blue w-full',className)  
  }
    
    
    {...props}
    >
      {loading ? <ButtonLoader/>  : children}
    </button>
  )
}

export default PrimaryButton;
