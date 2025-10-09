'use client';

import { type FC, useMemo } from 'react';

import Image from 'next/image';

import { Box, styled } from '@mui/material';

import { TourPhoto } from '@/entities/tour/model/types';

import { GalleryNavButton } from './GalleryNavButton';
import { Thumb } from './Thumb';
import { useTourGallery } from './useTourGallery';

type TourGalleryProps = {
  photos: TourPhoto[];
};

const GalleryWrapper = styled(Box)(() => ({
  paddingTop: '20px',
  display: 'flex',
  gap: '24px',
  maxWidth: '508px',
  width: '100%',
  position: 'relative',
}));

const ThumbViewport = styled(Box)(() => ({
  overflow: 'hidden',
  height: '100%',
  maxHeight: '440px',
}));

const ThumbContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  height: '100%',
  marginTop: '0',
}));
const MainViewport = styled(Box)(() => ({
  overflow: 'hidden',
}));

const MainContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '20px',
}));
const MainSlide = styled(Box)(() => ({
  borderRadius: '4px',
  flex: '0 0 100%',
  cursor: 'grab',
}));

export const TourGallery: FC<TourGalleryProps> = ({ photos }) => {
  const isCarouselActive = photos.length > 1;
  const {
    emblaMainRef,
    emblaThumbsRef,
    selectedIndex,
    scrollPrev,
    scrollNext,
    onThumbClick,
  } = useTourGallery({ isCarouselActive });

  const thumbs = useMemo(
    () =>
      photos.map((image, index) => (
        <Thumb
          key={image.id}
          onClick={() => onThumbClick(index)}
          selected={index === selectedIndex}
          image={image}
        />
      )),
    [photos, selectedIndex, onThumbClick],
  );
  return (
    <GalleryWrapper className="embla">
      {isCarouselActive && (
        <>
          <GalleryNavButton
            direction="prev"
            onClick={scrollPrev}
            ariaLabel="Previous image"
          />
          <GalleryNavButton
            direction="next"
            onClick={scrollNext}
            ariaLabel="Next image"
          />
        </>
      )}

      <Box className="embla-thumbs">
        <ThumbViewport className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <ThumbContainer className="embla-thumbs__container">
            {thumbs}
          </ThumbContainer>
        </ThumbViewport>
      </Box>

      <Box sx={{ width: '100%', maxWidth: '419px' }}>
        <MainViewport ref={emblaMainRef}>
          <MainContainer>
            {photos.map(({ description, id, url }) => (
              <MainSlide key={id}>
                <Image alt={description} src={url} width={419} height={440} />
              </MainSlide>
            ))}
          </MainContainer>
        </MainViewport>
      </Box>
    </GalleryWrapper>
  );
};
