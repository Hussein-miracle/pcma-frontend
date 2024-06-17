import React from 'react'

interface ErrorMessageProps {
  text:string;
}


const ErrorMessage = ({text}:ErrorMessageProps) => {
  return (
    <p className="text-red-500 text-xs font-bold py-0.5">{text}</p>
  )
}

export default ErrorMessage;