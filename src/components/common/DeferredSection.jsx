import { useEffect, useRef, useState } from "react";

const DeferredSection = ({ children, minHeight = "100vh", rootMargin = "1200px 0px" }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (shouldRender) return undefined;
    const node = placeholderRef.current;
    if (!node || !("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldRender(true);
        observer.disconnect();
      }
    }, { rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  if (shouldRender) return children;
  return <div ref={placeholderRef} style={{ minHeight }} aria-hidden="true" />;
};

export default DeferredSection;