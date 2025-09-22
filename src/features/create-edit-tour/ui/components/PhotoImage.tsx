'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { TourPhotoFront } from '@/entities/tour/model/types';

type PhotoImageProps = {
  photo: TourPhotoFront;
  index: number;
};

export const PhotoImage = ({ photo, index }: PhotoImageProps) => {
  const [src, setSrc] = useState(photo.url ?? '');

  useEffect(() => {
    if (photo.file) {
      const objectUrl = URL.createObjectURL(photo.file);
      setSrc(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setSrc(photo.url ?? '');
    }
  }, [photo.file, photo.url]);

  return (
    <Image
      src={src || '/images/placeholder_img.png'}
      alt={photo.isMain ? 'Головне фото туру' : `Фото ${index + 1} туру`}
      fill
      style={{ objectFit: 'cover' }}
    />
  );
};
