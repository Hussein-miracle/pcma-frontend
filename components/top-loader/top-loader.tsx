'use client';

import Loader, { NextTopLoaderProps } from 'nextjs-toploader';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import NProgress from 'nprogress';
// import { useAppRouter } from '@/lib/hooks/client/use-app-router';

const TopLoader = (props: NextTopLoaderProps) => {
  const pathname = usePathname();
  // const router = useAppRouter();

  // useEffect(() => {
  //   NProgress.done();
  // }, [pathname, router]);

  return <Loader {...{  showSpinner: false,...props }} />;
};

export default TopLoader;
