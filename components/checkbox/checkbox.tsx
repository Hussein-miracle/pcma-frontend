"use client";
import React from 'react'
import { CheckboxEmptyIcon,CheckboxIcon } from '../icons';
import useToggle from '@/lib/hooks/client/use-toggle';
import { cn } from '@/lib/utils';

interface CheckboxProps{
  checked?:boolean;
  onChange?:(value:boolean) => void;
  className?:string;
  disabled?:boolean;
}


const Checkbox = ({checked = false,onChange,className,disabled = false}:CheckboxProps) => {
  // const {toggle:toggleIsChecked,toggleState:isChecked} = useToggle(checked ?? false);

  return (
    <div className={cn(' w-4 h-4 min-h-4 min-w-4 max-w-4 max-h-4 cursor-pointer',disabled && 'cursor-not-allowed opacity-50  will-change-auto', className )} onClick={() => {
      if(disabled) return;
      onChange?.(!checked);
    }}>
      {checked ? <CheckboxIcon/> : <CheckboxEmptyIcon/>}
    </div>
  )
}

export default Checkbox;