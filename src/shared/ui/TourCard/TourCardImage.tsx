'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { TourPhoto } from '@/entities/tour/model/types';

interface TourCardImageProps {
  mainPhoto: Pick<TourPhoto, 'isMain' | 'url' | 'description'> | null;
  title: string;
}

// TODO Замінити на схематичну картинку
const DEFAULT_IMAGE_URL = '/images/tourCard/tour.png';

export const TourCardImage: React.FC<TourCardImageProps> = ({
  mainPhoto,
  title,
}) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = mainPhoto?.url;

  const srcToUse = imageUrl && !imageError ? imageUrl : DEFAULT_IMAGE_URL;

  const handleError = () => {
    setImageError(true);
    console.error('error image url', imageUrl);
  };

  return (
    <Image
      src={srcToUse}
      alt={mainPhoto?.description ?? title}
      fill
      sizes="(max-width: 768px) 100vw, 331px"
      style={{
        objectFit: 'cover',
      }}
      onError={handleError}
    />
  );
};
