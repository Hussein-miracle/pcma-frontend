import React from 'react'
import { CheckboxEmptyIcon,CheckboxIcon } from '../icons';
import useToggle from '@/lib/hooks/client/use-toggle';
import { cn } from '@/lib/utils';

interface CheckboxProps{
  checked?:boolean;
  onChange?:(value:boolean) => void;
  className?:string;
}


const Checkbox = ({checked = false,onChange,className}:CheckboxProps) => {
  const {toggle:toggleIsChecked,toggleState:isChecked} = useToggle(checked);
  return (
    <div className={cn(' w-4 h-4 min-h-4 min-w-4 max-w-4 max-h-4 cursor-pointer',className)} onClick={() => {
      onChange?.(!isChecked);
      toggleIsChecked();
    }}>
      {isChecked ? <CheckboxIcon/> : <CheckboxEmptyIcon/>}
    </div>
  )
}

export default Checkbox;