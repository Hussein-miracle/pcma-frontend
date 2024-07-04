"use client";

import TopLoader from '@/components/top-loader/top-loader';
import React,{Fragment} from 'react'

const RootClientLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <Fragment>
      <TopLoader
        color={`#4169E1`}
        initialPosition={0.08}
        crawlSpeed={0.5}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        // template='<div class="w-full bg-skin-secondary bar" role="bar"></div>'
        zIndex={1600}
        showAtBottom={false}
      />

      {children}
    </Fragment>
  )
}

export default RootClientLayout;