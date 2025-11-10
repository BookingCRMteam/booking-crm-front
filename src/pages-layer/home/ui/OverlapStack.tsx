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
        if (t.vars.id?.startsWith('section')) t.kill();
      });

      const sections = gsap.utils.toArray<HTMLElement>('.section');
      const lastIndex = sections.length - 1;

      sections.forEach((section, i) => {
        const isLast = i === lastIndex;
        const isFirst = i === 0;
        ScrollTrigger.create({
          trigger: section,
          start: () =>
            section.offsetHeight > window.innerHeight
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

      const lastSection = sections[lastIndex];
      const faqSection = lastSection.children[0] as HTMLElement;
      if (!faqSection) return;

      lastHeight.current = faqSection.offsetHeight;
      const observer = new ResizeObserver(() => {
        const currentHeight = faqSection.offsetHeight;
        if (Math.abs(currentHeight - lastHeight.current) > 10) {
          lastHeight.current = currentHeight;

          if (refreshTimeout.current) {
            window.clearTimeout(refreshTimeout.current);
          }

          refreshTimeout.current = window.setTimeout(() => {
            ScrollTrigger.refresh();
          }, 10);
        }
      });
      observer.observe(faqSection);

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
