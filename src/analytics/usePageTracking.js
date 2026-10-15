import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

import { trackPageView } from "./analytics";

export function usePageTracking() {
  const { pathname, search } = useLocation();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    const path = pathname + search;

    if (lastTrackedPath.current !== path) {
      lastTrackedPath.current = path;
      trackPageView(path);
    }
  }, [pathname, search]);
}
