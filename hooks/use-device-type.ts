import * as React from "react";

const MOBILE_BREAKPOINT = 768; // e.g., up to 767px is mobile
const TABLET_BREAKPOINT = 1024; // e.g., 768px to 1023px is tablet, 1024px and above is desktop

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setDeviceType({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}
