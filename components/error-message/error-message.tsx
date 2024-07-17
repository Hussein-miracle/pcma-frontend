"use client";
import React, { useEffect, useRef } from 'react'

interface ErrorMessageProps {
  text:string;
}


const ErrorMessage = ({text}:ErrorMessageProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if(ref.current){
      // const errorMessages = document.querySelectorAll('.error-message');
      // errorMessages.forEach((el)=>{
      //   el.scrollIntoView({behavior:"smooth",block:"start",inline:"start"});
      // })
      ref.current.scrollIntoView({behavior:"smooth",block:"start",inline:"start"});
    }
  },[])


  return (
    <p ref={ref}  className="text-danger-2 text-xs font-bold py-0.5 w-fit error-message">{text}</p>
  )
}

export default ErrorMessage;