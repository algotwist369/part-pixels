import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return undefined;
    }

    let frameId;
    let attempts = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      attempts += 1;
      if (attempts < 10) frameId = window.requestAnimationFrame(scrollToTarget);
    };

    frameId = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
};

export default RouteScrollManager;