import * as React from "react"
import { isBrowser, safeWindow } from '@/lib/platform'

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    if (!isBrowser()) {
      setIsMobile(false);
      return;
    }

    // Use safeWindow to avoid SSR issues and guard matchMedia
    const mql = safeWindow(() => window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`));

    const onChange = () => {
      safeWindow(() => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT));
    };

    if (mql && typeof mql.addEventListener === 'function') {
      mql.addEventListener("change", onChange);
    }

    safeWindow(() => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT));

    return () => {
      if (mql && typeof mql.removeEventListener === 'function') {
        mql.removeEventListener("change", onChange);
      }
    };
  }, []);

  return !!isMobile;
}
