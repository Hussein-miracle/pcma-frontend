"use client";
import React from 'react';

interface SpacerProps  {
  size: number;
  axis?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  // className:React.ClassAttributes<HTMLDivElement>;
};

const Spacer = ({ size, axis = 'vertical', style = {} }: SpacerProps) => {
  const width = axis === 'vertical' ? 2 : size;
  const height = axis === 'horizontal' ? 2 : size;

  return (
    <span
      className={` block `}
      style={{
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
    ></span>
  );
};

export default Spacer;
