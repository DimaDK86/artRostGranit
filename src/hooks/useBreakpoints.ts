import { useState, useEffect } from 'react';

interface Breakpoints {
  isMobileSmall: boolean;  // < 550
  isMobile: boolean;       // 550 - 900
  isTablet: boolean;       // 900 - 1100
  isDesktop: boolean;      // > 1100
  isDesktopWide: boolean;  // > 1400
  current: 'mobile-small' | 'mobile' | 'tablet' | 'desktop' | 'desktop-wide';
}

export function useBreakpoints(): Breakpoints {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>(() => {
    // Начальное значение для SSR
    return {
      isMobileSmall: false,
      isMobile: false,
      isTablet: false,
      isDesktop: false,
      isDesktopWide: false,
      current: 'desktop',
    };
  });

  useEffect(() => {
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      
      const isMobileSmall = width >= 0 && width < 550;
      const isMobile = width >= 550 && width < 900;
      const isTablet = width >= 900 && width < 1100;
      const isDesktop = width >= 1100 && width < 1400;
      const isDesktopWide = width >= 1400;
      
      let current: Breakpoints['current'] = 'desktop';
      if (isMobileSmall) current = 'mobile-small';
      else if (isMobile) current = 'mobile';
      else if (isTablet) current = 'tablet';
      else if (isDesktopWide) current = 'desktop-wide';
      
      setBreakpoints({
        isMobileSmall,
        isMobile,
        isTablet,
        isDesktop,
        isDesktopWide,
        current,
      });
    };

    // Проверяем сразу
    checkBreakpoints();

    // Создаем debounced версию для производительности
    let timeoutId: number;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkBreakpoints, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return breakpoints;
}