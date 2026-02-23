import { useEffect, useRef, useState, useCallback } from 'react';

export const useSticky = (offset = 20) => {
  const [isSticky, setIsSticky] = useState(false);
  const [width, setWidth] = useState('auto');
  const elementRef = useRef(null);
  const placeholderRef = useRef(null);

  const updateStickyState = useCallback(() => {
    const element = elementRef.current;
    const placeholder = placeholderRef.current;
    
    if (!element || !placeholder) return;

    const placeholderRect = placeholder.getBoundingClientRect();
    const shouldBeSticky = placeholderRect.top <= offset;
    
    setIsSticky(shouldBeSticky);
    
    if (shouldBeSticky) {
      // Store the width when becoming sticky
      setWidth(`${placeholderRect.width}px`);
    }
  }, [offset]);

  useEffect(() => {
    updateStickyState();
    
    window.addEventListener('scroll', updateStickyState);
    window.addEventListener('resize', updateStickyState);
    
    // Use ResizeObserver to watch for container size changes
    const resizeObserver = new ResizeObserver(updateStickyState);
    if (placeholderRef.current) {
      resizeObserver.observe(placeholderRef.current);
    }

    return () => {
      window.removeEventListener('scroll', updateStickyState);
      window.removeEventListener('resize', updateStickyState);
      resizeObserver.disconnect();
    };
  }, [updateStickyState]);

  return { elementRef, placeholderRef, isSticky, width };
};
