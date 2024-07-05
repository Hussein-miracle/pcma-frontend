import Checkbox from '@/components/checkbox/checkbox';
import { cn } from '@/lib/utils';
import React from 'react'

interface DataAccessCheckItemProps{
  children?:React.ReactNode;
  className?:string;
  checked?:boolean;
  onCheck?:(v:boolean) => void;
}


const DataAccessCheckItem = ({children,className,checked = false,onCheck}:DataAccessCheckItemProps) => {
  const handleCheck = (v:boolean) => {
    onCheck?.(v);
  }
  return (
    <div className={cn(' cursor-default gap-2.5 bg-[#F1F4FF] px-2 py-1 w-fit h-fit border border-[#ECF0FF] rounded-xl text-secondary-black text-xs/[18px] font-medium flex items-center justify-between',className)}>
      <Checkbox checked={checked} onChange={handleCheck} /> <div className='inline-block'>{children}</div>
    </div>
  )
}

export default DataAccessCheckItem