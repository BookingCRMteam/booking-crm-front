'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { CaretUpIcon } from '@phosphor-icons/react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ButtonStyled } from './styled';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SCROLL_TO_TOP_THRESHOLD = 600;

export const ButtonTop = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { contextSafe } = useGSAP(
    () => {
      if (!buttonRef.current) return;
      const buttonTop = buttonRef.current;

      gsap.set(buttonTop, {
        y: '100vh',
        autoAlpha: 0,
      });
      gsap.to(buttonTop, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: document.body,
          start: `top -${SCROLL_TO_TOP_THRESHOLD}px`,
          end: `top -${SCROLL_TO_TOP_THRESHOLD}px`,
          toggleActions: 'play none reverse none',
        },
      });
    },
    { scope: buttonRef },
  );

  const handleScrollToTop = contextSafe(() => {
    gsap.to(window, {
      scrollTo: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });
  return (
    <ButtonStyled
      ref={buttonRef}
      onClick={handleScrollToTop}
      aria-label="Вгору"
      title="Вгору"
    >
      <CaretUpIcon size={48} />
    </ButtonStyled>
  );
};
