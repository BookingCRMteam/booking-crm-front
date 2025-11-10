'use client';

import React, { useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import { Box, styled } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { StepCard } from './StepCard';
import { STEPS } from './constants';

gsap.registerPlugin(ScrollTrigger);

const StepsWrapper = styled(Box)({
  display: 'flex',
  width: '100%',
  gap: '9px',
  justifyContent: 'flex-end',
  position: 'relative',
  height: '240px',
});

export const Steps = () => {
  const [select, setSelect] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;

      if (!container) return;
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id?.startsWith('stepsCard')) t.kill();
      });

      const stepHeight = 200;
      const offset = 100;

      STEPS.forEach((card, index) => {
        const triggerStart = `top+=${index * stepHeight + offset} center`;
        const triggerEnd = `top+=${(index + 1) * stepHeight + offset} center`;

        ScrollTrigger.create({
          trigger: container,
          start: triggerStart,
          end: triggerEnd,
          onEnter: () => setSelect(card.id),
          onEnterBack: () => setSelect(card.id),
          onLeave: () =>
            setSelect(index < STEPS.length - 1 ? STEPS[index + 1].id : card.id),
          onLeaveBack: () => setSelect(index > 0 ? STEPS[index - 1].id : 0),
          scrub: false,
          pin: false,
          markers: false,
          id: 'stepsCard',
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => {
          if (t.vars.id?.startsWith('stepsCard')) t.kill();
        });
      };
    },
    { scope: containerRef },
  );

  return (
    <StepsWrapper ref={containerRef}>
      {STEPS.map((card) => (
        <StepCard key={card.id} selected={select === card.id} {...card} />
      ))}
    </StepsWrapper>
  );
};
