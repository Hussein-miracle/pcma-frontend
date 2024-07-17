import React from 'react';
import { cn } from '@/lib/utils';


interface FormContentContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const FormContentContainer = ({className,children}:FormContentContainerProps) => {
  return (
    <div className={cn('h-max max-h-[32.2rem] custom-scroller overflow-auto  px-1 mx-auto',className)}>
      {children}
    </div>
  )
}

export default FormContentContainer;