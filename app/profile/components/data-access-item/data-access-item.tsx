import { cn } from '@/lib/utils';
import React from 'react'

interface DataAccessItemProps{
  children?:React.ReactNode;
  className?:string;
}


const DataAccessItem = ({children,className}:DataAccessItemProps) => {
  return (
    <div className={cn(' cursor-default gap-2.5 bg-[#F1F4FF] px-2 py-1 w-fit h-fit border border-[#ECF0FF] rounded-xl text-secondary-black text-xs/[18px] font-medium',className)}>
      {children}
    </div>
  )
}

export default DataAccessItem