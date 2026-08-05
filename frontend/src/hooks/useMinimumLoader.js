import { useEffect, useState } from "react";

export default function useMinimumLoader(isLoaded, minimumTime = 5000) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timeoutId;

    if (isLoaded) {
      timeoutId = setTimeout(() => {
        setShowLoader(false);
      }, minimumTime);
    }

    return () => clearTimeout(timeoutId);
  }, [isLoaded, minimumTime]);

  return showLoader;
}