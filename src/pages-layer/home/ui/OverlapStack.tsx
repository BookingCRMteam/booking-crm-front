'use client';

import { type FC, type ReactNode, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { Box } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const OverlapStack: FC<{
  children: ReactNode;
  debug?: boolean;
}> = ({ children, debug = false }) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const lastHeight = useRef<number>(0);
  const refreshTimeout = useRef<number | null>(null);

  useGSAP(
    () => {
      if (!rootRef.current) return;

      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id?.startsWith('section_stack')) t.kill();
      });

      const panels = gsap.utils.toArray<HTMLElement>('.panel');
      const lastIndex = panels.length - 1;

      panels.forEach((panel, i) => {
        const isLast = i === lastIndex;
        const isFirst = i === 0;
        ScrollTrigger.create({
          trigger: panel,
          start: () =>
            panel.offsetHeight > window.innerHeight
              ? 'bottom bottom'
              : 'top top',
          end: isFirst ? '+=750px' : isLast ? 'bottom bottom' : undefined,
          pin: true,
          pinSpacing: isFirst ? true : !isLast ? false : true,
          scrub: true,
          markers: debug,
          id: 'section',
        });
      });

      const lastPanel = panels[lastIndex];
      if (!lastPanel) return;

      lastHeight.current = lastPanel.offsetHeight;
      const observer = new ResizeObserver(() => {
        const currentHeight = lastPanel.offsetHeight;
        if (Math.abs(currentHeight - lastHeight.current) > 10) {
          lastHeight.current = currentHeight;

          if (refreshTimeout.current) {
            window.clearTimeout(refreshTimeout.current);
          }

          refreshTimeout.current = window.setTimeout(() => {
            console.log(
              '[OverlapStack] Panel height changed, refreshing ScrollTrigger',
            );
            ScrollTrigger.refresh();
          }, 50);
        }
      });
      observer.observe(lastPanel);

      return () => {
        observer.disconnect();
        if (refreshTimeout.current) {
          window.clearTimeout(refreshTimeout.current);
        }
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.id?.startsWith('section')) t.kill();
        });
      };
    },
    { scope: rootRef },
  );

  return (
    <Box ref={rootRef} sx={{ position: 'relative' }}>
      {children}
    </Box>
  );
};
