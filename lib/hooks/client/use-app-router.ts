import { useRouter as useNextRouter, usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import NProgress from 'nprogress';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const useAppRouter = () => {
  const router = useNextRouter();
  const pathname = usePathname();



  const replace = useCallback(
    (href: string, options?: NavigateOptions) => {
      href !== pathname && NProgress.start();
      router.replace(href, options);
    },
    [router, pathname]
  );

  const push = useCallback(
    (href: string, options?: NavigateOptions) => {
      (href !== pathname || pathname === '/') && NProgress.start();
      router.push(href, options);
    },
    [router, pathname]
  );

  // useEffect(() => {
  //   NProgress.done();
  // },[router, pathname])

  return {
    ...router,
    replace,
    push,
  };
};
