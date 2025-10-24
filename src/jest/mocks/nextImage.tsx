import React, { ImgHTMLAttributes } from 'react';

interface NextImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

const MockNextImage = (props: NextImageProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { priority, fill, ...rest } = props;

  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img {...rest} data-testid="mock-next-image" />;
};

export default MockNextImage;
