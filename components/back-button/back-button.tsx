"use client";
import React from 'react'
import { ArrowLeftIcon } from '../icons';
import { useRouter } from 'next/navigation';


interface BackButtonProps {
  onClick?: () => void;
}


const BackButton = ({onClick}:BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    if(onClick) {
      onClick();
      return;
    }
    
    router.back();
  }
  return (
    <button className="flex items-center gap-1 rounded-xl bg-[#F2F8FF] border border-[#E0EEFD] py-2 px-4 text-sm/6 font-semibold text-primary shadow-inner shadow-white/10 focus:outline-none w-fit" onClick={handleBack}>
     <ArrowLeftIcon/> <span className=' text-base/4'>Back</span>
  </button>
  )
}

export default BackButton;