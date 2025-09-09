import { Center } from '@chakra-ui/react';
import React, { useLayoutEffect, useRef } from 'react';

export type PageWrapperProps = {
  children: React.ReactNode;
  full?: boolean;
};

function isScrollable(el: Element | null) {
  if (!el) return false;
  const style = getComputedStyle(el);
  const overflowY = style.overflowY;
  const canScrollY = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
  return canScrollY && el.scrollHeight > el.clientHeight;
}

function findScrollableAncestor(start: Element | null): Element | null {
  let el: Element | null = start;
  while (el) {
    if (isScrollable(el)) return el;
    if (el.parentElement) el = el.parentElement;
    else break;
  }

  // fallback checks
  const root = document.getElementById('root');
  if (isScrollable(root)) return root;
  if (isScrollable(document.scrollingElement as Element))
    return document.scrollingElement as Element;
  if (isScrollable(document.body)) return document.body;
  if (isScrollable(document.documentElement)) return document.documentElement;
  return null;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, full }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    try {
      const target = findScrollableAncestor(ref.current);

      // Use requestAnimationFrame to ensure layout is stable (helps in some timing cases)
      requestAnimationFrame(() => {
        if (target && 'scrollTo' in target) {
          (target as HTMLElement).scrollTo({ top: 0, left: 0 });
        } else {
          // fallback to window
          window.scrollTo({ top: 0, left: 0 });
        }
      });
    } catch (error) {
      // last resort fallback
      window.scrollTo({ top: 0, left: 0 });
      console.log(error);
    }
  }, [children]); // change deps: [] => only on mount, [children] => on children changes/re-renders

  return (
    <Center
      ref={ref}
      w={'full'}
      h={full ? '100dvh' : 'auto'}
      flex={'1'}
      overflow={'hidden'}
      flexDir={'column'}
      animationStyle={'fadeIn'}
      py={'10'}
    >
      {children}
    </Center>
  );
};
