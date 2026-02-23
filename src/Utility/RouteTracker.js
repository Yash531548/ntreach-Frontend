import { useEffect } from "react";
import { useLocation } from "react-router";
import ReactGA from "react-ga4";

// Initialize GA4 once
ReactGA.initialize("GTM-NH35NXQW"); 

export const RouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track pageview on every location change
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });

    console.log("GA4 Tracked:", location.pathname);
  }, [location]);

  return null;
};